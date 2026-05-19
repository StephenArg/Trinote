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
import type { DrawingTypeEnum, ICommandInfo, INeedCheckDisposable, IRange, Nullable } from '@univerjs/core';
import type { BaseObject, IBoundRectNoAngle, Viewport } from '@univerjs/engine-render';
import type { ISheetLocationBase } from '@univerjs/sheets';
import type { IPopup } from '@univerjs/ui';
import { Disposable, ICommandService, IUniverInstanceService } from '@univerjs/core';
import { IRenderManagerService } from '@univerjs/engine-render';
import { RefRangeService, SheetsSelectionsService } from '@univerjs/sheets';
import { ICanvasPopupService } from '@univerjs/ui';
import { ISheetSelectionRenderService } from './selection/base-selection-render.service';
export interface ICanvasPopup extends Omit<IPopup, 'anchorRect' | 'anchorRect$' | 'unitId' | 'subUnitId' | 'canvasElement'> {
    mask?: boolean;
    extraProps?: Record<string, unknown>;
    showOnSelectionMoving?: boolean;
}
interface IPopupMenuItem {
    label: string;
    index: number;
    commandId: string;
    commandParams: ICommandInfo['params'];
    disable: boolean;
}
type getPopupMenuItemCallback = (unitId: string, subUnitId: string, drawingId: string, drawingType: DrawingTypeEnum) => IPopupMenuItem[];
export declare class SheetCanvasPopManagerService extends Disposable {
    private readonly _globalPopupManagerService;
    private readonly _renderManagerService;
    private readonly _univerInstanceService;
    private readonly _refRangeService;
    private readonly _commandService;
    private readonly _refSelectionsService;
    private readonly _selectionManagerService;
    private _popupMenuFeatureMap;
    private _popupMenuOffsetMap;
    constructor(_globalPopupManagerService: ICanvasPopupService, _renderManagerService: IRenderManagerService, _univerInstanceService: IUniverInstanceService, _refRangeService: RefRangeService, _commandService: ICommandService, _refSelectionsService: ISheetSelectionRenderService, _selectionManagerService: SheetsSelectionsService);
    private _isSelectionMoving;
    private _initMoving;
    /**
     * Register a feature menu callback for a specific drawing type.such as image, chart, etc.
     */
    registerFeatureMenu(type: DrawingTypeEnum, getPopupMenuCallBack: getPopupMenuItemCallback): void;
    /**
     * Register a feature menu offset for a specific drawing type.
     * @param {DrawingTypeEnum} type the drawing type
     * @param offsetX The offset x
     * @param offsetY The offset y
     */
    registerFeatureMenuOffset(type: DrawingTypeEnum, offsetX: number, offsetY: number): void;
    /**
     * Get the feature menu by drawing type, the function should be called when a drawing element need trigger popup menu, so the unitId, subUnitId, drawingId should be provided.
     * @param {string} unitId the unit id
     * @param {string} subUnitId the sub unit id
     * @param {string} drawingId the drawing id
     * @param {DrawingTypeEnum} drawingType the feature type
     * @returns the feature menu if it exists, otherwise return undefined
     */
    getFeatureMenu(unitId: string, subUnitId: string, drawingId: string, drawingType: DrawingTypeEnum): Nullable<IPopupMenuItem[]>;
    dispose(): void;
    private _createHiddenRectObserver;
    private _createPositionObserver;
    /**
     * attach a popup to canvas object
     * @param targetObject target canvas object
     * @param popup popup item
     * @returns disposable
     */
    attachPopupToObject(targetObject: BaseObject, popup: ICanvasPopup): INeedCheckDisposable;
    attachPopupByPosition(bound: IBoundRectNoAngle, popup: ICanvasPopup, location: ISheetLocationBase): Nullable<INeedCheckDisposable>;
    attachPopupToAbsolutePosition(bound: IBoundRectNoAngle, popup: ICanvasPopup, _unitId?: string, _subUnitId?: string): {
        dispose: () => void;
        canDispose: () => boolean;
    } | null | undefined;
    /**
     * Bind popup to the right part of cell at(row, col).
     * This popup would move with the cell.
     * @param row
     * @param col
     * @param popup
     * @param _unitId
     * @param _subUnitId
     * @param viewport
     * @returns
     */
    attachPopupToCell(row: number, col: number, popup: ICanvasPopup, _unitId?: string, _subUnitId?: string, viewport?: Viewport): Nullable<INeedCheckDisposable>;
    /**
     * attach Comp to floatDOM
     * @param range
     * @param popup
     * @param _unitId
     * @param _subUnitId
     * @param viewport
     * @param showOnSelectionMoving
     */
    attachRangePopup(range: IRange, popup: ICanvasPopup, _unitId?: string, _subUnitId?: string, viewport?: Viewport, showOnSelectionMoving?: boolean): Nullable<INeedCheckDisposable>;
    /**
     *
     * @param initialRow
     * @param initialCol
     * @param currentRender
     * @param skeleton
     * @param activeViewport
     */
    private _createCellPositionObserver;
    private _calcCellPositionByCell;
    /**
     * Unlike _createCellPositionObserver, this accept a range not a single cell.
     * @param initialRow
     * @param initialCol
     * @param currentRender
     * @param skeleton
     * @param activeViewport
     */
    private _createRangePositionObserver;
}
export {};
