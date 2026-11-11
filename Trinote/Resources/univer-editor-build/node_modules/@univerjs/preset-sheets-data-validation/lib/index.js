import { UniverDataValidationPlugin } from "@univerjs/data-validation";
import { UniverSheetsDataValidationPlugin } from "@univerjs/sheets-data-validation";
import { UniverSheetsDataValidationUIPlugin } from "@univerjs/sheets-data-validation-ui";
import "@univerjs/sheets-data-validation/facade";

export * from "@univerjs/data-validation"

export * from "@univerjs/sheets-data-validation"

export * from "@univerjs/sheets-data-validation-ui"

//#region src/preset.ts
function UniverSheetsDataValidationPreset(config = {}) {
	const { showEditOnDropdown, showSearchOnDropdown } = config;
	return { plugins: [
		UniverDataValidationPlugin,
		UniverSheetsDataValidationPlugin,
		[UniverSheetsDataValidationUIPlugin, {
			showEditOnDropdown,
			showSearchOnDropdown
		}]
	].filter((v) => !!v) };
}

//#endregion
export { UniverSheetsDataValidationPreset };