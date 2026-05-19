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
import { ICommandService, IContextService, IUndoRedoService, IUniverInstanceService, RxDisposable } from '@univerjs/core';
import { DocSelectionManagerService } from '@univerjs/docs';
import { IEditorService } from '@univerjs/docs-ui';
import { IRenderManagerService } from '@univerjs/engine-render';
import { IEditorBridgeService } from '../../services/editor-bridge.service';
import { IFormulaEditorManagerService } from '../../services/editor/formula-editor-manager.service';
export declare class FormulaEditorController extends RxDisposable {
    private readonly _univerInstanceService;
    private readonly _renderManagerService;
    private readonly _editorBridgeService;
    private readonly _commandService;
    private readonly _contextService;
    private readonly _formulaEditorManagerService;
    private readonly _undoRedoService;
    private readonly _textSelectionManagerService;
    private readonly _editorService;
    private _loadedMap;
    constructor(_univerInstanceService: IUniverInstanceService, _renderManagerService: IRenderManagerService, _editorBridgeService: IEditorBridgeService, _commandService: ICommandService, _contextService: IContextService, _formulaEditorManagerService: IFormulaEditorManagerService, _undoRedoService: IUndoRedoService, _textSelectionManagerService: DocSelectionManagerService, _editorService: IEditorService);
    private _initialize;
    private _handleContentChange;
    private _create;
    private _listenFxBtnClick;
    private _syncEditorSize;
    private _scheduledCallback;
    private _clearScheduledCallback;
    autoScroll(): void;
}
