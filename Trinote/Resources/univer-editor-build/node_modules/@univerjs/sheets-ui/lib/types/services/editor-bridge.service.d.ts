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
import type { IDisposable, IPosition, ISelectionCell, Nullable } from '@univerjs/core';
import type { Engine, IDocumentLayoutObject, Scene } from '@univerjs/engine-render';
import type { KeyCode } from '@univerjs/ui';
import type { Observable } from 'rxjs';
import { Disposable, IContextService, IUniverInstanceService, ThemeService } from '@univerjs/core';
import { IEditorService } from '@univerjs/docs-ui';
import { DeviceInputEventType, IRenderManagerService } from '@univerjs/engine-render';
import { SheetInterceptorService, SheetSkeletonService } from '@univerjs/sheets';
import { BehaviorSubject } from 'rxjs';
export interface IEditorBridgeServiceVisibleParam {
    visible: boolean;
    eventType: DeviceInputEventType;
    unitId: string;
    keycode?: KeyCode;
}
export interface ICurrentEditCellParam {
    scene: Scene;
    engine: Engine;
    unitId: string;
    sheetId: string;
    primary: ISelectionCell;
}
export interface ICellEditorState {
    unitId: string;
    sheetId: string;
    row: number;
    column: number;
    documentLayoutObject: IDocumentLayoutObject;
    editorUnitId: string;
    isInArrayFormulaRange?: Nullable<boolean>;
}
export interface ICellEditorLayout {
    position: IPosition;
    canvasOffset: {
        left: number;
        top: number;
    };
    scaleX: number;
    scaleY: number;
}
export interface IEditorBridgeServiceParam extends ICellEditorState, ICellEditorLayout {
}
export interface IEditorBridgeService {
    currentEditCellState$: Observable<Nullable<ICellEditorState>>;
    currentEditCellLayout$: Observable<Nullable<ICellEditorLayout>>;
    currentEditCell$: Observable<Nullable<IEditorBridgeServiceParam>>;
    visible$: Observable<IEditorBridgeServiceVisibleParam>;
    forceKeepVisible$: Observable<boolean>;
    dispose(): void;
    refreshEditCellState(): void;
    refreshEditCellPosition(resetSizeOnly?: boolean): void;
    setEditCell(param: ICurrentEditCellParam): void;
    getEditCellState(): Readonly<Nullable<IEditorBridgeServiceParam>>;
    getEditCellLayout(): Readonly<Nullable<ICellEditorLayout>>;
    getEditLocation(): Readonly<Nullable<ICellEditorState>>;
    updateEditLocation(row: number, col: number): void;
    getLatestEditCellState(): Readonly<Nullable<IEditorBridgeServiceParam>>;
    /**
     * @deprecated do not use it directly, use command SetCellEditVisibleOperation as instead.
     */
    changeVisible(param: IEditorBridgeServiceVisibleParam): void;
    changeEditorDirty(dirtyStatus: boolean): void;
    getEditorDirty(): boolean;
    isVisible(): IEditorBridgeServiceVisibleParam;
    enableForceKeepVisible(): void;
    disableForceKeepVisible(): void;
    isForceKeepVisible(): boolean;
    getCurrentEditorId(): string;
    helpFunctionVisible$: BehaviorSubject<boolean>;
}
export declare class EditorBridgeService extends Disposable implements IEditorBridgeService, IDisposable {
    private readonly _sheetInterceptorService;
    private readonly _sheetSkeletonService;
    private readonly _renderManagerService;
    private readonly _themeService;
    private readonly _univerInstanceService;
    private readonly _editorService;
    private readonly _contextService;
    private _editorUnitId;
    private _editorIsDirty;
    private _visibleParams;
    private _currentEditCell;
    private _currentEditCellState;
    private _currentEditCellLayout;
    helpFunctionVisible$: BehaviorSubject<boolean>;
    private readonly _currentEditCellState$;
    readonly currentEditCellState$: Observable<Nullable<ICellEditorState>>;
    private readonly _currentEditCellLayout$;
    readonly currentEditCellLayout$: Observable<Nullable<ICellEditorLayout>>;
    readonly currentEditCell$: Observable<{
        position: IPosition;
        canvasOffset: {
            left: number;
            top: number;
        };
        scaleX: number;
        scaleY: number;
        unitId: string;
        sheetId: string;
        row: number;
        column: number;
        documentLayoutObject: IDocumentLayoutObject;
        editorUnitId: string;
        isInArrayFormulaRange?: Nullable<boolean>;
    } | null>;
    private readonly _visibleParams$;
    readonly visible$: Observable<IEditorBridgeServiceVisibleParam>;
    private readonly _afterVisibleParams$;
    readonly afterVisible$: Observable<IEditorBridgeServiceVisibleParam>;
    private readonly _forceKeepVisible$;
    readonly forceKeepVisible$: Observable<boolean>;
    constructor(_sheetInterceptorService: SheetInterceptorService, _sheetSkeletonService: SheetSkeletonService, _renderManagerService: IRenderManagerService, _themeService: ThemeService, _univerInstanceService: IUniverInstanceService, _editorService: IEditorService, _contextService: IContextService);
    refreshEditCellState(): void;
    refreshEditCellPosition(resetSizeOnly?: boolean): void;
    setEditCell(param: ICurrentEditCellParam): void;
    private _clearCurrentEditCellState;
    getEditCellState(): Readonly<Nullable<IEditorBridgeServiceParam>>;
    getEditCellLayout(): Readonly<Nullable<ICellEditorLayout>>;
    getEditLocation(): Readonly<Nullable<ICellEditorState>>;
    updateEditLocation(row: number, column: number): void;
    getLatestEditCellState(): {
        position: {
            startX: number;
            startY: number;
            endX: number;
            endY: number;
        };
        scaleX: number;
        scaleY: number;
        canvasOffset: {
            left: number;
            top: number;
        };
        row: number;
        column: number;
        unitId: string;
        sheetId: string;
        documentLayoutObject: IDocumentLayoutObject;
        editorUnitId: string;
        isInArrayFormulaRange: Nullable<boolean>;
    } | undefined;
    getCurrentEditorId(): string;
    changeVisible(params: IEditorBridgeServiceVisibleParam): void;
    isVisible(): IEditorBridgeServiceVisibleParam;
    enableForceKeepVisible(): void;
    disableForceKeepVisible(): void;
    isForceKeepVisible(): boolean;
    changeEditorDirty(dirtyStatus: boolean): void;
    getEditorDirty(): boolean;
}
export declare const IEditorBridgeService: import("@wendellhu/redi").IdentifierDecorator<IEditorBridgeService>;
