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
import type { IDisposable } from '../../common/di';
import type { Nullable } from '../../shared/types';
import { Observable } from 'rxjs';
/**
 * IConfig provides universal configuration for the whole application.
 */
export declare const IConfigService: import("@wendellhu/redi").IdentifierDecorator<IConfigService>;
interface IConfigOptions {
    /**
     * Whether the configuration is read-only.
     * Not implemented yet.
     * @ignore
     */
    readonly?: boolean;
    /**
     * Whether to merge the configuration with the existing one.
     * @default false
     */
    merge?: boolean;
}
export interface IConfigService {
    getConfig<T>(id: string | symbol): Nullable<T>;
    setConfig(id: string | symbol, value: unknown, options?: IConfigOptions): void;
    deleteConfig(id: string): boolean;
    subscribeConfigValue$<T = unknown>(key: string): Observable<T>;
}
export declare class ConfigService implements IConfigService, IDisposable {
    private _configChanged$;
    readonly configChanged$: Observable<{
        [key: string]: unknown;
    }>;
    private readonly _config;
    dispose(): void;
    getConfig<T>(id: string | symbol): Nullable<T>;
    setConfig(id: string, value: unknown, options?: IConfigOptions): void;
    deleteConfig(id: string | symbol): boolean;
    subscribeConfigValue$<T = unknown>(key: string): Observable<T>;
}
export {};
