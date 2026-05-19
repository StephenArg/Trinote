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
import type { IRange, Nullable, Workbook } from '@univerjs/core';
import type { IMouseEvent, IPointerEvent, IRenderContext, IRenderModule, Scene, SpreadsheetSkeleton, Viewport } from '@univerjs/engine-render';
import type { ISelectionWithStyle } from '@univerjs/sheets';
import { ICommandService, IContextService, ILogService, Injector, RANGE_TYPE, ThemeService } from '@univerjs/core';
import { ScrollTimerType } from '@univerjs/engine-render';
import { SheetsSelectionsService } from '@univerjs/sheets';
import { IShortcutService } from '@univerjs/ui';
import { SheetScrollManagerService } from '../scroll-manager.service';
import { SheetSkeletonManagerService } from '../sheet-skeleton-manager.service';
import { BaseSelectionRenderService } from './base-selection-render.service';
import { MobileSelectionControl } from './mobile-selection-shape';
declare enum ExpandingControl {
    BOTTOM_RIGHT = "bottom-right",
    TOP_LEFT = "top-left",
    LEFT = "left",
    RIGHT = "right",
    TOP = "top",
    BOTTOM = "bottom"
}
export declare function shouldKeepCurrentSelectionOnMobileLongPress(currentSelections: IRange[], targetRange: IRange): boolean;
export declare class MobileSheetsSelectionRenderService extends BaseSelectionRenderService implements IRenderModule {
    private readonly _context;
    private readonly _logService;
    private readonly _commandService;
    protected readonly _contextService: IContextService;
    private readonly _scrollManagerService;
    private readonly _workbookSelections;
    private _renderDisposable;
    _expandingSelection: boolean;
    protected _selectionControls: MobileSelectionControl[];
    expandingControlMode: ExpandingControl;
    private _anchorCellForExpanding;
    constructor(_context: IRenderContext<Workbook>, injector: Injector, themeService: ThemeService, shortcutService: IShortcutService, selectionManagerService: SheetsSelectionsService, sheetSkeletonManagerService: SheetSkeletonManagerService, _logService: ILogService, _commandService: ICommandService, _contextService: IContextService, _scrollManagerService: SheetScrollManagerService);
    private _init;
    private _initSkeletonChangeListener;
    private _initSelectionChangeListener;
    private _initEventListeners;
    private _initSpreadsheetEvent;
    private _initUserActionSyncListener;
    private _updateSelections;
    /**
     * invoked when pointerup or long press on spreadsheet, or pointerdown on row&col
     * then move curr selection to cell at cursor
     * Main purpose to create a new selection, or update curr selection to a new range.
     * @param evt
     * @param _zIndex
     * @param rangeType
     * @param viewport
     */
    createNewSelection(evt: IPointerEvent | IMouseEvent, _zIndex?: number, rangeType?: RANGE_TYPE, viewport?: Viewport): void;
    /**
     * Not same as PC version,
     * new selection control for mobile do one more thing: bind event for two control points.
     * @param scene
     * @param rangeType
     */
    newSelectionControl(scene: Scene, skeleton: SpreadsheetSkeleton, selection: ISelectionWithStyle): MobileSelectionControl;
    private _getActiveViewport;
    private _getSheetObject;
    private _normalSelectionDisabled;
    getSelectionControls(): MobileSelectionControl[];
    private _fillControlPointerDownHandler;
    private _changeCurrCellWhenControlPointerDown;
    /**
     * Override base class method to add pinch zoom check.
     * When pinch zooming, we should not process pointer move events for selection.
     */
    protected _setupPointerMoveListener(viewportMain: Nullable<Viewport>, activeSelectionControl: MobileSelectionControl, rangeType: RANGE_TYPE, scrollTimerType: ScrollTimerType | undefined, moveStartPosX: number, moveStartPosY: number): void;
    /**
     * Not same as _moving in PC (base selection render service)
     * The diff is
     * In base version, new selection is determined by the cursor cell and _startRangeWhenPointerDown
     *
     * In Mobile version, new selection is determined by cursor cell and current of activeSelectionControl.model
     */
    protected _movingHandler(offsetX: number, offsetY: number, activeSelectionControl: MobileSelectionControl, rangeType: RANGE_TYPE): false | undefined;
    private _updateControlPointWhenScrolling;
}
export {};
