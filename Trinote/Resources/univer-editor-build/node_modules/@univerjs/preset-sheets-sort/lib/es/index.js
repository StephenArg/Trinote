import { UniverSheetsSortPlugin } from "@univerjs/sheets-sort";
import { UniverSheetsSortUIPlugin } from "@univerjs/sheets-sort-ui";
import "@univerjs/sheets-sort/facade";

export * from "@univerjs/sheets-sort"

export * from "@univerjs/sheets-sort-ui"

//#region src/preset.ts
function UniverSheetsSortPreset() {
	return { plugins: [UniverSheetsSortPlugin, UniverSheetsSortUIPlugin].filter((v) => !!v) };
}

//#endregion
export { UniverSheetsSortPreset };