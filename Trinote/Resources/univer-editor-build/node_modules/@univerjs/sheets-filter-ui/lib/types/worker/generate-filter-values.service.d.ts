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
import type { IRange, Nullable, Styles, Worksheet } from '@univerjs/core';
import type { FilterColumn } from '@univerjs/sheets-filter';
import type { IFilterByValueItem, IFilterByValueWithTreeItem } from '../services/sheets-filter-panel.service';
import { Disposable, ILogService, IUniverInstanceService, LocaleService } from '@univerjs/core';
export interface ISheetsGenerateFilterValuesService {
    getFilterValues(params: {
        unitId: string;
        subUnitId: string;
        filteredOutRowsByOtherColumns: number[];
        filterColumn: Nullable<FilterColumn>;
        filters: boolean;
        blankChecked: boolean;
        iterateRange: IRange;
        alreadyChecked: string[];
    }): Promise<{
        filterTreeItems: IFilterByValueWithTreeItem[];
        filterTreeMapCache: Map<string, string[]>;
    }>;
}
export declare const SHEETS_GENERATE_FILTER_VALUES_SERVICE_NAME = "sheets-filter.generate-filter-values.service";
export declare const ISheetsGenerateFilterValuesService: import("@wendellhu/redi").IdentifierDecorator<ISheetsGenerateFilterValuesService>;
export declare class SheetsGenerateFilterValuesService extends Disposable {
    private readonly _localeService;
    private readonly _univerInstanceService;
    private readonly _logService;
    constructor(_localeService: LocaleService, _univerInstanceService: IUniverInstanceService, _logService: ILogService);
    getFilterValues(params: {
        unitId: string;
        subUnitId: string;
        filteredOutRowsByOtherColumns: number[];
        filterColumn: Nullable<FilterColumn>;
        filters: boolean;
        blankChecked: boolean;
        iterateRange: IRange;
        alreadyChecked: string[];
    }): Promise<never[] | {
        filterTreeItems: IFilterByValueWithTreeItem[];
        filterTreeMapCache: Map<string, string[]>;
    }>;
}
export declare function getFilterByValueItems(filters: boolean, blankChecked: boolean, localeService: LocaleService, iterateRange: IRange, worksheet: Worksheet, alreadyChecked: Set<string>, filteredOutRowsByOtherColumns: Set<number>): IFilterByValueItem[];
export declare function getFilterTreeByValueItems(filters: boolean, localeService: LocaleService, iterateRange: IRange, worksheet: Worksheet, filteredOutRowsByOtherColumns: Set<number>, filterColumn: Nullable<FilterColumn>, alreadyChecked: Set<string>, blankChecked: boolean, styles: Styles): {
    filterTreeItems: IFilterByValueWithTreeItem[];
    filterTreeMapCache: Map<string, string[]>;
};
