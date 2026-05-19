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
import type { IDisposable, IDocumentBody, Nullable } from '@univerjs/core';
import type { ISuccinctDocRangeParam } from '@univerjs/engine-render';
import type { Observable } from 'rxjs';
import type { IEditorConfigParams } from './editor';
import { Disposable, ICommandService, IContextService, Injector, IUndoRedoService, IUniverInstanceService } from '@univerjs/core';
import { DocSelectionManagerService } from '@univerjs/docs';
import { IRenderManagerService } from '@univerjs/engine-render';
import { Editor } from './editor';
export interface IEditorSetValueParam {
    editorUnitId: string;
    body: IDocumentBody;
}
export interface IEditorInputFormulaParam {
    editorUnitId: string;
    formulaString: string;
}
export interface IEditorService {
    getEditor(id?: string): Readonly<Nullable<Editor>>;
    register(config: IEditorConfigParams, container: HTMLDivElement): IDisposable;
    getAllEditor(): Map<string, Editor>;
    isEditor(editorUnitId: string): boolean;
    isSheetEditor(editorUnitId: string): boolean;
    blur$: Observable<unknown>;
    blur(force?: boolean): void;
    focus$: Observable<ISuccinctDocRangeParam>;
    focus(editorUnitId: string): void;
    getFocusId(): Nullable<string>;
    getFocusEditor(): Readonly<Nullable<Editor>>;
}
export declare class EditorService extends Disposable implements IEditorService, IDisposable {
    private readonly _univerInstanceService;
    private readonly _renderManagerService;
    private readonly _docSelectionManagerService;
    private readonly _contextService;
    private readonly _commandService;
    private readonly _undoRedoService;
    private readonly _injector;
    private _editors;
    private _focusEditorUnitId;
    private readonly _blur$;
    readonly blur$: Observable<unknown>;
    private readonly _focus$;
    readonly focus$: Observable<ISuccinctDocRangeParam>;
    constructor(_univerInstanceService: IUniverInstanceService, _renderManagerService: IRenderManagerService, _docSelectionManagerService: DocSelectionManagerService, _contextService: IContextService, _commandService: ICommandService, _undoRedoService: IUndoRedoService, _injector: Injector);
    private _initUniverFocusListener;
    private _blurSheetEditor;
    private _setFocusId;
    getFocusId(): Nullable<string>;
    getFocusEditor(): Readonly<Nullable<Editor>>;
    isEditor(editorUnitId: string): boolean;
    isSheetEditor(editorUnitId: string): boolean;
    blur(force?: boolean): void;
    focus(editorUnitId: string): void;
    dispose(): void;
    getEditor(id?: string): Readonly<Nullable<Editor>>;
    getAllEditor(): Map<string, Editor>;
    register(config: IEditorConfigParams, container: HTMLDivElement): IDisposable;
    private _unRegister;
    private _getCurrentEditorUnitId;
    private _getBlank;
}
export declare const IEditorService: import("@wendellhu/redi").IdentifierDecorator<IEditorService>;
