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
import { Disposable, ICommandService, IUniverInstanceService } from '@univerjs/core';
import { IRenderManagerService } from '@univerjs/engine-render';
import { RangeProtectionRuleModel, WorksheetProtectionRuleModel } from '@univerjs/sheets';
import { IEditorBridgeService } from '../../services/editor-bridge.service';
import { IFormulaEditorManagerService } from '../../services/editor/formula-editor-manager.service';
import { FormulaEditorController } from './formula-editor.controller';
/**
 * sync data between cell editor and formula editor
 */
export declare class EditorDataSyncController extends Disposable {
    private readonly _univerInstanceService;
    private readonly _renderManagerService;
    private readonly _editorBridgeService;
    private readonly _commandService;
    private readonly _rangeProtectionRuleModel;
    private readonly _worksheetProtectionRuleModel;
    private readonly _formulaEditorController;
    private readonly _formulaEditorManagerService;
    constructor(_univerInstanceService: IUniverInstanceService, _renderManagerService: IRenderManagerService, _editorBridgeService: IEditorBridgeService, _commandService: ICommandService, _rangeProtectionRuleModel: RangeProtectionRuleModel, _worksheetProtectionRuleModel: WorksheetProtectionRuleModel, _formulaEditorController: FormulaEditorController, _formulaEditorManagerService: IFormulaEditorManagerService);
    private _initialize;
    private _getEditorViewModel;
    private _syncFormulaEditorContent;
    private _editorSyncHandler;
    private _commandExecutedListener;
    private _shouldRefreshCurrentEditCell;
    private _hasMatrixCell;
    private _syncActionsAndRender;
    private _syncContentAndRender;
    private _checkAndSetRenderStyleConfig;
    private _clearParagraph;
}
