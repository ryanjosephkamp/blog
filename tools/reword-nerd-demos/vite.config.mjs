// Builds the reword_nerd article's demos from a reword-nerd checkout:
//   REWORD_NERD_DIR=../reword-nerd ../reword-nerd/node_modules/.bin/vite build \
//     --config tools/reword-nerd-demos/vite.config.mjs
// The engine (prompts, task folders, file screening, comparison) comes straight from the app,
// so the demos can't drift from what reword_nerd does. Rebuild after the engine changes.
import { execFileSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const app = process.env.REWORD_NERD_DIR;
if (!app) throw new Error("Set REWORD_NERD_DIR to a reword-nerd checkout.");
const commit = execFileSync("git", ["-C", app, "rev-parse", "--short", "HEAD"]).toString().trim();

export default {
  root: here,
  logLevel: "warn",
  resolve: { alias: { "@engine": resolve(app, "src/engine") } },
  plugins: [
    {
      // The engine and two libraries write U+FFFD literally; some hosts refuse that byte, so
      // write it as an escape, which means the same thing.
      name: "escape-replacement-character",
      enforce: "post",
      generateBundle(_, bundle) {
        for (const file of Object.values(bundle)) {
          if (file.type === "chunk") file.code = file.code.replaceAll("\uFFFD", "\\uFFFD");
        }
      },
    },
  ],
  build: {
    outDir: resolve(here, "../../assets/reword-nerd-demos"),
    emptyOutDir: true,
    target: "es2022",
    minify: true,
    lib: {
      entry: resolve(here, "demos.ts"),
      formats: ["es"],
      fileName: () => "demos.js",
      cssFileName: "demos",
    },
    rollupOptions: {
      output: {
        chunkFileNames: "[name]-[hash].js",
        banner: `/* reword_nerd article demos, built from reword-nerd ${commit} by tools/reword-nerd-demos. Rebuild; don't edit. */`,
      },
    },
  },
};
