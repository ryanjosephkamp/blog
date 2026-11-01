// Builds the Ars Magna article's search engine and dictionary from an ars-magna checkout, after
// `pnpm install` and `pnpm wasm:build` there:
//   ARS_MAGNA_DIR=../ars-magna ../ars-magna/apps/web/node_modules/.bin/vite build \
//     --config tools/ars-magna-demos/vite.config.mjs
// The engine and the dictionary come straight from the site, so the demo can't drift from what
// Ars Magna does. Rebuild after either changes.
import { execFileSync } from "node:child_process";
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const app = process.env.ARS_MAGNA_DIR;
if (!app) throw new Error("Set ARS_MAGNA_DIR to an ars-magna checkout.");
const commit = execFileSync("git", ["-C", app, "rev-parse", "--short", "HEAD"]).toString().trim();
const outDir = resolve(here, "../../assets/ars-magna-demos");

export default {
  root: here,
  base: "./",
  logLevel: "warn",
  resolve: { alias: { "@engine": resolve(app, "packages/engine/src/index.ts") } },
  worker: { format: "es", rollupOptions: { output: { entryFileNames: "[name]-[hash].js" } } },
  plugins: [
    {
      // The minifier drops comments, so the banner goes on after it.
      name: "banner",
      enforce: "post",
      generateBundle(_, bundle) {
        const engine = bundle["engine.js"];
        engine.code = `/* Ars Magna's search engine, built from ars-magna ${commit} by tools/ars-magna-demos. Rebuild; don't edit. */
` + engine.code;
      },
    },
    {
      // GitHub Pages serves the site's .br copies as plain bytes, not as brotli, so only the
      // uncompressed files come over, and the manifest drops the brotli sizes that would send
      // the engine looking for them.
      name: "copy-dictionary",
      closeBundle() {
        const from = resolve(app, "apps/web/public/dict");
        const manifest = JSON.parse(readFileSync(resolve(from, "manifest.json"), "utf8"));
        mkdirSync(resolve(outDir, "dict"), { recursive: true });
        for (const file of Object.values(manifest.files)) {
          delete file.brotliBytes;
          copyFileSync(resolve(from, file.name), resolve(outDir, "dict", file.name));
        }
        writeFileSync(resolve(outDir, "dict/manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
      },
    },
  ],
  build: {
    outDir,
    emptyOutDir: true,
    assetsDir: "",
    target: "es2022",
    modulePreload: false,
    assetsInlineLimit: 0,
    rollupOptions: {
      input: resolve(here, "engine.ts"),
      preserveEntrySignatures: false,
      output: {
        entryFileNames: "engine.js",
        chunkFileNames: "[name]-[hash].js",
        assetFileNames: "[name]-[hash][extname]",
      },
    },
  },
};
