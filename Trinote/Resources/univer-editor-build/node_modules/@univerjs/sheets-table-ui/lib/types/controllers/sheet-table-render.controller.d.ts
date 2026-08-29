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
import { Injector, RxDisposable } from '@univerjs/core';
import { TableManager } from '@univerjs/sheets-table';
import { SheetSkeletonManagerService } from '@univerjs/sheets-ui';
import { SheetTableThemeUIController } from './sheet-table-theme-ui.controller';
/**
 * Show selected range in filter.
 */
export declare class SheetsTableRenderController extends RxDisposable implements IRenderModule {
    private readonly _context;
    private readonly _injector;
    private readonly _sheetSkeletonManagerService;
    private _tableManager;
    private readonly _sheetTableThemeUIController;
    constructor(_context: IRenderContext<Workbook>, _injector: Injector, _sheetSkeletonManagerService: SheetSkeletonManagerService, _tableManager: TableManager, _sheetTableThemeUIController: SheetTableThemeUIController);
    private _dirtySkeleton;
    private _initListener;
}
