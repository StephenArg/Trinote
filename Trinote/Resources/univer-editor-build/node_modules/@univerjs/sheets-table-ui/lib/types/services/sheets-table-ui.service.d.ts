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
import type { ITableFilterItem } from '@univerjs/sheets-table';
import type { ITableFilterItemList } from '../types';
import { Disposable, ICommandService, IUniverInstanceService, LocaleService } from '@univerjs/core';
import { SheetTableService, TableManager } from '@univerjs/sheets-table';
import { FilterByEnum } from '../types';
interface ISheetTableFilterPanelProps {
    unitId: string;
    subUnitId: string;
    tableFilter: ITableFilterItem | undefined;
    currentFilterBy: FilterByEnum;
    tableId: string;
    columnIndex: number;
}
export declare class SheetsTableUiService extends Disposable {
    private _tableManager;
    private _sheetTableService;
    private readonly _univerInstanceService;
    private readonly _commandService;
    private readonly _localeService;
    private _itemsCache;
    constructor(_tableManager: TableManager, _sheetTableService: SheetTableService, _univerInstanceService: IUniverInstanceService, _commandService: ICommandService, _localeService: LocaleService);
    private _registerTableFilterChangeEvent;
    getTableFilterPanelInitProps(unitId: string, subUnitId: string, tableId: string, column: number): ISheetTableFilterPanelProps;
    getTableFilterCheckedItems(unitId: string, tableId: string, columnIndex: number): string[];
    setTableFilter(unitId: string, tableId: string, columnIndex: number, tableFilter: ITableFilterItem | undefined): void;
    getTableFilterItems(unitId: string, subUnitId: string, tableId: string, columnIndex: number): ITableFilterItemList;
}
export {};
