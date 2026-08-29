# Univer Sheets editor bundle

`univer-bundle.js` and `univer-bundle.css` are produced by the esbuild project at
`Trinote/Resources/univer-editor-build/`. They are bundled into the iOS app as
a folder reference (declared in `project.yml`) so `univer-editor.html` can load
them via relative paths.

Spreadsheet notes are Univer Sheets workbooks (Trilium v0.103+) stored as JSON
wrapped in a `{ version: 1, workbook: <IWorkbookData> }` envelope. The editor
uses Trilium v0.105's **preset stack** at **0.25.1**, with desktop UI shells
swapped for mobile variants (`toMobilePresets`) so dragging scrolls the viewport
instead of selecting cells.

## Version

| Trilium release | Univer version | Source |
|-----------------|----------------|--------|
| v0.105.x        | 0.25.1         | `@univerjs/presets` + preset-sheets-* 0.25.1 |
| v0.103.x        | 0.22.1         | `npm @univerjs/* 0.22.1` (legacy) |

Reference implementation: Trilium
`apps/client/src/widgets/type_widgets/spreadsheet/Spreadsheet.tsx` (v0.105).

## Registered presets (v0.25.1)

| Preset | Feature |
|--------|---------|
| `UniverSheetsCorePreset` | Core sheets, formulas, formula bar, number format |
| `UniverSheetsDrawingPreset` | Embedded floating images |
| `UniverSheetsFindReplacePreset` | In-editor find/replace |
| `UniverSheetsNotePreset` | Cell notes |
| `UniverSheetsFilterPreset` | Auto-filter |
| `UniverSheetsSortPreset` | Column/range sort |
| `UniverSheetsDataValidationPreset` | Dropdowns and validation rules |
| `UniverSheetsConditionalFormattingPreset` | Color scales, data bars, highlight rules |
| `UniverSheetsHyperLinkPreset` | Hyperlinks in cells |

Mobile UI shells: `UniverMobileUIPlugin`, `UniverSheetsMobileUIPlugin`, plus
mobile variants for filter, conditional formatting, and data validation UI.

## Rebuilding

```bash
cd Trinote/Resources/univer-editor-build
npm install
npm run build
```

Output lands in this directory (~11 MB `univer-bundle.js` as of 0.25.1).

## Bridge contract

`univer-editor.html` exposes `window.univerBridge`:

- `loadWorkbook(jsonString)` — accepts Trilium's wrapped envelope or a bare
  `IWorkbookData`. Idempotent: disposes any previously loaded workbook first.
  Uses `CalculationMode.NO_CALCULATION` on load to avoid spurious dirty saves.
- `getWorkbook()` — returns the current workbook re-wrapped in
  `{ version: 1, workbook: ... }` (ready to upload via TriliumClient).
- `setDarkMode(on)` — bridges `prefers-color-scheme` updates.

Outgoing WKScriptMessageHandler names:

- `univerReady` — Univer has booted, safe to call `loadWorkbook`.
- `workbookChanged` — debounced (≈400 ms) signal that the user mutated the
  sheet; the Swift bridge sets `spreadsheetHasUnsavedChanges = true`.
- `univerLog` — internal diagnostics forwarder.

## Device QA (manual)

After rebuilding, verify on a physical device against a Trilium v0.105 server:

- Editor boots without blank screen; no immediate save chip on open
- One-finger drag scrolls; tap selects cell; formula bar works
- Cell edit + save round-trips to Trilium desktop without data loss
- Desktop workbooks with filters, images, conditional formatting, notes, and
  hyperlinks load and render in the editor
- Light/dark mode; iPhone cover editor and iPad inline editor layouts

The native read-only preview (`SpreadsheetNoteView`) shows cell text only;
advanced visuals appear only in the full editor.
