import { spawn } from "node:child_process";
import { createHash } from "node:crypto";

const digest = createHash("sha256").update(process.cwd()).digest();
const port = 3100 + (digest.readUInt16BE(0) % 700);

console.log(`Starting this checkout at http://localhost:${port}`);
const child = spawn(
  "npm",
  ["exec", "--", "next", "dev", "--port", String(port)],
  {
    stdio: "inherit",
  },
);
child.on("exit", (code) => process.exit(code ?? 0));
