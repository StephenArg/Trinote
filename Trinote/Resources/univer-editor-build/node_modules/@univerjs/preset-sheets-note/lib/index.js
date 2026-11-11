import { UniverSheetsNotePlugin } from "@univerjs/sheets-note";
import { UniverSheetsNoteUIPlugin } from "@univerjs/sheets-note-ui";
import "@univerjs/sheets-note/facade";

export * from "@univerjs/sheets-note"

export * from "@univerjs/sheets-note-ui"

//#region src/preset.ts
function UniverSheetsNotePreset() {
	return { plugins: [UniverSheetsNotePlugin, UniverSheetsNoteUIPlugin].filter((v) => !!v) };
}

//#endregion
export { UniverSheetsNotePreset };