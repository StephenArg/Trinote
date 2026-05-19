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
import { Disposable, ICommandService } from '@univerjs/core';
import { SheetsSelectionsService } from '@univerjs/sheets';
import { IContextMenuService } from '@univerjs/ui';
import { SheetSkeletonManagerService } from '../../services/sheet-skeleton-manager.service';
/**
 * header highlight
 * column menu: show, hover and mousedown event
 */
export declare class HeaderMenuRenderController extends Disposable implements IRenderModule {
    private readonly _context;
    private readonly _sheetSkeletonManagerService;
    private readonly _contextMenuService;
    private readonly _commandService;
    private readonly _selectionManagerService;
    private _hoverRect;
    private _hoverMenu;
    private _currentColumn;
    private _headerPointerSubs;
    private _colHeaderPointerSubs;
    constructor(_context: IRenderContext<Workbook>, _sheetSkeletonManagerService: SheetSkeletonManagerService, _contextMenuService: IContextMenuService, _commandService: ICommandService, _selectionManagerService: SheetsSelectionsService);
    dispose(): void;
    private _initialize;
    private _initialHover;
    private _initialHoverMenu;
    private _getSelectionOnColumn;
}
