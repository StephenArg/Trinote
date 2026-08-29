let _univerjs_core = require("@univerjs/core");
let _univerjs_sheets_table = require("@univerjs/sheets-table");
let _univerjs_sheets_facade = require("@univerjs/sheets/facade");
let _univerjs_sheets = require("@univerjs/sheets");
let _univerjs_core_facade = require("@univerjs/core/facade");

//#region src/facade/f-workbook.ts
var FWorkbookSheetsTableMixin = class extends _univerjs_sheets_facade.FWorkbook {
	getTableInfo(tableId) {
		const unitId = this.getId();
		return this._injector.get(_univerjs_sheets_table.SheetTableService).getTableInfo(unitId, tableId);
	}
	getTableList() {
		const unitId = this.getId();
		return this._injector.get(_univerjs_sheets_table.SheetTableService).getTableList(unitId);
	}
	async addTable(subUnitId, tableName, rangeInfo, tableId, options) {
		const sheetTableService = this._injector.get(_univerjs_sheets_table.SheetTableService);
		const localeService = this._injector.get(_univerjs_core.LocaleService);
		const workbook = this._injector.get(_univerjs_core.IUniverInstanceService).getCurrentUnitOfType(_univerjs_core.UniverInstanceType.UNIVER_SHEET);
		const sheetNameSet = /* @__PURE__ */ new Set();
		if (workbook) workbook.getSheets().forEach((sheet) => {
			sheetNameSet.add(sheet.getName());
		});
		if (!(0, _univerjs_core.customNameCharacterCheck)(tableName, sheetNameSet)) {
			this._injector.get(_univerjs_core.ILogService).warn(localeService.t("sheets-table.tableNameError"));
			return;
		}
		const addTableParams = {
			unitId: this.getId(),
			name: tableName,
			subUnitId,
			range: rangeInfo,
			options,
			id: tableId
		};
		if (await this._commandService.executeCommand(_univerjs_sheets_table.AddSheetTableCommand.id, addTableParams)) {
			var _sheetTableService$ge;
			return (_sheetTableService$ge = sheetTableService.getTableList(this.getId()).find((table) => table.name === tableName)) === null || _sheetTableService$ge === void 0 ? void 0 : _sheetTableService$ge.id;
		}
	}
	async removeTable(tableId) {
		var _this$getTableInfo;
		const subUnitId = (_this$getTableInfo = this.getTableInfo(tableId)) === null || _this$getTableInfo === void 0 ? void 0 : _this$getTableInfo.subUnitId;
		if (!subUnitId) return false;
		const removedTableParams = {
			unitId: this.getId(),
			subUnitId,
			tableId
		};
		return this._commandService.executeCommand(_univerjs_sheets_table.DeleteSheetTableCommand.id, removedTableParams);
	}
	getTableInfoByName(tableName) {
		return this.getTableList().find((table) => table.name === tableName);
	}
	setTableFilter(tableId, column, filter) {
		const setTableFilterParams = {
			unitId: this.getId(),
			tableId,
			column,
			tableFilter: filter
		};
		return this._commandService.executeCommand(_univerjs_sheets_table.SetSheetTableFilterCommand.id, setTableFilterParams);
	}
};
_univerjs_sheets_facade.FWorkbook.extend(FWorkbookSheetsTableMixin);

