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
import type { Theme } from '@univerjs/themes';
import type { IDisposable } from './common/di';
import type { UnitModel } from './common/unit';
import type { LogLevel } from './services/log/log.service';
import type { DependencyOverride } from './services/plugin/plugin-override';
import type { Plugin, PluginCtor } from './services/plugin/plugin.service';
import type { ILocales } from './shared';
import type { LocaleType } from './types/enum/locale-type';
import { Injector } from './common/di';
import { UniverInstanceType } from './common/unit';
export interface IUniverConfig {
    /**
     * The theme of the Univer instance, default using the default theme.
     */
    theme?: Theme;
    /**
     * Whether to use dark mode.
     * @default false
     */
    darkMode?: boolean;
    /**
     * The locale of the Univer instance.
     */
    locale?: LocaleType;
    /**
     * The direction of the Univer instance.
     * @default 'ltr'
     */
    direction?: 'ltr' | 'rtl';
    /**
     * The locales to be used
     */
    locales?: ILocales;
    /**
     * The log level of the Univer instance.
     */
    logLevel?: LogLevel;
    /**
     * Whether to enable logging for command execution.
     * @default false
     */
    logCommandExecution?: boolean;
    /**
     * The override dependencies of the Univer instance.
     */
    override?: DependencyOverride;
}
/**
 * @hideconstructor
 */
export declare class Univer implements IDisposable {
    private _startedTypes;
    private _injector;
    private get _univerInstanceService();
    private get _pluginService();
    private _disposingCallbacks;
    /**
     * Create a Univer instance.
     * @param config Configuration data for Univer
     * @param parentInjector An optional parent injector of the Univer injector. For more information, see https://redi.wendell.fun/docs/hierarchy.
     */
    constructor(config?: Partial<IUniverConfig>, parentInjector?: Injector);
    /**
     * @ignore
     */
    __getInjector(): Injector;
    /**
     * Register a callback function which will be called when this Univer instance is disposing.
     *
     * @ignore
     *
     * @param callback The callback function.
     * @returns To remove this callback function from this Univer instance's on disposing list.
     */
    onDispose(callback: () => void): IDisposable;
    dispose(): void;
    setLocale(locale: LocaleType): void;
    createUnit<T, U extends UnitModel>(type: UniverInstanceType, data: Partial<T>): U;
    private _init;
    private _tryProgressToReady;
    /** Register a plugin into univer. */
    registerPlugin<T extends PluginCtor<Plugin>>(plugin: T, config?: ConstructorParameters<T>[0]): void;
    /**
     * Register multiple plugins into univer.
     * @param plugins An array of tuples, where each tuple contains a plugin constructor and its optional configuration.
     */
    registerPlugins<T extends readonly (readonly [PluginCtor<Plugin>] | readonly [PluginCtor<Plugin>, unknown])[]>(plugins: {
        readonly [K in keyof T]: T[K] extends readonly [infer P] ? P extends PluginCtor<Plugin> ? readonly [P] : T[K] : T[K] extends readonly [infer P, unknown] ? P extends PluginCtor<Plugin> ? readonly [P, ConstructorParameters<P>[0]?] : T[K] : T[K];
    }): void;
}
