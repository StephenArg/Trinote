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
import { Injector, IUniverInstanceService, RxDisposable } from '@univerjs/core';
import { DataValidatorRegistryService } from '@univerjs/data-validation';
import { SheetInterceptorService, SheetsSelectionsService } from '@univerjs/sheets';
import { SheetDataValidationModel } from '../models/sheet-data-validation-model';
export declare class DataValidationController extends RxDisposable {
    private readonly _univerInstanceService;
    private readonly _dataValidatorRegistryService;
    private readonly _injector;
    private _selectionManagerService;
    private readonly _sheetInterceptorService;
    private readonly _sheetDataValidationModel;
    constructor(_univerInstanceService: IUniverInstanceService, _dataValidatorRegistryService: DataValidatorRegistryService, _injector: Injector, _selectionManagerService: SheetsSelectionsService, _sheetInterceptorService: SheetInterceptorService, _sheetDataValidationModel: SheetDataValidationModel);
    private _init;
    private _registerValidators;
    private _initCommandInterceptor;
}
