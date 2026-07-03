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

## `font-size-extension.js`

Built from `font-size-entry.mjs` for Trilium / CKEditor-style **font sizes** (`text-tiny`, `text-small`, `text-big`, `text-huge` on `<span>`; default removes the mark).

```bash
cd Trinote/Resources/editor-vendor
npm install
npm run build:font-size
```

## `list-styles-extension.js`

Built from `list-styles-entry.mjs` so bullet and numbered lists can use **CKEditor / Trilium list-style-type** values on `<ul>` / `<ol>` (disc, circle, square; decimal, decimal-leading-zero, lower/upper Latin, lower/upper Roman). The main editor disables StarterKit’s default list nodes when this bundle loads and registers the extended nodes instead.

```bash
cd Trinote/Resources/editor-vendor
npm install
npm run build:list-styles
```

## `indent-extension.js`

Built from `indent-entry.mjs` so paragraphs and headings can carry **block-level indentation** (CKEditor / Trilium emit `style="margin-left:40px"`). Adds `indent`/`outdent` commands used by the toolbar; list items are still indented via TipTap's `sinkListItem`/`liftListItem`.

```bash
cd Trinote/Resources/editor-vendor
npm install
npm run build:indent
```
