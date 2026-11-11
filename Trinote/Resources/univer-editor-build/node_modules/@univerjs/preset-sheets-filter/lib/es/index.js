import { UniverSheetsFilterPlugin } from "@univerjs/sheets-filter";
import { UniverSheetsFilterUIPlugin } from "@univerjs/sheets-filter-ui";
import "@univerjs/sheets-filter/facade";

export * from "@univerjs/sheets-filter"

export * from "@univerjs/sheets-filter-ui"

//#region src/preset.ts
function UniverSheetsFilterPreset(config = {}) {
	const { enableSyncSwitch } = config;
	return { plugins: [[UniverSheetsFilterPlugin, { enableSyncSwitch }], UniverSheetsFilterUIPlugin].filter((v) => !!v) };
}

//#endregion
export { UniverSheetsFilterPreset };