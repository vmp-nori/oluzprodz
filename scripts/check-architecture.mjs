import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";

const root = process.cwd();
const srcRoot = join(root, "src");

async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) return sourceFiles(path);
      return /\.(ts|tsx)$/.test(entry.name) ? [path] : [];
    }),
  );
  return nested.flat();
}

function violationsFor(file, source) {
  const filePath = relative(root, file);
  const problems = [];
  if (filePath.startsWith("src/domains/") && /from ["']@\/app\//.test(source)) {
    problems.push(
      `${filePath}: domain code cannot import route code from @/app/. Move shared behavior into its owning domain or src/shared.`,
    );
  }
  if (
    filePath.startsWith("src/shared/") &&
    /from ["']@\/domains\//.test(source)
  ) {
    problems.push(
      `${filePath}: shared code cannot import a business domain. Move the dependency behind a domain-owned interface.`,
    );
  }
  return problems;
}

if (process.argv.includes("--self-test")) {
  const example = violationsFor(
    join(srcRoot, "domains/portfolio/components/broken-example.ts"),
    'import { metadata } from "@/app/layout";',
  );
  if (example.length !== 1 || !example[0].includes("Move shared behavior")) {
    throw new Error(
      "Architecture self-test failed to detect and explain an illegal edge.",
    );
  }
  console.log(`Expected invariant failure:\n${example[0]}`);
  process.exit(0);
}

const files = await sourceFiles(srcRoot);
const problems = (
  await Promise.all(
    files.map(async (file) =>
      violationsFor(file, await readFile(file, "utf8")),
    ),
  )
).flat();
if (problems.length > 0) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log(`Architecture check passed for ${files.length} source files.`);
