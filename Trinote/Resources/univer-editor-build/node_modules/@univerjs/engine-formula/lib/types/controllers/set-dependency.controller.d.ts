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
import { Disposable, ICommandService } from '@univerjs/core';
import { IDependencyManagerService } from '../services/dependency-manager.service';
import { IFeatureCalculationManagerService } from '../services/feature-calculation-manager.service';
export declare class SetDependencyController extends Disposable {
    private readonly _commandService;
    private readonly _dependencyManagerService;
    private readonly _featureCalculationManagerService;
    constructor(_commandService: ICommandService, _dependencyManagerService: IDependencyManagerService, _featureCalculationManagerService: IFeatureCalculationManagerService);
    private _initialize;
    private _featureCalculationManagerServiceListener;
    private _commandExecutedListener;
    private _handleSetDefinedName;
}
