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
import { ICommandService, Injector, RxDisposable } from '@univerjs/core';
import { SheetInterceptorService, SheetRangeThemeModel } from '@univerjs/sheets';
import { TableManager } from '@univerjs/sheets-table';
import { SheetSkeletonManagerService } from '@univerjs/sheets-ui';
/**
 * Show selected range in filter.
 */
export declare class SheetsTableFilterButtonRenderController extends RxDisposable implements IRenderModule {
    private readonly _context;
    private readonly _injector;
    private readonly _sheetSkeletonManagerService;
    private readonly _sheetInterceptorService;
    private _tableManager;
    private readonly _rangeThemeModel;
    private readonly _commandService;
    private _buttonRenderDisposable;
    private _tableFilterButtonShapes;
    constructor(_context: IRenderContext<Workbook>, _injector: Injector, _sheetSkeletonManagerService: SheetSkeletonManagerService, _sheetInterceptorService: SheetInterceptorService, _tableManager: TableManager, _rangeThemeModel: SheetRangeThemeModel, _commandService: ICommandService);
    dispose(): void;
    private _initRenderer;
    private _initCommandExecuted;
    private _renderButtons;
    private _interceptCellContent;
    private _disposeRendering;
}
