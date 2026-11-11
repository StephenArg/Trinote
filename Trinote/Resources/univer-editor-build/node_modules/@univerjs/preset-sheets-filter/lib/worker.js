import { UniverSheetsFilterPlugin } from "@univerjs/sheets-filter";

//#region src/worker.ts
function UniverSheetsFilterWorkerPreset() {
	return { plugins: [UniverSheetsFilterPlugin] };
}

//#endregion
export { UniverSheetsFilterWorkerPreset };