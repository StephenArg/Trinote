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
import type { IUniverEngineFormulaConfig } from './config/config';
import { IConfigService, Injector, Plugin } from '@univerjs/core';
export declare class UniverFormulaEnginePlugin extends Plugin {
    protected readonly _config: Partial<IUniverEngineFormulaConfig>;
    protected _injector: Injector;
    protected readonly _configService: IConfigService;
    static pluginName: string;
    static packageName: string;
    static version: string;
    constructor(_config: Partial<IUniverEngineFormulaConfig> | undefined, _injector: Injector, _configService: IConfigService);
    onStarting(): void;
    onReady(): void;
    onRendered(): void;
    private _initialize;
    protected _initializeWithOverride(): void;
}
