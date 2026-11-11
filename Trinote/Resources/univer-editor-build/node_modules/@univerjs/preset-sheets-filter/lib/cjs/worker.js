Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
let _univerjs_sheets_filter = require("@univerjs/sheets-filter");

//#region src/worker.ts
function UniverSheetsFilterWorkerPreset() {
	return { plugins: [_univerjs_sheets_filter.UniverSheetsFilterPlugin] };
}

//#endregion
exports.UniverSheetsFilterWorkerPreset = UniverSheetsFilterWorkerPreset;