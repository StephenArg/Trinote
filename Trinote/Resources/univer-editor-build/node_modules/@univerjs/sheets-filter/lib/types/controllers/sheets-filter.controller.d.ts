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
import type { IMutationInfo, IRange } from '@univerjs/core';
import { Disposable, ICommandService, IUniverInstanceService } from '@univerjs/core';
import { DataSyncPrimaryController } from '@univerjs/rpc';
import { RefRangeService, SheetInterceptorService, ZebraCrossingCacheController } from '@univerjs/sheets';
import { SheetsFilterService } from '../services/sheet-filter.service';
export declare class SheetsFilterController extends Disposable {
    private readonly _commandService;
    private readonly _sheetInterceptorService;
    private readonly _sheetsFilterService;
    private readonly _univerInstanceService;
    private readonly _refRangeService;
    private readonly _dataSyncPrimaryController;
    private readonly _zebraCrossingCacheController;
    private _disposableCollection;
    constructor(_commandService: ICommandService, _sheetInterceptorService: SheetInterceptorService, _sheetsFilterService: SheetsFilterService, _univerInstanceService: IUniverInstanceService, _refRangeService: RefRangeService, _dataSyncPrimaryController: DataSyncPrimaryController, _zebraCrossingCacheController: ZebraCrossingCacheController);
    private _initZebraCrossingCacheListener;
    private _initCommands;
    private _initInterceptors;
    private _registerRefRange;
    private _getUpdateFilter;
    handleInsertColCommand(range: IRange, unitId: string, subUnitId: string): {
        redos: IMutationInfo<object>[];
        undos: IMutationInfo<object>[];
    };
    private _handleInsertRowCommand;
    handleRemoveColCommand(range: IRange, unitId: string, subUnitId: string): {
        undos: IMutationInfo<object>[];
        redos: IMutationInfo<object>[];
    };
    private _handleRemoveRowCommand;
    private _getFilteredRowCount;
    handleMoveColsCommand({ fromRange, toRange }: {
        fromRange: IRange;
        toRange: IRange;
    }, unitId: string, subUnitId: string): {
        undos: IMutationInfo<object>[];
        redos: IMutationInfo<object>[];
    };
    private _handleMoveRowsCommand;
    private _handleMoveRangeCommand;
    private _handleRemoveSheetCommand;
    private _handleCopySheetCommand;
    private _handleNull;
    private _initRowFilteredInterceptor;
    private _moveCriteria;
    private _commandExecutedListener;
    private _getExtendRegion;
    private _initErrorHandling;
    private _cellHasValue;
}
