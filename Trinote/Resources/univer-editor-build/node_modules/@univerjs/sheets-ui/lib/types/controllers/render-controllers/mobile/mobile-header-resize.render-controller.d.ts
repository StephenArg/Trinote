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
import { Disposable, ICommandService, IContextService } from '@univerjs/core';
import { SheetsSelectionsService } from '@univerjs/sheets';
import { SheetScrollManagerService } from '../../../services/scroll-manager.service';
import { SheetSkeletonManagerService } from '../../../services/sheet-skeleton-manager.service';
export declare class MobileHeaderResizeRenderController extends Disposable implements IRenderModule {
    private readonly _context;
    private readonly _sheetSkeletonManagerService;
    private readonly _selectionManagerService;
    private readonly _commandService;
    private readonly _contextService;
    private readonly _scrollManagerService;
    private _currentRow;
    private _currentColumn;
    private _rowResizeButton;
    private _columnResizeButton;
    private _resizeHelperShape;
    private _isDragging;
    private _touchStartX;
    private _touchStartY;
    private _touchMoveHandler;
    private _touchEndHandler;
    private _selectionSubscription;
    private _scrollSubscription;
    constructor(_context: IRenderContext<Workbook>, _sheetSkeletonManagerService: SheetSkeletonManagerService, _selectionManagerService: SheetsSelectionsService, _commandService: ICommandService, _contextService: IContextService, _scrollManagerService: SheetScrollManagerService);
    dispose(): void;
    private _init;
    private _initResizeShapes;
    private _initSelectionListener;
    private _initScrollListener;
    private _handleSelectionChange;
    private _showRowResizeButton;
    private _showColumnResizeButton;
    private _updateButtonPositionOnScroll;
    private _bindTouchEventsToButton;
    private _startResize;
    private _setupTouchHandlers;
    private _createResizeHelper;
    private _updateResizeHelper;
    private _updateResizeButton;
    private _cleanupResize;
    private _cleanupTouchHandlers;
    private _cancelResize;
}
