import * as esbuild from "esbuild";
import { mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, "..", "univer-editor-assets");

mkdirSync(outDir, { recursive: true });

await esbuild.build({
  entryPoints: [resolve(__dirname, "univer-editor-app.js")],
  bundle: true,
  minify: true,
  format: "iife",
  outfile: resolve(outDir, "univer-bundle.js"),
  jsx: "automatic",
  conditions: ["browser", "default"],
  loader: {
    ".woff2": "dataurl",
    ".woff": "dataurl",
    ".ttf": "dataurl",
    ".png": "dataurl",
    ".svg": "dataurl",
    ".css": "css",
  },
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});

console.log("Build complete! Output:", outDir);
