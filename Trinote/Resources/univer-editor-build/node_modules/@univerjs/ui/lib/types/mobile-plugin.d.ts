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
import type { IUniverUIConfig } from './config/config';
import { IConfigService, IContextService, Injector, Plugin } from '@univerjs/core';
export declare const DISABLE_AUTO_FOCUS_KEY = "DISABLE_AUTO_FOCUS";
/**
 * UI plugin provides basic interaction with users. Including workbench (menus, UI parts, notifications etc.), copy paste, shortcut.
 */
export declare class UniverMobileUIPlugin extends Plugin {
    private readonly _config;
    private readonly _contextService;
    protected readonly _injector: Injector;
    private readonly _configService;
    static pluginName: string;
    static packageName: string;
    static version: string;
    constructor(_config: Partial<IUniverUIConfig> | undefined, _contextService: IContextService, _injector: Injector, _configService: IConfigService);
    onStarting(): void;
    onReady(): void;
    onSteady(): void;
}
