Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
let _univerjs_engine_formula = require("@univerjs/engine-formula");
let _univerjs_rpc = require("@univerjs/rpc");
let _univerjs_sheets = require("@univerjs/sheets");
let _univerjs_sheets_formula = require("@univerjs/sheets-formula");

//#region src/worker.ts
function UniverSheetsCoreWorkerPreset(config = {}) {
	const { formula } = config;
	return { plugins: [
		[_univerjs_sheets.UniverSheetsPlugin, { onlyRegisterFormulaRelatedMutations: true }],
		[_univerjs_engine_formula.UniverFormulaEnginePlugin, { function: formula === null || formula === void 0 ? void 0 : formula.function }],
		_univerjs_rpc.UniverRPCWorkerThreadPlugin,
		_univerjs_sheets_formula.UniverRemoteSheetsFormulaPlugin
	] };
}

//#endregion
exports.UniverSheetsCoreWorkerPreset = UniverSheetsCoreWorkerPreset;