import { UniverFindReplacePlugin } from "@univerjs/find-replace";
import { UniverSheetsFindReplacePlugin } from "@univerjs/sheets-find-replace";
import "@univerjs/sheets-find-replace/facade";

export * from "@univerjs/find-replace"

export * from "@univerjs/sheets-find-replace"

//#region src/preset.ts
function UniverSheetsFindReplacePreset(_config = {}) {
	return { plugins: [[UniverFindReplacePlugin], [UniverSheetsFindReplacePlugin]].filter((v) => !!v) };
}

//#endregion
export { UniverSheetsFindReplacePreset };