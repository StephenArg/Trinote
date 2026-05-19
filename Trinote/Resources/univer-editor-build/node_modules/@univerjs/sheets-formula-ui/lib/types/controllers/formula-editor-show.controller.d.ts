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
import type { IRenderContext, IRenderModule, SpreadsheetSkeleton } from '@univerjs/engine-render';
import { Disposable, ICommandService, ILogService, ThemeService } from '@univerjs/core';
import { FormulaDataModel } from '@univerjs/engine-formula';
import { IRenderManagerService } from '@univerjs/engine-render';
import { SheetInterceptorService, SheetSkeletonService } from '@univerjs/sheets';
import { SheetSkeletonManagerService } from '@univerjs/sheets-ui';
/**
 * For Array formula in cell editing
 */
export declare class FormulaEditorShowController extends Disposable implements IRenderModule {
    private readonly _context;
    private readonly _sheetInterceptorService;
    private readonly _sheetSkeletonService;
    private readonly _formulaDataModel;
    private readonly _themeService;
    private readonly _renderManagerService;
    private readonly _sheetSkeletonManagerService;
    private readonly _commandService;
    private readonly _logService;
    private _previousShape;
    private _skeleton;
    constructor(_context: IRenderContext<Workbook>, _sheetInterceptorService: SheetInterceptorService, _sheetSkeletonService: SheetSkeletonService, _formulaDataModel: FormulaDataModel, _themeService: ThemeService, _renderManagerService: IRenderManagerService, _sheetSkeletonManagerService: SheetSkeletonManagerService, _commandService: ICommandService, _logService: ILogService);
    private _initSkeletonChangeListener;
    protected _changeRuntime(skeleton: SpreadsheetSkeleton): void;
    private _initInterceptorEditorStart;
    private _commandExecutedListener;
    private _displayArrayFormulaRangeShape;
    private _createArrayFormulaRangeShape;
    private _removeArrayFormulaRangeShape;
    private _refreshArrayFormulaRangeShape;
    private _checkCurrentSheet;
    private _updateArrayFormulaRangeShape;
    private _refreshArrayFormulaRangeShapeByRow;
}
