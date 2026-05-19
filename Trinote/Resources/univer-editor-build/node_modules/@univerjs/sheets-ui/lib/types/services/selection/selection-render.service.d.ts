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
import type { Nullable, Workbook } from '@univerjs/core';
import type { IMouseEvent, IPointerEvent, IRenderContext, IRenderModule, Viewport } from '@univerjs/engine-render';
import { ICommandService, IContextService, ILogService, Injector, RANGE_TYPE, ThemeService } from '@univerjs/core';
import { ScrollTimerType } from '@univerjs/engine-render';
import { SheetsSelectionsService } from '@univerjs/sheets';
import { IShortcutService } from '@univerjs/ui';
import { SheetSkeletonManagerService } from '../sheet-skeleton-manager.service';
import { BaseSelectionRenderService } from './base-selection-render.service';
/**
 * This services controls rendering of normal selections in a render unit.
 * The normal selections would also be used by Auto Fill and Copy features.
 */
export declare class SheetSelectionRenderService extends BaseSelectionRenderService implements IRenderModule {
    private readonly _context;
    private readonly _logService;
    private readonly _commandService;
    protected readonly _contextService: IContextService;
    private readonly _workbookSelections;
    private _renderDisposable;
    constructor(_context: IRenderContext<Workbook>, injector: Injector, themeService: ThemeService, shortcutService: IShortcutService, selectionManagerService: SheetsSelectionsService, sheetSkeletonManagerService: SheetSkeletonManagerService, _logService: ILogService, _commandService: ICommandService, _contextService: IContextService);
    private _init;
    dispose(): void;
    private _initEventListeners;
    private _initThemeChangeListener;
    /**
     * Response for selection model changing.
     */
    private _initSelectionModelChangeListener;
    disableSelection(): void;
    enableSelection(): void;
    transparentSelection(): void;
    showSelection(): void;
    /**
     * Handle events in spreadsheet. (e.g. drag and move to make a selection)
     */
    private _initUserActionSyncListener;
    /**
     * Update selectionData to selectionDataModel (WorkBookSelections) by SetSelectionsOperation.
     *
     * Unlike baseSelectionRenderService@resetSelectionsByModelData, this method is for update WorkbookSelectionModel.
     *
     *
     * @param selectionDataWithStyleList
     * @param type
     */
    private _updateSelections;
    private _initSkeletonChangeListener;
    private _getActiveViewport;
    private _getSheetObject;
    /**
     * Handle pointer down event, bind pointermove & pointerup handler.
     * then trigger selectionMoveStart$.
     *
     * @param evt
     * @param _zIndex
     * @param rangeType
     * @param viewport
     * @param scrollTimerType
     */
    protected _onPointerDown(evt: IPointerEvent | IMouseEvent, _zIndex: number | undefined, rangeType: RANGE_TYPE | undefined, viewport: Nullable<Viewport>, scrollTimerType?: ScrollTimerType): void;
}
