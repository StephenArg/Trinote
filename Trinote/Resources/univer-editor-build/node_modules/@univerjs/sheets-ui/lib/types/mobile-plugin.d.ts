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
import type { IUniverSheetsUIConfig } from './config/config';
import { IConfigService, Injector, IUniverInstanceService, Plugin, UniverInstanceType } from '@univerjs/core';
import { IRenderManagerService } from '@univerjs/engine-render';
import { ComponentManager } from '@univerjs/ui';
export declare class UniverSheetsMobileUIPlugin extends Plugin {
    private readonly _config;
    readonly _injector: Injector;
    private readonly _renderManagerService;
    private readonly _configService;
    private readonly _univerInstanceService;
    private readonly _componentManager;
    static pluginName: string;
    static packageName: string;
    static version: string;
    static type: UniverInstanceType;
    /** @ignore */
    constructor(_config: Partial<IUniverSheetsUIConfig> | undefined, _injector: Injector, _renderManagerService: IRenderManagerService, _configService: IConfigService, _univerInstanceService: IUniverInstanceService, _componentManager: ComponentManager);
    onStarting(): void;
    onReady(): void;
    onRendered(): void;
    onSteady(): void;
    private _registerRenderBasics;
    private _registerRenderModules;
    private _initAutoFocus;
}
