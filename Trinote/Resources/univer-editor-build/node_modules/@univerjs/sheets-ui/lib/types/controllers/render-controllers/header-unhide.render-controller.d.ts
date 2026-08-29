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
import type { IRenderContext } from '@univerjs/engine-render';
import type { IHeaderUnhideRangeVisibleCheck } from '../../services/header-unhide-range.service';
import { ICommandService, InterceptorManager, RxDisposable } from '@univerjs/core';
import { HeaderUnhideRangeService } from '../../services/header-unhide-range.service';
import { SheetSkeletonManagerService } from '../../services/sheet-skeleton-manager.service';
export type { IHeaderUnhideRangeVisibleCheck };
export declare const HEADER_UNHIDE_RANGE_VISIBLE_CHECK: import("@univerjs/core").IInterceptor<boolean, IHeaderUnhideRangeVisibleCheck>;
/**
 * This controller controls rendering of the buttons to unhide hidden rows and columns.
 */
export declare class HeaderUnhideRenderController extends RxDisposable {
    private readonly _context;
    private readonly _sheetSkeletonManagerService;
    private readonly _headerUnhideRangeService;
    private readonly _commandService;
    private _shapes;
    private get _workbook();
    interceptor: InterceptorManager<{
        HEADER_UNHIDE_RANGE_VISIBLE_CHECK: import("@univerjs/core").IInterceptor<boolean, IHeaderUnhideRangeVisibleCheck>;
    }>;
    constructor(_context: IRenderContext<Workbook>, _sheetSkeletonManagerService: SheetSkeletonManagerService, _headerUnhideRangeService: HeaderUnhideRangeService, _commandService: ICommandService);
    dispose(): void;
    private _init;
    private _update;
    private _clearShapes;
    private _getSheetObject;
}
