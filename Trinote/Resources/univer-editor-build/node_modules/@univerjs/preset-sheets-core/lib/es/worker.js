import { UniverFormulaEnginePlugin } from "@univerjs/engine-formula";
import { UniverRPCWorkerThreadPlugin } from "@univerjs/rpc";
import { UniverSheetsPlugin } from "@univerjs/sheets";
import { UniverRemoteSheetsFormulaPlugin } from "@univerjs/sheets-formula";

//#region src/worker.ts
function UniverSheetsCoreWorkerPreset(config = {}) {
	const { formula } = config;
	return { plugins: [
		[UniverSheetsPlugin, { onlyRegisterFormulaRelatedMutations: true }],
		[UniverFormulaEnginePlugin, { function: formula === null || formula === void 0 ? void 0 : formula.function }],
		UniverRPCWorkerThreadPlugin,
		UniverRemoteSheetsFormulaPlugin
	] };
}

//#endregion
export { UniverSheetsCoreWorkerPreset };