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
import { ICommandService, Injector, RxDisposable, ThemeService } from '@univerjs/core';
import { SheetInterceptorService } from '@univerjs/sheets';
import { SheetsFilterService } from '@univerjs/sheets-filter';
import { ISheetSelectionRenderService, SheetSkeletonManagerService } from '@univerjs/sheets-ui';
/**
 * Show selected range in filter.
 */
export declare class SheetsFilterRenderController extends RxDisposable implements IRenderModule {
    private readonly _context;
    private readonly _injector;
    private readonly _sheetSkeletonManagerService;
    private readonly _sheetsFilterService;
    private readonly _themeService;
    private readonly _sheetInterceptorService;
    private readonly _commandService;
    private readonly _selectionRenderService;
    private _currentRenderParams;
    private _filterRangeShape;
    private _buttonRenderDisposable;
    private _filterButtonShapes;
    constructor(_context: IRenderContext<Workbook>, _injector: Injector, _sheetSkeletonManagerService: SheetSkeletonManagerService, _sheetsFilterService: SheetsFilterService, _themeService: ThemeService, _sheetInterceptorService: SheetInterceptorService, _commandService: ICommandService, _selectionRenderService: ISheetSelectionRenderService);
    dispose(): void;
    private _initRenderer;
    private _refreshRendering;
    private _renderRange;
    private _renderButtons;
    private _interceptCellContent;
    private _disposeRendering;
}
