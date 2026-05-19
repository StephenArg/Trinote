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
import type { IResourceLoaderService } from './type';
import { Disposable } from '../../shared/lifecycle';
import { IUniverInstanceService } from '../instance/instance.service';
import { IResourceManagerService } from '../resource-manager/type';
export declare class ResourceLoaderService extends Disposable implements IResourceLoaderService {
    private readonly _resourceManagerService;
    private readonly _univerInstanceService;
    constructor(_resourceManagerService: IResourceManagerService, _univerInstanceService: IUniverInstanceService);
    private _init;
    saveUnit<T = object>(unitId: string): ({
        resources: import("../..").IResources;
    } & T) | null;
}
