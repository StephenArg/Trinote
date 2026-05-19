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
import type { DocumentDataModel, ICellData, IDocumentBody, IDocumentData, IStyleData, Nullable, Styles } from '@univerjs/core';
import { Disposable, ICommandService, IConfigService, IContextService, IUndoRedoService, IUniverInstanceService, LocaleService } from '@univerjs/core';
import { DocSelectionManagerService } from '@univerjs/docs';
import { IEditorService } from '@univerjs/docs-ui';
import { IFunctionService, LexerTreeBuilder } from '@univerjs/engine-formula';
import { IRenderManagerService } from '@univerjs/engine-render';
import { SheetInterceptorService, SheetsSelectionsService } from '@univerjs/sheets';
import { IEditorBridgeService } from '../../services/editor-bridge.service';
import { ICellEditorManagerService } from '../../services/editor/cell-editor-manager.service';
import { SheetCellEditorResizeService } from '../../services/editor/cell-editor-resize.service';
export declare class EditingRenderController extends Disposable {
    private readonly _undoRedoService;
    private readonly _contextService;
    private readonly _renderManagerService;
    private readonly _editorBridgeService;
    private readonly _cellEditorManagerService;
    private readonly _lexerTreeBuilder;
    private readonly _functionService;
    private readonly _textSelectionManagerService;
    private readonly _commandService;
    protected readonly _localService: LocaleService;
    private readonly _editorService;
    private readonly _univerInstanceService;
    private readonly _sheetInterceptorService;
    private readonly _sheetCellEditorResizeService;
    private readonly _selectionManagerService;
    private readonly _configService;
    /**
     * It is used to distinguish whether the user has actively moved the cursor in the editor, mainly through mouse clicks.
     */
    private _cursorChange;
    /** If the corresponding unit is active and prepared for editing. */
    private _editingUnit;
    _cursorTimeout: NodeJS.Timeout;
    constructor(_undoRedoService: IUndoRedoService, _contextService: IContextService, _renderManagerService: IRenderManagerService, _editorBridgeService: IEditorBridgeService, _cellEditorManagerService: ICellEditorManagerService, _lexerTreeBuilder: LexerTreeBuilder, _functionService: IFunctionService, _textSelectionManagerService: DocSelectionManagerService, _commandService: ICommandService, _localService: LocaleService, _editorService: IEditorService, _univerInstanceService: IUniverInstanceService, _sheetInterceptorService: SheetInterceptorService, _sheetCellEditorResizeService: SheetCellEditorResizeService, _selectionManagerService: SheetsSelectionsService, _configService: IConfigService);
    dispose(): void;
    private get _workbookSelections();
    private _init;
    private _initEditorVisibilityListener;
    private _listenEditorFocus;
    private _initialCursorSync;
    private _initSkeletonListener;
    /**
     * Should update current editing cell info when selection is changed.
     * @param d DisposableCollection
     */
    private _subscribeToCurrentCell;
    /**
     * Listen to document edits to refresh the size of the sheet editor, not for normal editor.
     */
    private _commandExecutedListener;
    private _handleEditorVisible;
    private _refreshCurrentSelections;
    private _handleEditorInvisible;
    private _getEditorObject;
    private _isCellImageData;
    submitCellData(documentDataModel: DocumentDataModel): Promise<boolean>;
    private _submitEdit;
    private _removeComposedCellStyleInCellData;
    private _exitInput;
    private _moveSelection;
    /**
     * The user's operations follow the sequence of opening the editor and then moving the cursor.
     * The logic here predicts the user's first cursor movement behavior based on this rule
     */
    private _cursorStateListener;
    private _moveInEditor;
    private _getDocumentDataModel;
    private _getEditorSkeleton;
    private _getEditorViewModel;
    private _getEditingUnit;
    private _emptyDocumentDataModel;
}
export declare function getCellDataByInput(cellData: ICellData, snapshot: Nullable<IDocumentData>, lexerTreeBuilder: LexerTreeBuilder, localeService: LocaleService, functionService: IFunctionService, styles: Styles): ICellData | null;
export declare function isRichText(body: IDocumentBody): boolean;
export declare function getCellStyleBySnapshot(snapshot: IDocumentData): Nullable<IStyleData>;
