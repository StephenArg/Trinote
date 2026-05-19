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
import type { IAccessor, IMutationInfo } from '@univerjs/core';
import type { IDiscreteRange } from '@univerjs/sheets';
import type { ICellDataWithSpanInfo, ISheetDiscreteRangeLocation } from '@univerjs/sheets-ui';
import { Disposable, Injector, IUniverInstanceService, ObjectMatrix } from '@univerjs/core';
import { FormulaDataModel, LexerTreeBuilder } from '@univerjs/engine-formula';
import { COPY_TYPE, ISheetClipboardService } from '@univerjs/sheets-ui';
export declare const DEFAULT_PASTE_FORMULA = "default-paste-formula";
export declare class FormulaClipboardController extends Disposable {
    private readonly _univerInstanceService;
    private readonly _lexerTreeBuilder;
    private readonly _sheetClipboardService;
    private readonly _injector;
    private readonly _formulaDataModel;
    constructor(_univerInstanceService: IUniverInstanceService, _lexerTreeBuilder: LexerTreeBuilder, _sheetClipboardService: ISheetClipboardService, _injector: Injector, _formulaDataModel: FormulaDataModel);
    private _initialize;
    private _registerClipboardHook;
    private _copyFormulaOnlyHook;
    private _pasteFormulaHook;
    private _pasteWithFormulaHook;
    private _getWorkbook;
    private _getWorksheet;
    private _onPasteCells;
}
export declare function getSetCellFormulaMutations(unitId: string, subUnitId: string, range: IDiscreteRange, matrix: ObjectMatrix<ICellDataWithSpanInfo>, accessor: IAccessor, copyInfo: {
    copyType: COPY_TYPE;
    copyRange?: IDiscreteRange;
    pasteType: string;
}, lexerTreeBuilder: LexerTreeBuilder, formulaDataModel: FormulaDataModel, _isSpecialPaste: boolean | undefined, pasteFrom: ISheetDiscreteRangeLocation | null): {
    undos: IMutationInfo<object>[];
    redos: IMutationInfo<object>[];
};
