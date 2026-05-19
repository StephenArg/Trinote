# Univer Sheets editor bundle

`univer-bundle.js` and `univer-bundle.css` are produced by the esbuild project at
`Trinote/Resources/univer-editor-build/`. They are bundled into the iOS app as
a folder reference (declared in `project.yml`) so `univer-editor.html` can load
them via relative paths.

Spreadsheet notes are Univer Sheets workbooks (Trilium v0.103+) stored as JSON
wrapped in a `{ version: 1, workbook: <IWorkbookData> }` envelope. The editor
is registered with **mobile** UI plugins (`UniverMobileUIPlugin`,
`UniverSheetsMobileUIPlugin`) instead of the desktop preset so dragging
scrolls the viewport instead of selecting cells — see
`https://github.com/dream-num/univer/tree/v0.22.1/examples/src/sheets-mobile`.

## Version

| Trilium release | Univer version | Source |
|-----------------|----------------|--------|
| v0.103.x        | 0.22.1         | `npm @univerjs/* 0.22.1` |

This pinning matches Trilium upstream:
`apps/client/src/widgets/type_widgets/spreadsheet/Spreadsheet.tsx`.

## Rebuilding

```bash
cd Trinote/Resources/univer-editor-build
npm install
npm run build
```

Output lands in this directory.

## Bridge contract

`univer-editor.html` exposes `window.univerBridge`:

- `loadWorkbook(jsonString)` — accepts Trilium's wrapped envelope or a bare
  `IWorkbookData`. Idempotent: disposes any previously loaded workbook first.
- `getWorkbook()` — returns the current workbook re-wrapped in
  `{ version: 1, workbook: ... }` (ready to upload via TriliumClient).
- `setDarkMode(on)` — bridges `prefers-color-scheme` updates.

Outgoing WKScriptMessageHandler names:

- `univerReady` — Univer has booted, safe to call `loadWorkbook`.
- `workbookChanged` — debounced (≈400 ms) signal that the user mutated the
  sheet; the Swift bridge sets `spreadsheetHasUnsavedChanges = true`.
- `univerLog` — internal diagnostics forwarder.
