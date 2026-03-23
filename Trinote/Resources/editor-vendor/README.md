# Editor vendor assets

## `callout-extension.js`

Built from `callout-entry.mjs` with esbuild so the rich text editor can use Trilium-style **callouts / admonitions** (Note, Tip, Important, Caution, Warning).

Regenerate after editing the entry file:

```bash
cd Trinote/Resources/editor-vendor
npm install
npm run build:callout
```

The output bundles `@tiptap/core` (~260KB). It targets the same TipTap v2 line as `tiptap-bundle.min.js`. If the editor fails to load after a TipTap upgrade, rebuild this file or align `@tiptap/core` in `package.json` with the bundle’s version.
