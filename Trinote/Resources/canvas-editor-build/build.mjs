import * as esbuild from "esbuild";
import { cpSync, mkdirSync, existsSync, readdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, "..", "canvas-editor-assets");

mkdirSync(outDir, { recursive: true });

await esbuild.build({
  entryPoints: [resolve(__dirname, "canvas-editor-app.jsx")],
  bundle: true,
  minify: true,
  format: "iife",
  outfile: resolve(outDir, "excalidraw-bundle.js"),
  jsx: "automatic",
  jsxImportSource: "preact",
  conditions: ["development", "browser", "default"],
  alias: {
    "react": "preact/compat",
    "react-dom": "preact/compat",
    "react/jsx-runtime": "preact/jsx-runtime",
    "react-dom/client": "preact/compat/client",
  },
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
    "process.env.IS_PREACT": '"true"',
  },
});

// Copy the full Excalidraw dist/prod tree (fonts, locales, dynamic chunks, workers, data).
// Excalidraw loads chunk files, the font-subsetting worker, and locale JS at runtime via
// dynamic import() from EXCALIDRAW_ASSET_PATH — they must all be present.
const excalidrawProdPath = resolve(__dirname, "node_modules", "@excalidraw", "excalidraw", "dist", "prod");
if (existsSync(excalidrawProdPath)) {
  function copyRecursive(src, dest) {
    mkdirSync(dest, { recursive: true });
    for (const entry of readdirSync(src, { withFileTypes: true })) {
      const srcPath = resolve(src, entry.name);
      const destPath = resolve(dest, entry.name);
      if (entry.isDirectory()) {
        copyRecursive(srcPath, destPath);
      } else {
        cpSync(srcPath, destPath);
      }
    }
  }

  const dest = resolve(outDir, "dist", "prod");
  copyRecursive(excalidrawProdPath, dest);
  console.log("Copied Excalidraw dist/prod to", dest);
}

console.log("Build complete! Output:", outDir);
