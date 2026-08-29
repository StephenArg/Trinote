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
import type { ISheetRangeLocation } from '@univerjs/sheets';
import type { ICellValueCompareFn } from '../commands/commands/sheets-sort.command';
import type { ISortOption } from './interface';
import { Disposable, ICommandService, IUniverInstanceService } from '@univerjs/core';
import { FormulaDataModel } from '@univerjs/engine-formula';
export declare class SheetsSortService extends Disposable {
    private readonly _univerInstanceService;
    private readonly _commandService;
    private readonly _formulaDataModel;
    private _compareFns;
    constructor(_univerInstanceService: IUniverInstanceService, _commandService: ICommandService, _formulaDataModel: FormulaDataModel);
    mergeCheck(location: ISheetRangeLocation): boolean;
    emptyCheck(location: ISheetRangeLocation): boolean;
    singleCheck(location: ISheetRangeLocation): boolean;
    formulaCheck(location: ISheetRangeLocation): boolean;
    registerCompareFn(fn: ICellValueCompareFn): void;
    getAllCompareFns(): ICellValueCompareFn[];
    applySort(sortOption: ISortOption, unitId?: string, subUnitId?: string): void;
}
