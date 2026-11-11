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
import type { DependencyOverride, IUniverConfig, Plugin, PluginCtor } from '@univerjs/core';
import { Univer } from '@univerjs/core';
import { FUniver } from '@univerjs/core/facade';
export * from '@univerjs/core/facade';
/**
 * A collection of plugins and their default configs.
 */
export type IPresetPlugin = PluginCtor<Plugin> | [PluginCtor<Plugin>, ConstructorParameters<PluginCtor<Plugin>>[0]];
export interface IPreset {
    plugins: IPresetPlugin[];
    locales?: IUniverConfig['locales'];
}
export interface IPresetOptions {
    lazy?: boolean;
}
type CreateUniverOptions = Partial<IUniverConfig> & {
    presets: Array<IPreset | [IPreset, IPresetOptions]>;
    plugins?: IPresetPlugin[];
    /**
     * Overrides the dependencies defined in the plugin. Only dependencies that are identified by `IdentifierDecorator` can be overridden.
     * If you override a dependency with `null`, the original dependency will be removed.
     */
    override?: DependencyOverride;
    collaboration?: true;
};
export declare function createUniver(options: CreateUniverOptions): {
    univer: Univer;
    univerAPI: FUniver;
};
