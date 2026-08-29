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
import { Disposable, IResourceManagerService, IUniverInstanceService } from '@univerjs/core';
import { DataValidationModel } from '../models/data-validation-model';
export declare class DataValidationResourceController extends Disposable {
    private readonly _resourceManagerService;
    private readonly _univerInstanceService;
    private readonly _dataValidationModel;
    constructor(_resourceManagerService: IResourceManagerService, _univerInstanceService: IUniverInstanceService, _dataValidationModel: DataValidationModel);
    private _initSnapshot;
}
