// This command is for local verification only. Its out/ directory must never be deployed.
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { writeFile } from "node:fs/promises";

const require = createRequire(import.meta.url);
const preload = fileURLToPath(new URL("./mockBuildFetch.cjs", import.meta.url));
console.info("MOCK BUILD: public test fixtures only. Do not deploy the resulting out/ directory.");
const child = spawn(process.execPath, [require.resolve("next/dist/bin/next"), "build"], {
  stdio: "inherit",
  env: {
    ...process.env,
    MICROCMS_SERVICE_DOMAIN: "mock-preview-build",
    MICROCMS_API_KEY: "public-test-only-placeholder",
    MICROCMS_TOPIC_ENDPOINT: "news",
    NEXT_TELEMETRY_DISABLED: "1",
    NODE_OPTIONS: `--require=${JSON.stringify(preload)}`,
  },
});
child.on("error", () => { process.exitCode = 1; });
child.on("exit", async (code) => {
  if (code === 0) await writeFile("out/preview-mock-build.txt", "Test fixtures only; do not deploy this build.\n");
  process.exitCode = code ?? 1;
});
