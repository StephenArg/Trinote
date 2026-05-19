Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
let _univerjs_core_facade = require("@univerjs/core/facade");
let _univerjs_sheets_formula_ui = require("@univerjs/sheets-formula-ui");

//#region src/facade/f-univer.ts
var FUniverSheetsFormulaUIMixin = class extends _univerjs_core_facade.FUniver {
	showRangeSelectorDialog(opts) {
		return this._injector.get(_univerjs_sheets_formula_ui.GlobalRangeSelectorService).showRangeSelectorDialog(opts);
	}
};
_univerjs_core_facade.FUniver.extend(FUniverSheetsFormulaUIMixin);

//#endregion
exports.FUniverSheetsFormulaUIMixin = FUniverSheetsFormulaUIMixin;