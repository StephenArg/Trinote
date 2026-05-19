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
import type { IUniverRPCMainThreadConfig, IUniverRPCWorkerThreadConfig } from './config/config';
import { IConfigService, Injector, Plugin } from '@univerjs/core';
/**
 * This plugin is used to register the RPC services on the main thread. It
 * is also responsible for booting up the Web Worker instance of Univer.
 */
export declare class UniverRPCMainThreadPlugin extends Plugin {
    private readonly _config;
    protected readonly _injector: Injector;
    private readonly _configService;
    static pluginName: string;
    static packageName: string;
    static version: string;
    private _internalWorker;
    constructor(_config: Partial<IUniverRPCMainThreadConfig> | undefined, _injector: Injector, _configService: IConfigService);
    dispose(): void;
    onStarting(): void;
}
/**
 * This plugin is used to register the RPC services on the worker thread.
 */
export declare class UniverRPCWorkerThreadPlugin extends Plugin {
    private readonly _config;
    protected readonly _injector: Injector;
    private readonly _configService;
    static pluginName: string;
    static packageName: string;
    static version: string;
    constructor(_config: Partial<IUniverRPCWorkerThreadConfig> | undefined, _injector: Injector, _configService: IConfigService);
    onStarting(): void;
}
