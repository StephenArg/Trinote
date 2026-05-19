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
import type { IRenderContext, IRenderModule } from '@univerjs/engine-render';
import type { MenuConfig } from '@univerjs/ui';
import { Disposable, IConfigService, Injector, IPermissionService } from '@univerjs/core';
import { IRenderManagerService } from '@univerjs/engine-render';
import { RangeProtectionRuleModel, WorksheetProtectionRuleModel } from '@univerjs/sheets';
import { ComponentManager } from '@univerjs/ui';
import { SheetSkeletonManagerService } from '../../services/sheet-skeleton-manager.service';
export interface IUniverSheetsPermissionMenuConfig {
    menu: MenuConfig;
}
export declare class SheetPermissionRenderManagerController extends Disposable {
    private _injector;
    private _componentManager;
    constructor(_injector: Injector, _componentManager: ComponentManager);
    private _init;
    private _initComponents;
    private _initUiPartComponents;
}
export declare class SheetPermissionRenderController extends Disposable implements IRenderModule {
    private readonly _context;
    private _rangeProtectionRuleModel;
    private _sheetSkeletonManagerService;
    private _permissionService;
    private _configService;
    private _rangeProtectionCanViewRenderExtension;
    private _rangeProtectionCanNotViewRenderExtension;
    constructor(_context: IRenderContext, _rangeProtectionRuleModel: RangeProtectionRuleModel, _sheetSkeletonManagerService: SheetSkeletonManagerService, _permissionService: IPermissionService, _configService: IConfigService);
    private _initRender;
    private _initSkeleton;
}
export declare class WorksheetProtectionRenderController extends Disposable implements IRenderModule {
    private readonly _context;
    private _renderManagerService;
    private _sheetSkeletonManagerService;
    private _worksheetProtectionRuleModel;
    private _configService;
    private _worksheetProtectionRenderExtension;
    constructor(_context: IRenderContext, _renderManagerService: IRenderManagerService, _sheetSkeletonManagerService: SheetSkeletonManagerService, _worksheetProtectionRuleModel: WorksheetProtectionRuleModel, _configService: IConfigService);
    private _initRender;
    private _initSkeleton;
}
