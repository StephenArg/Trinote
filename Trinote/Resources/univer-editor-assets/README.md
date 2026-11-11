# Univer Sheets editor bundle

`univer-bundle.js` and `univer-bundle.css` are produced by the esbuild project at
`Trinote/Resources/univer-editor-build/`. They are bundled into the iOS app as
a folder reference (declared in `project.yml`) so `univer-editor.html` can load
them via relative paths.

Spreadsheet notes are Univer Sheets workbooks (Trilium v0.103+) stored as JSON
wrapped in a `{ version: 1, workbook: <IWorkbookData> }` envelope. The editor
uses Trilium v0.107's **preset stack** at **1.3.1**, with desktop UI shells
swapped for mobile variants (`toMobilePresets`) so dragging scrolls the viewport
instead of selecting cells.

## Version

| Trilium release | Univer version | Source |
|-----------------|----------------|--------|
| v0.107.x        | 1.3.1          | `@univerjs/presets` + preset-sheets-* 1.3.1 |
| v0.105.x        | 0.25.1         | `@univerjs/presets` + preset-sheets-* 0.25.1 |
| v0.103.x        | 0.22.1         | `npm @univerjs/* 0.22.1` (legacy) |

Reference implementation: Trilium
`apps/client/src/widgets/type_widgets/spreadsheet/Spreadsheet.tsx` (v0.107).

## Registered presets (v1.3.1)

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

Output lands in this directory (~13 MB `univer-bundle.js` as of 1.3.1).

`trinote-mobile-selection-handles.js` and `trinote-mobile-drawing-touch.js` reach into Univer's internals, so an upgrade
can break them without a build error. 1.x renamed `getRenderById` to `getRenderUnitById`, the mobile selection's
`fillControlTopLeft`/`fillControlBottomRight` to `expandControl…`, and `_fillControlPointerDownHandler` to
`_expandControlPointerDownHandler`, and it now makes a workbook current after `createWorkbook` returns. 1.x also
changed the mobile selection in two ways that broke dragging a selection's corners without any error:

- `MobileSelectionControl` always passes `enableAutoFill: false` and shows its corners whenever the selection has no
  widgets. Trinote's handles used to follow `_enableAutoFill`, so they never showed. They now follow Univer's own
  corners (`expandControlTopLeft.visible`).
- The mobile UI plugin no longer registers autofill's render controller (not exported) or `AutoFillUIController` (the
  Copy cell / Fill series chip). Trinote's fill handles run `AutoFillCommand` themselves, along one axis only, and
  `registerMobileAutoFill` adds the chip's controller.

After an upgrade, run `UniverEditorSmokeTests`. It opens the real page, checks that the handles are installed, and drags
the resize and fill handles with touch pointer events (`testDraggingASelectionsCornersResizesAndFillsIt`).

## Bridge contract

`univer-editor.html` exposes `window.univerBridge`:

- `loadWorkbook(jsonString)` — accepts Trilium's wrapped envelope or a bare
  `IWorkbookData`. Idempotent: disposes any previously loaded workbook first.
  Uses `CalculationMode.NO_CALCULATION` on load to avoid spurious dirty saves.
- `getWorkbook()` — async. Waits for a pending formula recalculation (as Trilium
  v0.105+ does), drops `id`, `locale` and empty resources (Trilium v0.107's
  `slimWorkbookData`), and returns `{ version: 1, workbook: ... }`. Every Trilium
  from v0.103 reads that envelope.
- `setDarkMode(on)` — bridges `prefers-color-scheme` updates.
- For the native cell bar (`SpreadsheetCellBar.swift`): `activeCell()`,
  `setCellInput(sheetId, row, column, text)` (parsed like Univer's cell editor:
  `=` starts a formula, `25%` is a percentage, `""` empties the cell),
  `selectCell(sheetId, row, column)`, `clearSelectedCells()` (one undo step),
  `undo()` and `redo()`.

Outgoing WKScriptMessageHandler names:

- `univerReady` — Univer has booted, safe to call `loadWorkbook`.
- `workbookChanged` — debounced (≈400 ms) signal that the user mutated the
  sheet; the Swift bridge sets `spreadsheetHasUnsavedChanges = true`.
- `univerLog` — internal diagnostics forwarder.
- `cellSelection` — the selected cell as JSON (`activeCellState`), or `""` with
  no workbook. Sent after any command that changes it, including Univer's own
  in-cell editor opening (`isEditingInCell`).

## Device QA (manual)

After rebuilding, verify on a physical device against a Trilium v0.107 server:

- Editor boots without blank screen; no immediate save chip on open
- One-finger drag scrolls; tap selects cell; the cell bar under the sheet shows
  the cell, types into it (Return moves down), picks references while a formula
  waits for an operand, and Clear, Undo and Redo work
- Cell edit + save round-trips to Trilium desktop without data loss
- Desktop workbooks with filters, images, conditional formatting, notes, and
  hyperlinks load and render in the editor
- Light/dark mode; iPhone cover editor and iPad inline editor layouts

The native read-only preview (`SpreadsheetNoteView`) shows cell text only;
advanced visuals appear only in the full editor.
