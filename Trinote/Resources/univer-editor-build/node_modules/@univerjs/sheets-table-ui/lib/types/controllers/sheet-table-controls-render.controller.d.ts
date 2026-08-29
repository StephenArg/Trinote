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
import { Disposable, ICommandService, Injector, IPermissionService, LocaleService } from '@univerjs/core';
import { SheetRangeThemeModel, SheetsSelectionsService, WorkbookPermissionService } from '@univerjs/sheets';
import { TableManager } from '@univerjs/sheets-table';
import { ISheetSelectionRenderService, SheetSkeletonManagerService } from '@univerjs/sheets-ui';
import { IDialogService, ISidebarService } from '@univerjs/ui';
import { SheetTableThemeUIController } from './sheet-table-theme-ui.controller';
export declare class SheetTableControlsRenderController extends Disposable implements IRenderModule {
    private readonly _context;
    private readonly _injector;
    private readonly _sheetSkeletonManagerService;
    private readonly _commandService;
    private readonly _tableManager;
    private readonly _rangeThemeModel;
    private readonly _workbookPermissionService;
    private readonly _permissionService;
    private readonly _sheetsSelectionsService;
    private readonly _selectionRenderService;
    private readonly _sheetTableThemeUIController;
    private readonly _localeService;
    private readonly _dialogService;
    private readonly _sidebarService;
    private readonly _shape;
    private readonly _topGapBaseBySkeleton;
    constructor(_context: IRenderContext<Workbook>, _injector: Injector, _sheetSkeletonManagerService: SheetSkeletonManagerService, _commandService: ICommandService, _tableManager: TableManager, _rangeThemeModel: SheetRangeThemeModel, _workbookPermissionService: WorkbookPermissionService, _permissionService: IPermissionService, _sheetsSelectionsService: SheetsSelectionsService, _selectionRenderService: ISheetSelectionRenderService, _sheetTableThemeUIController: SheetTableThemeUIController, _localeService: LocaleService, _dialogService: IDialogService, _sidebarService: ISidebarService);
    private _initShape;
    private _initRefresh;
    private _refresh;
    private _canEditWorkbook;
    private _handlePointerMove;
    private _isInsertHit;
    private _handlePointerLeave;
    private _handlePointerDown;
    private _handleHit;
    private _openRenameDialog;
    private _openRangeSelector;
    private _openThemePanel;
    private _getInsertRegionFromPoint;
    private _getRangeBounds;
    private _syncTopTableGap;
    private _refreshSelections;
    private _closeFloatingControls;
    private _getLocalPoint;
}
