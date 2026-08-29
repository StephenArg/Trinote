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
import { Disposable, ICommandService, IPermissionService, IUniverInstanceService, LocaleService, UserManagerService } from '@univerjs/core';
import { IRenderManagerService } from '@univerjs/engine-render';
import { SheetPermissionCheckController } from '@univerjs/sheets';
import { ISheetDrawingService } from '@univerjs/sheets-drawing';
export declare class SheetDrawingPermissionController extends Disposable {
    private _commandService;
    private _localeService;
    private readonly _renderManagerService;
    private readonly _permissionService;
    private readonly _univerInstanceService;
    private _userManagerService;
    private _sheetPermissionCheckController;
    private readonly _sheetDrawingService;
    constructor(_commandService: ICommandService, _localeService: LocaleService, _renderManagerService: IRenderManagerService, _permissionService: IPermissionService, _univerInstanceService: IUniverInstanceService, _userManagerService: UserManagerService, _sheetPermissionCheckController: SheetPermissionCheckController, _sheetDrawingService: ISheetDrawingService);
    private _initDrawingVisible;
    private _handleDrawingVisibilityFalse;
    private _initDrawingEditable;
    private _handleDrawingEditableFalse;
    private _initViewPermissionChange;
    private _initEditPermissionChange;
    private _initCommandPermissionCheck;
}
