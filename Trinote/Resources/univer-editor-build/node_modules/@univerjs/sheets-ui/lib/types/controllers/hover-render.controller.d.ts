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
import { Disposable } from '@univerjs/core';
import { HoverManagerService } from '../services/hover-manager.service';
import { SheetScrollManagerService } from '../services/scroll-manager.service';
import { SheetSkeletonManagerService } from '../services/sheet-skeleton-manager.service';
export declare class HoverRenderController extends Disposable implements IRenderModule {
    private readonly _context;
    private _hoverManagerService;
    private _sheetSkeletonManagerService;
    private _scrollManagerService;
    private _active;
    get active(): boolean;
    constructor(_context: IRenderContext<Workbook>, _hoverManagerService: HoverManagerService, _sheetSkeletonManagerService: SheetSkeletonManagerService, _scrollManagerService: SheetScrollManagerService);
    private _initPointerEvent;
    private _initScrollEvent;
}
