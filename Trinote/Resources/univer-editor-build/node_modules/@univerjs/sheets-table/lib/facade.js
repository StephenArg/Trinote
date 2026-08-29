import { ILogService, IUniverInstanceService, LocaleService, Rectangle, UniverInstanceType, cellToRange, customNameCharacterCheck } from "@univerjs/core";
import { AddSheetTableCommand, AddTableThemeCommand, DeleteSheetTableCommand, SetSheetTableCommand, SetSheetTableFilterCommand, SheetTableService, TableColumnFilterTypeEnum, TableConditionTypeEnum, TableDateCompareTypeEnum, TableNumberCompareTypeEnum, TableStringCompareTypeEnum } from "@univerjs/sheets-table";
import { FWorkbook, FWorksheet } from "@univerjs/sheets/facade";
import { RangeThemeStyle } from "@univerjs/sheets";
import { FEnum } from "@univerjs/core/facade";

//#region src/facade/f-workbook.ts
var FWorkbookSheetsTableMixin = class extends FWorkbook {
	getTableInfo(tableId) {
		const unitId = this.getId();
		return this._injector.get(SheetTableService).getTableInfo(unitId, tableId);
	}
	getTableList() {
		const unitId = this.getId();
		return this._injector.get(SheetTableService).getTableList(unitId);
	}
	async addTable(subUnitId, tableName, rangeInfo, tableId, options) {
		const sheetTableService = this._injector.get(SheetTableService);
		const localeService = this._injector.get(LocaleService);
		const workbook = this._injector.get(IUniverInstanceService).getCurrentUnitOfType(UniverInstanceType.UNIVER_SHEET);
		const sheetNameSet = /* @__PURE__ */ new Set();
		if (workbook) workbook.getSheets().forEach((sheet) => {
			sheetNameSet.add(sheet.getName());
		});
		if (!customNameCharacterCheck(tableName, sheetNameSet)) {
			this._injector.get(ILogService).warn(localeService.t("sheets-table.tableNameError"));
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
		if (await this._commandService.executeCommand(AddSheetTableCommand.id, addTableParams)) {
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
		return this._commandService.executeCommand(DeleteSheetTableCommand.id, removedTableParams);
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
		return this._commandService.executeCommand(SetSheetTableFilterCommand.id, setTableFilterParams);
	}
};
FWorkbook.extend(FWorkbookSheetsTableMixin);

//#endregion
//#region src/facade/f-worksheet.ts
var FWorksheetTableMixin = class extends FWorksheet {
	addTable(tableName, rangeInfo, tableId, options) {
		const subUnitId = this.getSheetId();
		const workbook = this.getWorkbook();
		const unitId = workbook.getUnitId();
		const localeService = this._injector.get(LocaleService);
		const sheetNameSet = /* @__PURE__ */ new Set();
		if (workbook) workbook.getSheets().forEach((sheet) => {
			sheetNameSet.add(sheet.getName());
		});
		if (!customNameCharacterCheck(tableName, sheetNameSet)) {
			this._injector.get(ILogService).warn(localeService.t("sheets-table.tableNameError"));
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
		return this._commandService.executeCommand(AddSheetTableCommand.id, addTableParams);
	}
	setTableFilter(tableId, column, filter) {
		const setTableFilterParams = {
			unitId: this.getWorkbook().getUnitId(),
			tableId,
			column,
			tableFilter: filter
		};
		return this._commandService.executeCommand(SetSheetTableFilterCommand.id, setTableFilterParams);
	}
	removeTable(tableId) {
		const removedTableParams = {
			unitId: this._fWorkbook.getId(),
			subUnitId: this.getSheetId(),
			tableId
		};
		return this._commandService.executeCommand(DeleteSheetTableCommand.id, removedTableParams);
	}
	setTableRange(tableId, rangeInfo) {
		const tableSetConfig = {
			unitId: this.getWorkbook().getUnitId(),
			tableId,
			updateRange: { newRange: rangeInfo }
		};
		return this._commandService.executeCommand(SetSheetTableCommand.id, tableSetConfig);
	}
	setTableName(tableId, tableName) {
		const workbook = this.getWorkbook();
		const localeService = this._injector.get(LocaleService);
		const sheetNameSet = /* @__PURE__ */ new Set();
		if (workbook) workbook.getSheets().forEach((sheet) => {
			sheetNameSet.add(sheet.getName());
		});
		if (!customNameCharacterCheck(tableName, sheetNameSet)) {
			this._injector.get(ILogService).warn(localeService.t("sheets-table.tableNameError"));
			return false;
		}
		const tableSetConfig = {
			unitId: this.getWorkbook().getUnitId(),
			tableId,
			name: tableName
		};
		return this._commandService.executeCommand(SetSheetTableCommand.id, tableSetConfig);
	}
	getSubTableInfos() {
		const unitId = this._fWorkbook.getId();
		return this._injector.get(SheetTableService).getTableList(unitId).filter((table) => table.subUnitId === this.getSheetId());
	}
	resetFilter(tableId, column) {
		const setTableFilterParams = {
			unitId: this._fWorkbook.getId(),
			tableId,
			column,
			tableFilter: void 0
		};
		return this._commandService.executeCommand(SetSheetTableFilterCommand.id, setTableFilterParams);
	}
	getTableByCell(row, column) {
		const unitId = this._fWorkbook.getId();
		const allSubTableInfos = this._injector.get(SheetTableService).getTableList(unitId).filter((table) => table.subUnitId === this.getSheetId());
		const cellRange = cellToRange(row, column);
		return allSubTableInfos.find((table) => {
			const tableRange = table.range;
			return Rectangle.intersects(tableRange, cellRange);
		});
	}
	addTableTheme(tableId, themeStyleJSON) {
		const themeStyle = new RangeThemeStyle("table-style");
		themeStyle.fromJson(themeStyleJSON);
		return this._commandService.executeCommand(AddTableThemeCommand.id, {
			unitId: this._fWorkbook.getId(),
			tableId,
			themeStyle
		});
	}
};
FWorksheet.extend(FWorksheetTableMixin);

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
var FSheetsTableEnumMixin = class extends FEnum {
	get TableColumnFilterTypeEnum() {
		return TableColumnFilterTypeEnum;
	}
	get TableConditionTypeEnum() {
		return TableConditionTypeEnum;
	}
	get TableNumberCompareTypeEnum() {
		return TableNumberCompareTypeEnum;
	}
	get TableStringCompareTypeEnum() {
		return TableStringCompareTypeEnum;
	}
	get TableDateCompareTypeEnum() {
		return TableDateCompareTypeEnum;
	}
};
FEnum.extend(FSheetsTableEnumMixin);

//#endregion
export {  };