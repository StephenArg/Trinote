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
import type { Ctor, IDisposable } from '../../common/di';
import { Injector } from '../../common/di';
import { UniverInstanceType } from '../../common/unit';
import { Disposable } from '../../shared/lifecycle';
import { LifecycleService } from '../lifecycle/lifecycle.service';
import { ILogService } from '../log/log.service';
export declare const DependentOnSymbol: unique symbol;
export type PluginCtor<T extends Plugin = Plugin> = Ctor<T> & {
    type: UniverInstanceType;
    pluginName: string;
    packageName: string;
    version: string;
    [DependentOnSymbol]?: PluginCtor[];
};
/**
 * Plug-in base class, all plug-ins must inherit from this base class. Provide basic methods.
 */
export declare abstract class Plugin extends Disposable {
    static pluginName: string;
    static packageName: string;
    static version: string;
    static type: UniverInstanceType;
    protected abstract _injector: Injector;
    onStarting(): void;
    onReady(): void;
    onRendered(): void;
    onSteady(): void;
    getUnitType(): UniverInstanceType;
    getPluginName(): string;
}
/**
 * Store plugin instances.
 */
export declare class PluginStore {
    private readonly _plugins;
    addPlugin(plugin: Plugin): void;
    removePlugins(): Plugin[];
    forEachPlugin(callback: (plugin: Plugin) => void): void;
}
/**
 * Use this decorator to declare dependencies among plugins. If a dependent plugin is not registered yet,
 * Univer will automatically register it with no configuration.
 *
 * For example:
 *
 * ```ts
 * ⁣@DependentOn(UniverDrawingPlugin, UniverDrawingUIPlugin, UniverSheetsDrawingPlugin)
 * export class UniverSheetsDrawingUIPlugin extends Plugin {
 * }
 * ```
 */
export declare function DependentOn(...plugins: PluginCtor<Plugin>[]): (target: PluginCtor<Plugin>) => void;
/**
 * This service manages plugin registration.
 */
export declare class PluginService implements IDisposable {
    private readonly _injector;
    private readonly _lifecycleService;
    private readonly _logService;
    private _pluginRegistry;
    private readonly _pluginStore;
    private readonly _seenPlugins;
    private readonly _loadedPlugins;
    private readonly _loadedPluginTypes;
    constructor(_injector: Injector, _lifecycleService: LifecycleService, _logService: ILogService);
    dispose(): void;
    /**
     * Register a plugin into univer.
     * @param {PluginCtor} ctor The plugin's constructor.
     * @param {ConstructorParameters} [config] The configuration for the plugin.
     */
    registerPlugin<T extends PluginCtor>(ctor: T, config?: ConstructorParameters<T>[0]): void;
    startPluginsForType(type: UniverInstanceType): void;
    private _loadPluginsForType;
    private _assertPluginValid;
    private _flushTimerByType;
    private _flushType;
    private _loadFromPlugins;
    protected _pluginsRunLifecycle(plugins: Plugin[]): void;
    private _runStage;
    private _initPlugin;
}
