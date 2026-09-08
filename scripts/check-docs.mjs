import { access, readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";

const required = [
  "AGENTS.md",
  "ARCHITECTURE.md",
  "docs/PRODUCT_SENSE.md",
  "docs/DESIGN.md",
  "docs/FRONTEND.md",
  "docs/PLANS.md",
  "docs/QUALITY_SCORE.md",
  "docs/RELIABILITY.md",
  "docs/SECURITY.md",
];
const failures = [];

for (const path of required) {
  try {
    await access(path);
  } catch {
    failures.push(
      `${path}: required knowledge document is missing. Restore it or update AGENTS.md.`,
    );
  }
}

for (const path of required) {
  let content;
  try {
    content = await readFile(path, "utf8");
  } catch {
    continue;
  }
  for (const match of content.matchAll(/\[[^\]]+\]\((?!https?:|#)([^)]+)\)/g)) {
    const target = resolve(dirname(join(process.cwd(), path)), match[1]);
    try {
      await access(target);
    } catch {
      failures.push(
        `${path}: broken local link '${match[1]}'. Correct the path or add the referenced document.`,
      );
    }
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(
  `Documentation check passed for ${required.length} required files.`,
);
