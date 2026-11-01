// Builds the mermaidify article's reader from a mermaidify checkout, after `npm install` there:
//   MERMAIDIFY_DIR=../mermaidify node tools/mermaidify-demos/build.mjs
// The reader and the example drawing come straight from the app, so the demos can't drift from
// what mermaidify reads. Rebuild after the reader changes.
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const app = process.env.MERMAIDIFY_DIR;
if (!app) throw new Error("Set MERMAIDIFY_DIR to a mermaidify checkout.");
const commit = execFileSync("git", ["-C", app, "rev-parse", "--short", "HEAD"]).toString().trim();
const { build } = await import(pathToFileURL(resolve(app, "node_modules/rolldown/dist/index.mjs")).href);
const out = resolve(here, "../../assets/js/mermaidify-reader.js");

await build({
  input: resolve(here, "entry.ts"),
  resolve: { alias: { "@mermaidify": resolve(app, "src") } },
  output: { file: out, format: "iife", name: "MermaidifyReader", minify: true },
  logLevel: "warn",
});
// The minifier drops comments, so the banner goes on after it.
writeFileSync(out, `/* mermaidify's reader, built from mermaidify ${commit} by tools/mermaidify-demos. Rebuild; don't edit. */\n` + readFileSync(out, "utf8"));
