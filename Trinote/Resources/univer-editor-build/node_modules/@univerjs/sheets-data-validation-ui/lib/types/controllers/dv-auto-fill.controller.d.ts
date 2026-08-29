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
import { Disposable, Injector } from '@univerjs/core';
import { IAutoFillService } from '@univerjs/sheets';
import { SheetDataValidationModel } from '@univerjs/sheets-data-validation';
export declare class DataValidationAutoFillController extends Disposable {
    private readonly _autoFillService;
    private readonly _sheetDataValidationModel;
    private readonly _injector;
    constructor(_autoFillService: IAutoFillService, _sheetDataValidationModel: SheetDataValidationModel, _injector: Injector);
    private _initAutoFill;
}
