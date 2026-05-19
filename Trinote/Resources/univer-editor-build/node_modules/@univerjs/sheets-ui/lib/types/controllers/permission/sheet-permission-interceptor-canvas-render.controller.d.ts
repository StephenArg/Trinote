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
import { DisposableCollection, IPermissionService, IUniverInstanceService, RxDisposable } from '@univerjs/core';
import { RangeProtectionCache, RangeProtectionRuleModel, SheetsSelectionsService } from '@univerjs/sheets';
import { ISheetSelectionRenderService } from '../../services/selection/base-selection-render.service';
import { HeaderFreezeRenderController } from '../render-controllers/freeze.render-controller';
import { HeaderMoveRenderController } from '../render-controllers/header-move.render-controller';
import { HeaderResizeRenderController } from '../render-controllers/header-resize.render-controller';
export declare class SheetPermissionInterceptorCanvasRenderController extends RxDisposable implements IRenderModule {
    private readonly _context;
    private readonly _univerInstanceService;
    private readonly _permissionService;
    private readonly _selectionManagerService;
    private _rangeProtectionRuleModel;
    private _headerMoveRenderController;
    private _selectionRenderService;
    private _headerFreezeRenderController;
    private _rangeProtectionCache;
    private _headerResizeRenderController?;
    disposableCollection: DisposableCollection;
    constructor(_context: IRenderContext<Workbook>, _univerInstanceService: IUniverInstanceService, _permissionService: IPermissionService, _selectionManagerService: SheetsSelectionsService, _rangeProtectionRuleModel: RangeProtectionRuleModel, _headerMoveRenderController: HeaderMoveRenderController, _selectionRenderService: ISheetSelectionRenderService, _headerFreezeRenderController: HeaderFreezeRenderController, _rangeProtectionCache: RangeProtectionCache, _headerResizeRenderController?: HeaderResizeRenderController | undefined);
    private _initHeaderMovePermissionInterceptor;
    private _initHeaderResizePermissionInterceptor;
    private _initRangeFillPermissionInterceptor;
    private _initRangeMovePermissionInterceptor;
    private _initFreezePermissionInterceptor;
}
