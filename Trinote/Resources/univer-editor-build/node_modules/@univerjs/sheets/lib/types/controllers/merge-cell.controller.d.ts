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
import type { IRange } from '@univerjs/core';
import type { IRemoveWorksheetMergeMutationParams } from '../basics/interfaces/mutation-interface';
import type { EffectRefRangeParams } from '../services/ref-range/type';
import { Dimension, Disposable, DisposableCollection, ICommandService, Injector, InterceptorManager, IUniverInstanceService } from '@univerjs/core';
import { RefRangeService } from '../services/ref-range/ref-range.service';
import { SheetsSelectionsService } from '../services/selections/selection.service';
import { SheetInterceptorService } from '../services/sheet-interceptor/sheet-interceptor.service';
/**
 * calculates the selection based on the merged cell type
 * @param {IRange[]} selection
 * @param {Dimension} [type]
 * @return {*}
 */
export declare function getAddMergeMutationRangeByType(selection: IRange[], type?: Dimension): IRange[];
export declare const MERGE_CELL_INTERCEPTOR_CHECK: import("@univerjs/core").IInterceptor<boolean, IRange[]>;
export declare class MergeCellController extends Disposable {
    private readonly _commandService;
    private readonly _refRangeService;
    private readonly _univerInstanceService;
    private _injector;
    private _sheetInterceptorService;
    private _selectionManagerService;
    disposableCollection: DisposableCollection;
    readonly interceptor: InterceptorManager<{
        MERGE_CELL_INTERCEPTOR_CHECK: import("@univerjs/core").IInterceptor<boolean, IRange[]>;
    }>;
    constructor(_commandService: ICommandService, _refRangeService: RefRangeService, _univerInstanceService: IUniverInstanceService, _injector: Injector, _sheetInterceptorService: SheetInterceptorService, _selectionManagerService: SheetsSelectionsService);
    private _initCommandInterceptor;
    refRangeHandle(config: EffectRefRangeParams, unitId: string, subUnitId: string): {
        redos: {
            id: string;
            params: IRemoveWorksheetMergeMutationParams;
        }[];
        undos: {
            id: string;
            params: IRemoveWorksheetMergeMutationParams;
        }[];
    };
    private _onRefRangeChange;
    private _handleMoveRowsCommand;
    private _handleMoveColsCommand;
    private _handleMoveRangeCommand;
    private _handleInsertRowCommand;
    private _handleInsertColCommand;
    private _handleRemoveColCommand;
    private _handleRemoveRowCommand;
    private _handleInsertRangeMoveRightCommand;
    private _handleInsertRangeMoveDownCommand;
    private _handleDeleteRangeMoveUpCommand;
    private _handleDeleteRangeMoveLeftCommand;
    private _checkIsMergeCell;
    private _handleNull;
    private _commandExecutedListener;
}
