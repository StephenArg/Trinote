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
import { Disposable, IUniverInstanceService } from '@univerjs/core';
import { FormulaDataModel, IActiveDirtyManagerService } from '@univerjs/engine-formula';
export declare class ActiveDirtyController extends Disposable {
    private readonly _activeDirtyManagerService;
    private readonly _univerInstanceService;
    private readonly _formulaDataModel;
    constructor(_activeDirtyManagerService: IActiveDirtyManagerService, _univerInstanceService: IUniverInstanceService, _formulaDataModel: FormulaDataModel);
    private _initialize;
    private _initialConversion;
    private _initialMove;
    private _initialRowAndColumn;
    private _initialHideRow;
    private _initialSheet;
    private _initialDefinedName;
    private _getDefinedNameMutation;
    private _getSetRangeValuesMutationDirtyRange;
    private _getMoveRangeMutationDirtyRange;
    private _getMoveRowsMutationDirtyRange;
    private _getReorderRangeMutationDirtyRange;
    private _getRemoveRowOrColumnMutation;
    private _getHideRowMutation;
    private _getRemoveSheetMutation;
    private _getInsertSheetMutation;
    private _rangeToMatrix;
    private _getDirtyRangesByCellValue;
    /**
     * The array formula is a range where only the top-left corner contains the formula value.
     * All other positions, apart from the top-left corner, need to be marked as dirty.
     */
    private _getDirtyRangesForArrayFormula;
}
