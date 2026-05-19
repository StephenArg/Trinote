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
import type { IUniverEngineRenderConfig } from './config/config';
import { IConfigService, Injector, Plugin } from '@univerjs/core';
import { Engine } from './engine';
/**
 * The global rendering engine.
 *
 * @deprecated There will be no more default global render engine in the future.
 */
export declare const IRenderingEngine: import("@wendellhu/redi").IdentifierDecorator<Engine>;
export declare class UniverRenderEnginePlugin extends Plugin {
    private readonly _config;
    readonly _injector: Injector;
    private readonly _configService;
    static pluginName: string;
    static packageName: string;
    static version: string;
    constructor(_config: Partial<IUniverEngineRenderConfig> | undefined, _injector: Injector, _configService: IConfigService);
    onStarting(): void;
}