//#endregion
//#region src/facade/f-worksheet.ts
var FWorksheetTableMixin = class extends _univerjs_sheets_facade.FWorksheet {
	addTable(tableName, rangeInfo, tableId, options) {
		const subUnitId = this.getSheetId();
		const workbook = this.getWorkbook();
		const unitId = workbook.getUnitId();
		const localeService = this._injector.get(_univerjs_core.LocaleService);
		const sheetNameSet = /* @__PURE__ */ new Set();
		if (workbook) workbook.getSheets().forEach((sheet) => {
			sheetNameSet.add(sheet.getName());
		});
		if (!(0, _univerjs_core.customNameCharacterCheck)(tableName, sheetNameSet)) {
			this._injector.get(_univerjs_core.ILogService).warn(localeService.t("sheets-table.tableNameError"));
			return false;
		}
		const addTableParams = {
			unitId,
			subUnitId,
			name: tableName,
			range: rangeInfo,
			id: tableId,
			options
		};
		return this._commandService.executeCommand(_univerjs_sheets_table.AddSheetTableCommand.id, addTableParams);
	}
	setTableFilter(tableId, column, filter) {
		const setTableFilterParams = {
			unitId: this.getWorkbook().getUnitId(),
			tableId,
			column,
			tableFilter: filter
		};
		return this._commandService.executeCommand(_univerjs_sheets_table.SetSheetTableFilterCommand.id, setTableFilterParams);
	}
	removeTable(tableId) {
		const removedTableParams = {
			unitId: this._fWorkbook.getId(),
			subUnitId: this.getSheetId(),
			tableId
		};
		return this._commandService.executeCommand(_univerjs_sheets_table.DeleteSheetTableCommand.id, removedTableParams);
	}
	setTableRange(tableId, rangeInfo) {
		const tableSetConfig = {
			unitId: this.getWorkbook().getUnitId(),
			tableId,
			updateRange: { newRange: rangeInfo }
		};
		return this._commandService.executeCommand(_univerjs_sheets_table.SetSheetTableCommand.id, tableSetConfig);
	}
	setTableName(tableId, tableName) {
		const workbook = this.getWorkbook();
		const localeService = this._injector.get(_univerjs_core.LocaleService);
		const sheetNameSet = /* @__PURE__ */ new Set();
		if (workbook) workbook.getSheets().forEach((sheet) => {
			sheetNameSet.add(sheet.getName());
		});
		if (!(0, _univerjs_core.customNameCharacterCheck)(tableName, sheetNameSet)) {
			this._injector.get(_univerjs_core.ILogService).warn(localeService.t("sheets-table.tableNameError"));
			return false;
		}
		const tableSetConfig = {
			unitId: this.getWorkbook().getUnitId(),
			tableId,
			name: tableName
		};
		return this._commandService.executeCommand(_univerjs_sheets_table.SetSheetTableCommand.id, tableSetConfig);
	}
	getSubTableInfos() {
		const unitId = this._fWorkbook.getId();
		return this._injector.get(_univerjs_sheets_table.SheetTableService).getTableList(unitId).filter((table) => table.subUnitId === this.getSheetId());
	}
	resetFilter(tableId, column) {
		const setTableFilterParams = {
			unitId: this._fWorkbook.getId(),
			tableId,
			column,
			tableFilter: void 0
		};
		return this._commandService.executeCommand(_univerjs_sheets_table.SetSheetTableFilterCommand.id, setTableFilterParams);
	}
	getTableByCell(row, column) {
		const unitId = this._fWorkbook.getId();
		const allSubTableInfos = this._injector.get(_univerjs_sheets_table.SheetTableService).getTableList(unitId).filter((table) => table.subUnitId === this.getSheetId());
		const cellRange = (0, _univerjs_core.cellToRange)(row, column);
		return allSubTableInfos.find((table) => {
			const tableRange = table.range;
			return _univerjs_core.Rectangle.intersects(tableRange, cellRange);
		});
	}
	addTableTheme(tableId, themeStyleJSON) {
		const themeStyle = new _univerjs_sheets.RangeThemeStyle("table-style");
		themeStyle.fromJson(themeStyleJSON);
		return this._commandService.executeCommand(_univerjs_sheets_table.AddTableThemeCommand.id, {
			unitId: this._fWorkbook.getId(),
			tableId,
			themeStyle
		});
	}
};
_univerjs_sheets_facade.FWorksheet.extend(FWorksheetTableMixin);

//#endregion
//#region src/facade/f-enum.ts
/**
* Copyright 2023-present DreamNum Co., Ltd.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var FSheetsTableEnumMixin = class extends _univerjs_core_facade.FEnum {
	get TableColumnFilterTypeEnum() {
		return _univerjs_sheets_table.TableColumnFilterTypeEnum;
	}
	get TableConditionTypeEnum() {
		return _univerjs_sheets_table.TableConditionTypeEnum;
	}
	get TableNumberCompareTypeEnum() {
		return _univerjs_sheets_table.TableNumberCompareTypeEnum;
	}
	get TableStringCompareTypeEnum() {
		return _univerjs_sheets_table.TableStringCompareTypeEnum;
	}
	get TableDateCompareTypeEnum() {
		return _univerjs_sheets_table.TableDateCompareTypeEnum;
	}
};
_univerjs_core_facade.FEnum.extend(FSheetsTableEnumMixin);

//#endregion