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
import { Disposable, ICommandService, Injector, IUniverInstanceService } from '@univerjs/core';
import { IRenderManagerService } from '@univerjs/engine-render';
import { SheetInterceptorService, SheetsSelectionsService } from '@univerjs/sheets';
import { IFormatPainterService } from '../../services/format-painter/format-painter.service';
export declare class FormatPainterController extends Disposable {
    private readonly _commandService;
    private readonly _formatPainterService;
    private readonly _univerInstanceService;
    private readonly _renderManagerService;
    private readonly _selectionManagerService;
    private readonly _sheetInterceptorService;
    private readonly _injector;
    constructor(_commandService: ICommandService, _formatPainterService: IFormatPainterService, _univerInstanceService: IUniverInstanceService, _renderManagerService: IRenderManagerService, _selectionManagerService: SheetsSelectionsService, _sheetInterceptorService: SheetInterceptorService, _injector: Injector);
    private _initialize;
    private _addDefaultHook;
    private _collectSelectionRangeFormat;
    private _getUndoRedoMutationInfo;
}
