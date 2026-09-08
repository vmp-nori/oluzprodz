#!/usr/bin/env node

import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { access, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import ffmpegPath from "ffmpeg-static";
import sharp from "sharp";

const IMAGE_EXTENSIONS = new Set([
  ".avif",
  ".jpeg",
  ".jpg",
  ".png",
  ".tif",
  ".tiff",
  ".webp",
]);
const VIDEO_EXTENSIONS = new Set([".m4v", ".mov", ".mp4"]);
const DEFAULT_OUTPUT_NAME = "website-media";

function printHelp() {
  console.log(`Usage:
  npm start -- <input-folder> [output-folder]

Examples:
  npm start -- "/Users/you/Downloads/oluprodz-media"
  npm start -- "D:\\Media\\OluProdz" "D:\\Media\\website-ready"

The source folder is never modified. When output-folder is omitted, a
"${DEFAULT_OUTPUT_NAME}" folder is created beside the input folder.`);
}

function assertSafePaths(inputDirectory, outputDirectory) {
  if (inputDirectory === outputDirectory) {
    throw new Error(
      "The output folder must be different from the source folder.",
    );
  }

  const relativeOutput = path.relative(inputDirectory, outputDirectory);
  if (
    relativeOutput &&
    !relativeOutput.startsWith("..") &&
    !path.isAbsolute(relativeOutput)
  ) {
    throw new Error(
      "Place the output folder outside the source folder to prevent recursive imports.",
    );
  }
}

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

function toManifestPath(root, filePath) {
  return path.relative(root, filePath).split(path.sep).join("/");
}

async function readManifest(manifestPath) {
  if (!(await exists(manifestPath))) return { assets: [] };

  try {
    const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
    return Array.isArray(manifest.assets) ? manifest : { assets: [] };
  } catch {
    console.warn(
      "Existing manifest is invalid; rebuilding it from the source folder.",
    );
    return { assets: [] };
  }
}

async function assetOutputsExist(asset, outputDirectory) {
  if (!asset?.sources) return false;
  const sources = Object.values(asset.sources);
  return (
    sources.length > 0 &&
    (
      await Promise.all(
        sources.map((source) => exists(path.join(outputDirectory, source))),
      )
    ).every(Boolean)
  );
}

async function findMedia(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await findMedia(entryPath)));
      continue;
    }

    const extension = path.extname(entry.name).toLowerCase();
    if (IMAGE_EXTENSIONS.has(extension) || VIDEO_EXTENSIONS.has(extension)) {
      files.push(entryPath);
    }
  }

  return files.sort((left, right) => left.localeCompare(right));
}

async function hashFile(filePath) {
  const hash = createHash("sha256");
  for await (const chunk of createReadStream(filePath)) hash.update(chunk);
  return hash.digest("hex");
}

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: ["ignore", "ignore", "pipe"] });
    let stderr = "";

    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve(stderr);
      else
        reject(new Error(stderr.trim() || `Command exited with code ${code}`));
    });
  });
}

function parseVideoMetadata(stderr) {
  const dimensions = stderr.match(/Video:.*?(\d{2,5})x(\d{2,5})/);
  const duration = stderr.match(/Duration:\s*(\d+):(\d+):(\d+(?:\.\d+)?)/);

  return {
    width: dimensions ? Number(dimensions[1]) : null,
    height: dimensions ? Number(dimensions[2]) : null,
    duration: duration
      ? Number(duration[1]) * 3600 +
        Number(duration[2]) * 60 +
        Number(duration[3])
      : null,
  };
}

async function inspectVideo(sourcePath) {
  return new Promise((resolve, reject) => {
    const child = spawn(ffmpegPath, ["-hide_banner", "-i", sourcePath], {
      stdio: ["ignore", "ignore", "pipe"],
    });
    let stderr = "";
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    child.on("error", reject);
    child.on("close", () => resolve(parseVideoMetadata(stderr)));
  });
}

async function processImage(sourcePath, id, directories) {
  const image = sharp(sourcePath, { failOn: "warning" }).rotate();
  const metadata = await image.metadata();

  const avifPath = path.join(directories.images, `${id}.avif`);
  const webpPath = path.join(directories.images, `${id}.webp`);
  const thumbnailPath = path.join(directories.thumbnails, `${id}.webp`);

  await Promise.all([
    sharp(sourcePath)
      .rotate()
      .resize({
        width: 2400,
        height: 2400,
        fit: "inside",
        withoutEnlargement: true,
      })
      .avif({ quality: 60, effort: 5 })
      .toFile(avifPath),
    sharp(sourcePath)
      .rotate()
      .resize({
        width: 2400,
        height: 2400,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 84, effort: 5 })
      .toFile(webpPath),
    sharp(sourcePath)
      .rotate()
      .resize({
        width: 720,
        height: 720,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 78, effort: 4 })
      .toFile(thumbnailPath),
  ]);

  const outputMetadata = await sharp(webpPath).metadata();
  return {
    type: "image",
    width: outputMetadata.width ?? metadata.width ?? null,
    height: outputMetadata.height ?? metadata.height ?? null,
    sources: {
      avif: toManifestPath(directories.root, avifPath),
      webp: toManifestPath(directories.root, webpPath),
      thumbnail: toManifestPath(directories.root, thumbnailPath),
    },
  };
}

