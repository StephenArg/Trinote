import { FUniver } from "@univerjs/core/facade";
import { GlobalRangeSelectorService } from "@univerjs/sheets-formula-ui";

//#region src/facade/f-univer.ts
var FUniverSheetsFormulaUIMixin = class extends FUniver {
	showRangeSelectorDialog(opts) {
		return this._injector.get(GlobalRangeSelectorService).showRangeSelectorDialog(opts);
	}
};
FUniver.extend(FUniverSheetsFormulaUIMixin);

//#endregion
export { FUniverSheetsFormulaUIMixin };