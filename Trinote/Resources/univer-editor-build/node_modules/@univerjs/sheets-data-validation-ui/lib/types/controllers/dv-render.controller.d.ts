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
import { ICommandService, IUniverInstanceService, RxDisposable } from '@univerjs/core';
import { DataValidatorRegistryService } from '@univerjs/data-validation';
import { IRenderManagerService } from '@univerjs/engine-render';
import { SheetInterceptorService } from '@univerjs/sheets';
import { DataValidationCacheService, SheetDataValidationModel } from '@univerjs/sheets-data-validation';
import { AutoHeightController, IEditorBridgeService } from '@univerjs/sheets-ui';
import { IMenuManagerService } from '@univerjs/ui';
import { DataValidationDropdownManagerService } from '../services/dropdown-manager.service';
export declare class SheetsDataValidationRenderController extends RxDisposable {
    private readonly _commandService;
    private readonly _menuManagerService;
    private readonly _renderManagerService;
    private readonly _univerInstanceService;
    private readonly _autoHeightController;
    private readonly _dropdownManagerService;
    private readonly _sheetDataValidationModel;
    private readonly _dataValidatorRegistryService;
    private readonly _sheetInterceptorService;
    private readonly _dataValidationCacheService;
    private readonly _editorBridgeService?;
    constructor(_commandService: ICommandService, _menuManagerService: IMenuManagerService, _renderManagerService: IRenderManagerService, _univerInstanceService: IUniverInstanceService, _autoHeightController: AutoHeightController, _dropdownManagerService: DataValidationDropdownManagerService, _sheetDataValidationModel: SheetDataValidationModel, _dataValidatorRegistryService: DataValidatorRegistryService, _sheetInterceptorService: SheetInterceptorService, _dataValidationCacheService: DataValidationCacheService, _editorBridgeService?: IEditorBridgeService | undefined);
    private _initMenu;
    private _initDropdown;
    private _initViewModelIntercept;
    private _initAutoHeight;
}
export declare class SheetsDataValidationMobileRenderController extends RxDisposable {
    private readonly _commandService;
    private readonly _renderManagerService;
    private readonly _autoHeightController;
    private readonly _dataValidatorRegistryService;
    private readonly _sheetInterceptorService;
    private readonly _sheetDataValidationModel;
    private readonly _dataValidationCacheService;
    constructor(_commandService: ICommandService, _renderManagerService: IRenderManagerService, _autoHeightController: AutoHeightController, _dataValidatorRegistryService: DataValidatorRegistryService, _sheetInterceptorService: SheetInterceptorService, _sheetDataValidationModel: SheetDataValidationModel, _dataValidationCacheService: DataValidationCacheService);
    private _initViewModelIntercept;
    private _initAutoHeight;
}
