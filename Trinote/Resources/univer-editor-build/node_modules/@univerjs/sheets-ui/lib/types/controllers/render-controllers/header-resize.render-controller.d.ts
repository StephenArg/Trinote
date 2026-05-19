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
import { Disposable, ICommandService, InterceptorManager } from '@univerjs/core';
import { SheetsSelectionsService } from '@univerjs/sheets';
import { SheetSkeletonManagerService } from '../../services/sheet-skeleton-manager.service';
export declare const HEADER_RESIZE_PERMISSION_CHECK: import("@univerjs/core").IInterceptor<boolean, {
    row?: number;
    col?: number;
}>;
export declare class HeaderResizeRenderController extends Disposable implements IRenderModule {
    private readonly _context;
    private readonly _sheetSkeletonManagerService;
    private readonly _selectionManagerService;
    private readonly _commandService;
    private _currentRow;
    private _currentColumn;
    private _rowResizeRect;
    private _columnResizeRect;
    private _headerPointerSubs;
    private _scenePointerMoveSub;
    private _scenePointerUpSub;
    private _resizeHelperShape;
    private _startOffsetX;
    private _startOffsetY;
    interceptor: InterceptorManager<{
        HEADER_RESIZE_PERMISSION_CHECK: import("@univerjs/core").IInterceptor<boolean, {
            row?: number;
            col?: number;
        }>;
    }>;
    constructor(_context: IRenderContext<Workbook>, _sheetSkeletonManagerService: SheetSkeletonManagerService, _selectionManagerService: SheetsSelectionsService, _commandService: ICommandService);
    dispose(): void;
    private _init;
    private _initialHover;
    private _initialHoverResize;
    private _clearObserverEvent;
}
