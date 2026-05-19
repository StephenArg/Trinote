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
import type { DeepReadonly, ISelectionCell, IStyleData, Nullable } from '@univerjs/core';
import type { Observable } from 'rxjs';
import type { ISelectionWithStyle } from '../../basics/selection';
import type { ISelectionManagerSearchParam } from './type';
import { IUniverInstanceService, RxDisposable } from '@univerjs/core';
import { WorkbookSelectionModel } from './selection-data-model';
import { SelectionMoveType } from './type';
/**
 * For normal selection.
 * Ref selection is in RefSelectionService which extends this class.
 */
export declare class SheetsSelectionsService extends RxDisposable {
    protected readonly _instanceSrv: IUniverInstanceService;
    private get _currentSelectionPos();
    get currentSelectionParam(): Nullable<ISelectionManagerSearchParam>;
    /**
     * Cache cell styles for current selections, key is `${row}_${column}`.
     */
    private _cellStylesCache;
    /**
     * Selection Events, usually triggered when pointerdown in spreadsheet by selection render service after selectionModel has updated.
     */
    selectionMoveStart$: Observable<Nullable<ISelectionWithStyle[]>>;
    /**
     * Selection Events, usually triggered when pointermove in spreadsheet by selection render service after selectionModel has updated.
     */
    selectionMoving$: Observable<Nullable<ISelectionWithStyle[]>>;
    /**
     * Selection Events, usually triggered when pointerup in spreadsheet by selection render service after selectionModel has updated.
     */
    selectionMoveEnd$: Observable<ISelectionWithStyle[]>;
    /**
     * Selection Events, usually triggered when changing unit.(focus in formula editor)
     */
    selectionSet$: Observable<Nullable<ISelectionWithStyle[]>>;
    /**
     * Selection Events, merge moveEnd$ and selectionSet$
     */
    selectionChanged$: Observable<Nullable<ISelectionWithStyle[]>>;
    constructor(_instanceSrv: IUniverInstanceService);
    protected _init(): void;
    dispose(): void;
    /**
     * Clear all selections in all workbooks.
     * invoked by prompt.controller
     */
    clear(): void;
    getCurrentSelections(): Readonly<ISelectionWithStyle[]>;
    getCurrentLastSelection(): DeepReadonly<Nullable<ISelectionWithStyle & {
        primary: ISelectionCell;
    }>>;
    getCurrentLastSelectionPrimaryCell(): DeepReadonly<Nullable<ISelectionCell>>;
    addSelections(selectionsData: ISelectionWithStyle[]): void;
    addSelections(unitId: string, worksheetId: string, selectionDatas: ISelectionWithStyle[]): void;
    /**
     * Set selection data to WorkbookSelectionModel.
     *
     * @param unitIdOrSelections
     * @param worksheetIdOrType
     * @param selectionDatas
     * @param type
     */
    setSelections(selectionDatas: ISelectionWithStyle[], type?: SelectionMoveType): void;
    setSelections(unitId: string, worksheetId: string, selectionDatas: ISelectionWithStyle[], type?: SelectionMoveType): void;
    clearCurrentSelections(): void;
    /**
     * Determine whether multiple current selections overlap
     *
     * @deprecated this should be extracted to an pure function
     */
    isOverlapping(): boolean;
    protected _getCurrentSelections(): ISelectionWithStyle[];
    getWorkbookSelections(unitId: string): WorkbookSelectionModel;
    protected _workbookSelections: Map<string, WorkbookSelectionModel>;
    protected _ensureWorkbookSelection(unitId: string): WorkbookSelectionModel;
    protected _removeWorkbookSelection(unitId: string): void;
    /**
     * This method is used to get the common value of a specific cell style property in the current selections.
     * Used to determine the state related to color panels in the toolbar.
     * Because in Excel, only the color panels need to show the common color of the current selections, other properties based on the current selection primary cell.
     * Now only handles text color, fill color, border style, border color.
     */
    getCellStylesProperty(property: keyof IStyleData): {
        isAllValuesSame: boolean;
        value: Nullable<IStyleData[keyof IStyleData]>;
    };
}
/** An context key to disable normal selections if its value is set to `true`. */
export declare const DISABLE_NORMAL_SELECTIONS = "DISABLE_NORMAL_SELECTIONS";
export declare const SELECTIONS_ENABLED = "SELECTIONS_ENABLED";
export declare const REF_SELECTIONS_ENABLED = "REF_SELECTIONS_ENABLED";
export declare const SELECTION_MODE = "__SELECTION_MODE__";
export declare enum SelectionMode {
    NORMAL = 0,
    REF = 1
}