async function processVideo(sourcePath, id, directories) {
  const videoPath = path.join(directories.videos, `${id}.mp4`);
  const posterPath = path.join(directories.posters, `${id}.webp`);

  await run(ffmpegPath, [
    "-hide_banner",
    "-loglevel",
    "error",
    "-y",
    "-i",
    sourcePath,
    "-map_metadata",
    "-1",
    "-vf",
    "scale=1920:1920:force_original_aspect_ratio=decrease:force_divisible_by=2",
    "-c:v",
    "libx264",
    "-preset",
    "slow",
    "-crf",
    "23",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    "-c:a",
    "aac",
    "-b:a",
    "128k",
    videoPath,
  ]);

  const metadata = await inspectVideo(videoPath);
  if (!metadata.width || !metadata.height) {
    throw new Error("FFmpeg could not read the processed video's dimensions.");
  }
  const posterTime = metadata.duration && metadata.duration > 3 ? "1.5" : "0";
  await run(ffmpegPath, [
    "-hide_banner",
    "-loglevel",
    "error",
    "-y",
    "-ss",
    posterTime,
    "-i",
    videoPath,
    "-frames:v",
    "1",
    "-vf",
    "scale=1200:1200:force_original_aspect_ratio=decrease:force_divisible_by=2",
    "-c:v",
    "libwebp",
    "-quality",
    "82",
    posterPath,
  ]);

  return {
    type: "video",
    ...metadata,
    sources: {
      mp4: toManifestPath(directories.root, videoPath),
      poster: toManifestPath(directories.root, posterPath),
    },
  };
}

async function main() {
  const [inputArgument, outputArgument] = process.argv.slice(2);
  if (!inputArgument || inputArgument === "--help" || inputArgument === "-h") {
    printHelp();
    process.exitCode = inputArgument ? 0 : 1;
    return;
  }

  const inputDirectory = path.resolve(inputArgument);
  const outputDirectory = outputArgument
    ? path.resolve(outputArgument)
    : path.join(path.dirname(inputDirectory), DEFAULT_OUTPUT_NAME);
  assertSafePaths(inputDirectory, outputDirectory);

  const directories = {
    root: outputDirectory,
    images: path.join(outputDirectory, "images"),
    thumbnails: path.join(outputDirectory, "thumbnails"),
    videos: path.join(outputDirectory, "videos"),
    posters: path.join(outputDirectory, "posters"),
  };
  await Promise.all(
    Object.values(directories).map((directory) =>
      mkdir(directory, { recursive: true }),
    ),
  );

  const manifestPath = path.join(outputDirectory, "media-manifest.json");
  const previousManifest = await readManifest(manifestPath);
  const processedByHash = new Map(
    previousManifest.assets.map((asset) => [asset.sourceHash, asset]),
  );
  const sourceFiles = await findMedia(inputDirectory);

  if (sourceFiles.length === 0) {
    console.log(`No supported media found in ${inputDirectory}`);
    return;
  }

  console.log(
    `Found ${sourceFiles.length} media files. Originals will not be modified.\n`,
  );
  const assets = [];
  const errors = [];
  let processed = 0;
  let skipped = 0;

  const saveManifest = async () => {
    const manifest = {
      version: 1,
      generatedAt: new Date().toISOString(),
      sourceDirectory: inputDirectory,
      assets,
      errors,
    };
    await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  };

  for (const [index, sourcePath] of sourceFiles.entries()) {
    const relativeSource = path.relative(inputDirectory, sourcePath);
    try {
      const sourceHash = await hashFile(sourcePath);
      const id = sourceHash.slice(0, 16);
      const previous = processedByHash.get(sourceHash);

      if (previous && (await assetOutputsExist(previous, outputDirectory))) {
        if (!assets.some((asset) => asset.sourceHash === sourceHash)) {
          assets.push({ ...previous, sourcePath: relativeSource });
        }
        skipped += 1;
        console.log(
          `[${index + 1}/${sourceFiles.length}] Unchanged or duplicate: ${relativeSource}`,
        );
        continue;
      }

      console.log(
        `[${index + 1}/${sourceFiles.length}] Processing: ${relativeSource}`,
      );
      const extension = path.extname(sourcePath).toLowerCase();
      const result = IMAGE_EXTENSIONS.has(extension)
        ? await processImage(sourcePath, id, directories)
        : await processVideo(sourcePath, id, directories);

      const asset = {
        id,
        sourceHash,
        sourcePath: relativeSource,
        originalName: path.basename(sourcePath),
        title: path.parse(sourcePath).name,
        alt: "",
        ...result,
      };
      assets.push(asset);
      processedByHash.set(sourceHash, asset);
      processed += 1;
      await saveManifest();
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      errors.push({ sourcePath: relativeSource, message });
      console.error(`  Failed: ${message.split("\n")[0]}`);
      await saveManifest();
    }
  }

  await saveManifest();

  console.log(
    `\nComplete: ${processed} processed, ${skipped} unchanged or duplicate.`,
  );
  if (errors.length > 0) {
    console.log(
      `${errors.length} file(s) could not be processed; see the manifest.`,
    );
  }
  console.log(`Website-ready files: ${outputDirectory}`);
  console.log(`Manifest: ${manifestPath}`);
}

main().catch((error) => {
  console.error(`\nMedia processing failed: ${error.message}`);
  process.exitCode = 1;
});
