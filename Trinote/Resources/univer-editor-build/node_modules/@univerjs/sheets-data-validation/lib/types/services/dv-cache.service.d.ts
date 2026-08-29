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
import type { DataValidationStatus, IRange, ISheetDataValidationRule, Nullable } from '@univerjs/core';
import { Disposable, ICommandService, IUniverInstanceService, ObjectMatrix } from '@univerjs/core';
import { DataValidationModel } from '@univerjs/data-validation';
export declare class DataValidationCacheService extends Disposable {
    private readonly _commandService;
    private readonly _univerInstanceService;
    private readonly _sheetDataValidationModel;
    private _cacheMatrix;
    private _dirtyRanges$;
    readonly dirtyRanges$: import("rxjs").Observable<{
        unitId: string;
        subUnitId: string;
        ranges: IRange[];
        isSetRange?: boolean;
    }>;
    constructor(_commandService: ICommandService, _univerInstanceService: IUniverInstanceService, _sheetDataValidationModel: DataValidationModel);
    private _initDirtyRanges;
    private _initSheetRemove;
    private _ensureCache;
    ensureCache(unitId: string, subUnitId: string): ObjectMatrix<Nullable<DataValidationStatus>>;
    addRule(unitId: string, subUnitId: string, rule: ISheetDataValidationRule): void;
    removeRule(unitId: string, subUnitId: string, rule: ISheetDataValidationRule): void;
    markRangeDirty(unitId: string, subUnitId: string, ranges: IRange[], isSetRange?: boolean): void;
    private _deleteRange;
    getValue(unitId: string, subUnitId: string, row: number, col: number): Nullable<Nullable<DataValidationStatus>>;
}
