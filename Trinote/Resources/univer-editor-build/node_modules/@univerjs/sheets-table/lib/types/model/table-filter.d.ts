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
import type { Worksheet } from '@univerjs/core';
import type { SheetsTableButtonStateEnum } from '../types/enum';
import type { ITableFilterItem, ITableFilterJSON, ITableRange } from '../types/type';
import { SheetsTableSortStateEnum } from '../types/enum';
export declare class TableFilters {
    private _tableColumnFilterList;
    private _tableSortInfo;
    private _filterOutRows;
    constructor();
    setColumnFilter(columnIndex: number, filter: ITableFilterItem | undefined): void;
    setSortState(columnIndex: number, sortState: SheetsTableSortStateEnum): void;
    getColumnFilter(columnIndex: number): ITableFilterItem | undefined;
    getFilterState(columnIndex: number): SheetsTableButtonStateEnum;
    getSortState(): {
        columnIndex: number;
        sortState: SheetsTableSortStateEnum;
    };
    getFilterStates(range: ITableRange): SheetsTableButtonStateEnum[];
    getFilterOutRows(): Set<number>;
    doFilter(sheet: Worksheet, range: ITableRange): Set<number>;
    doColumnFilter(sheet: Worksheet, range: ITableRange, columnIndex: number, filterOutRows: Set<number>): void;
    private _getNumberCalculatedOptions;
    getExecuteFunc(sheet: Worksheet, range: ITableRange, columnIndex: number, filter: ITableFilterItem): (value: any) => boolean;
    toJSON(): ITableFilterJSON;
    fromJSON(json: ITableFilterJSON): void;
    dispose(): void;
}
