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
import { Disposable, ICommandService, Injector, InterceptorManager, ThemeService } from '@univerjs/core';
import { SheetInterceptorService, SheetsSelectionsService } from '@univerjs/sheets';
import { SheetScrollManagerService } from '../../services/scroll-manager.service';
import { SheetSkeletonManagerService } from '../../services/sheet-skeleton-manager.service';
export declare const FREEZE_ROW_MAIN_NAME = "__SpreadsheetFreezeRowMainName__";
export declare const FREEZE_ROW_HEADER_NAME = "__SpreadsheetFreezeRowHeaderName__";
export declare const FREEZE_COLUMN_MAIN_NAME = "__SpreadsheetFreezeColumnMainName__";
export declare const FREEZE_COLUMN_HEADER_NAME = "__SpreadsheetFreezeColumnHeaderName__";
export declare const FREEZE_PERMISSION_CHECK: import("@univerjs/core").IInterceptor<boolean, null>;
export declare class HeaderFreezeRenderController extends Disposable implements IRenderModule {
    private readonly _context;
    private readonly _sheetSkeletonManagerService;
    private readonly _commandService;
    private readonly _selectionManagerService;
    private readonly _scrollManagerService;
    private readonly _themeService;
    private _sheetInterceptorService;
    private _injector;
    private _rowFreezeHeaderRect;
    private _rowFreezeMainRect;
    private _columnFreezeHeaderRect;
    private _columnFreezeMainRect;
    private _freezeDownSubs;
    private _freezePointerEnterSubs;
    private _freezePointerLeaveSubs;
    private _scenePointerMoveSub;
    private _scenePointerUpSub;
    private _changeToRow;
    private _changeToColumn;
    private _changeToOffsetX;
    private _changeToOffsetY;
    private _activeViewport;
    private _freezeNormalHeaderColor;
    private _freezeNormalMainColor;
    private _freezeActiveColor;
    private _freezeHoverColor;
    private _lastFreeze;
    interceptor: InterceptorManager<{
        FREEZE_PERMISSION_CHECK: import("@univerjs/core").IInterceptor<boolean, null>;
    }>;
    constructor(_context: IRenderContext<Workbook>, _sheetSkeletonManagerService: SheetSkeletonManagerService, _commandService: ICommandService, _selectionManagerService: SheetsSelectionsService, _scrollManagerService: SheetScrollManagerService, _themeService: ThemeService, _sheetInterceptorService: SheetInterceptorService, _injector: Injector);
    dispose(): void;
    private _initialize;
    private _createFreeze;
    private _eventBinding;
    private _getCurrentLastVisible;
    private _getActiveViewport;
    private _freezeDown;
    private _getViewports;
    private _bindViewportScroll;
    private _updateViewport;
    /**
     * When switching sheet tabs, it is necessary to update the frozen state of the current view.
     */
    private _skeletonListener;
    private _refreshCurrent;
    private _themeChangeListener;
    private _themeChange;
    private _interceptorCommands;
    /**
     * Update freeze line position when some cmds cause sk change.
     */
    private _commandExecutedListener;
    private _zoomRefresh;
    private _clearObserverEvent;
    private _clearFreeze;
    private _getPositionByIndex;
    private _getFreeze;
    private _getSheetObject;
    /**
     * Core function of _refreshCurrent
     * @param startRow
     * @param startColumn
     * @param ySplit
     * @param xSplit
     * @param resetScroll
     */
    private _refreshFreeze;
}
