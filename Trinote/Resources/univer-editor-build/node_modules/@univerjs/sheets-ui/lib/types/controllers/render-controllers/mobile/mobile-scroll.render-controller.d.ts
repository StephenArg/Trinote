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
import type { IRenderContext, IRenderModule } from '@univerjs/engine-render';
import { Disposable, ICommandService, IContextService, IUniverInstanceService } from '@univerjs/core';
import { IRenderManagerService } from '@univerjs/engine-render';
import { SheetsSelectionsService } from '@univerjs/sheets';
import { SheetScrollManagerService } from '../../../services/scroll-manager.service';
import { SheetSkeletonManagerService } from '../../../services/sheet-skeleton-manager.service';
/**
 * This controller handles scroll logic in sheet interaction.
 */
export declare class MobileSheetsScrollRenderController extends Disposable implements IRenderModule {
    private readonly _context;
    private readonly _sheetSkeletonManagerService;
    private readonly _commandService;
    private readonly _renderManagerService;
    private readonly _selectionManagerService;
    private readonly _scrollManagerService;
    protected readonly _univerInstanceService: IUniverInstanceService;
    private readonly _contextService;
    constructor(_context: IRenderContext<Workbook>, _sheetSkeletonManagerService: SheetSkeletonManagerService, _commandService: ICommandService, _renderManagerService: IRenderManagerService, _selectionManagerService: SheetsSelectionsService, _scrollManagerService: SheetScrollManagerService, _univerInstanceService: IUniverInstanceService, _contextService: IContextService);
    scrollToRange(range: IRange): boolean;
    private _init;
    private _initCommandListener;
    private _scrollToSelectionForExpand;
    private _getFreeze;
    private _initScrollEventListener;
    private _initSkeletonListener;
    /**
     * for mobile - iOS-like smooth inertia scrolling
     * Uses native touch events for better mobile experience while keeping onPointerDown$ as trigger
     * to avoid interfering with header events
     */
    private _initPointerScrollEvent;
    /**
     * Create zoom indicator overlay element
     */
    private _createZoomIndicator;
    /**
     * Show zoom indicator with percentage
     */
    private _showZoomIndicator;
    /**
     * Hide zoom indicator with fade out
     */
    private _hideZoomIndicator;
    private _updateSceneSize;
    private _getSheetObject;
    private _scrollToSelection;
    private _getViewportBounding;
    private _scrollToCell;
}
