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
import type { IRange, Workbook } from '@univerjs/core';
import type { IRenderContext, IRenderModule, Viewport } from '@univerjs/engine-render';
import { Disposable, ICommandService, IContextService, Injector } from '@univerjs/core';
import { IRenderManagerService } from '@univerjs/engine-render';
import { SheetScrollManagerService } from '../../services/scroll-manager.service';
import { SheetSkeletonManagerService } from '../../services/sheet-skeleton-manager.service';
/**
 * This controller handles scroll logic in sheet interaction.
 */
export declare class SheetsScrollRenderController extends Disposable implements IRenderModule {
    private readonly _context;
    private readonly _injector;
    private readonly _sheetSkeletonManagerService;
    private readonly _contextService;
    private readonly _commandService;
    private readonly _renderManagerService;
    private readonly _scrollManagerService;
    constructor(_context: IRenderContext<Workbook>, _injector: Injector, _sheetSkeletonManagerService: SheetSkeletonManagerService, _contextService: IContextService, _commandService: ICommandService, _renderManagerService: IRenderManagerService, _scrollManagerService: SheetScrollManagerService);
    private _wheelEventListener;
    private _scrollBarEventListener;
    private _initSkeletonListener;
    _smoothScrollToViewportPos(params: {
        viewportMain: Viewport;
        viewportScrollX: number;
        viewportScrollY: number;
        duration: number;
    }): void;
    _updateViewportScroll(viewportScrollX?: number, viewportScrollY?: number): void;
    scrollToRange(range: IRange, forceTop?: boolean, forceLeft?: boolean): boolean;
    /**
     * Scroll spreadsheet(viewMain) to cell position. Based on the limitations of viewport and the number of rows and columns, you can only scroll to the maximum scrollable range.
     *
     * if column A ~ B is frozen. set second param to 0 would make viewMain start at column C.
     * set second param to 2 would make viewMain start at column E.
     * @param {number} row - Cell row
     * @param {number} column - Cell column
     * @returns {boolean} - true if scroll is successful
     */
    scrollToCell(row: number, column: number, duration?: number): boolean;
    private _initCommandListener;
    private _scrollToSelectionForExpand;
    private _getFreeze;
    private _getSheetObject;
    private _scrollToSelectionByDirection;
    private _scrollToSelection;
    private _getSelectionsService;
    private _getViewportBounding;
    private _scrollToCell;
}
