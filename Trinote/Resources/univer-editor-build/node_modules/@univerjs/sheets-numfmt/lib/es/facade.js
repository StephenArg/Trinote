import { SetNumfmtCommand, SheetsNumfmtCellContentController } from "@univerjs/sheets-numfmt";
import { FRange, FWorkbook } from "@univerjs/sheets/facade";

//#region src/facade/f-range.ts
var FRangeSheetsNumfmtMixin = class extends FRange {
	setNumberFormat(pattern) {
		const values = [];
		const { startColumn, startRow, endColumn, endRow } = this._range;
		for (let row = startRow; row <= endRow; row++) for (let col = startColumn; col <= endColumn; col++) values.push({
			row,
			col,
			pattern
		});
		this._commandService.syncExecuteCommand(SetNumfmtCommand.id, {
			unitId: this._workbook.getUnitId(),
			subUnitId: this._worksheet.getSheetId(),
			values
		});
		return this;
	}
	setNumberFormats(patterns) {
		const values = [];
		const { startColumn, startRow, endColumn, endRow } = this._range;
		for (let row = startRow; row <= endRow; row++) for (let col = startColumn; col <= endColumn; col++) {
			var _patterns;
			const pattern = (_patterns = patterns[row - startRow]) === null || _patterns === void 0 ? void 0 : _patterns[col - startColumn];
			values.push({
				row,
				col,
				pattern
			});
		}
		this._commandService.syncExecuteCommand(SetNumfmtCommand.id, {
			unitId: this._workbook.getUnitId(),
			subUnitId: this._worksheet.getSheetId(),
			values
		});
		return this;
	}
	getNumberFormat() {
		var _style$numberFormat$p, _style$numberFormat;
		const style = this.getCellStyle();
		return (_style$numberFormat$p = style === null || style === void 0 || (_style$numberFormat = style.numberFormat) === null || _style$numberFormat === void 0 ? void 0 : _style$numberFormat.pattern) !== null && _style$numberFormat$p !== void 0 ? _style$numberFormat$p : "";
	}
	getNumberFormats() {
		return this.getCellStyles().map((row) => row.map((cellStyle) => {
			var _cellStyle$numberForm, _cellStyle$numberForm2;
			return (_cellStyle$numberForm = cellStyle === null || cellStyle === void 0 || (_cellStyle$numberForm2 = cellStyle.numberFormat) === null || _cellStyle$numberForm2 === void 0 ? void 0 : _cellStyle$numberForm2.pattern) !== null && _cellStyle$numberForm !== void 0 ? _cellStyle$numberForm : "";
		}));
	}
};
FRange.extend(FRangeSheetsNumfmtMixin);

//#endregion
//#region src/facade/f-workbook.ts
var FWorkbookSheetsNumfmtMixin = class extends FWorkbook {
	setNumfmtLocal(locale) {
		this._injector.get(SheetsNumfmtCellContentController).setNumfmtLocal(locale);
		return this;
	}
};
FWorkbook.extend(FWorkbookSheetsNumfmtMixin);

//#endregion
export {  };