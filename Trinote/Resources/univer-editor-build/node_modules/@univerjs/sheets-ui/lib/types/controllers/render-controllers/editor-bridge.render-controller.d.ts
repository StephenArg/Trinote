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
import type { Workbook } from '@univerjs/core';
import type { IRenderContext, IRenderModule } from '@univerjs/engine-render';
import { ICommandService, IContextService, IUniverInstanceService, RxDisposable } from '@univerjs/core';
import { IRenderManagerService } from '@univerjs/engine-render';
import { SheetsSelectionsService } from '@univerjs/sheets';
import { IEditorBridgeService } from '../../services/editor-bridge.service';
import { SheetSkeletonManagerService } from '../../services/sheet-skeleton-manager.service';
export declare class EditorBridgeRenderController extends RxDisposable implements IRenderModule {
    private readonly _context;
    private readonly _instanceSrv;
    private readonly _commandService;
    private readonly _editorBridgeService;
    private readonly _selectionManagerService;
    private readonly _contextService;
    private readonly _renderManagerService;
    private readonly _sheetSkeletonManagerService;
    private _d;
    constructor(_context: IRenderContext<Workbook>, _instanceSrv: IUniverInstanceService, _commandService: ICommandService, _editorBridgeService: IEditorBridgeService, _selectionManagerService: SheetsSelectionsService, _contextService: IContextService, _renderManagerService: IRenderManagerService, _sheetSkeletonManagerService: SheetSkeletonManagerService);
    private _init;
    private _disposeCurrent;
    private _initSelectionChangeListener;
    private _updateEditorPosition;
    refreshEditorPosition(): void;
    private _initEventListener;
    /**
     * Should activate the editor when the user inputs text.
     * @param d DisposableCollection
     */
    private _initialKeyboardListener;
    private _commandExecutedListener;
    private _showEditorByKeyboard;
    private _tryHideEditor;
    private _hideEditor;
    private _getSheetObject;
    private _isCurrentSheetFocused;
}
