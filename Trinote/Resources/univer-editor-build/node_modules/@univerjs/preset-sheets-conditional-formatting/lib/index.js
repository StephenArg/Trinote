import { UniverSheetsConditionalFormattingPlugin } from "@univerjs/sheets-conditional-formatting";
import { UniverSheetsConditionalFormattingUIPlugin } from "@univerjs/sheets-conditional-formatting-ui";
import "@univerjs/sheets-conditional-formatting/facade";

export * from "@univerjs/sheets-conditional-formatting"

export * from "@univerjs/sheets-conditional-formatting-ui"

//#region src/preset.ts
function UniverSheetsConditionalFormattingPreset() {
	return { plugins: [UniverSheetsConditionalFormattingPlugin, UniverSheetsConditionalFormattingUIPlugin].filter((v) => !!v) };
}

//#endregion
export { UniverSheetsConditionalFormattingPreset };