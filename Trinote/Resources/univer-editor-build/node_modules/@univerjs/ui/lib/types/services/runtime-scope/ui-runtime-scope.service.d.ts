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
import type { IDisposable } from '@univerjs/core';
import { Disposable } from '@univerjs/core';
export interface IUIRuntimeScope {
    unitId: string;
    has(identifier: unknown): boolean;
    get<T = unknown>(identifier: unknown): T;
}
export interface IUIRuntimeScopeService {
    register(scope: IUIRuntimeScope): IDisposable;
    get(unitId: string | null | undefined): IUIRuntimeScope | undefined;
}
export declare const IUIRuntimeScopeService: import("@wendellhu/redi").IdentifierDecorator<IUIRuntimeScopeService>;
export declare class UIRuntimeScopeService extends Disposable implements IUIRuntimeScopeService {
    private readonly _scopes;
    register(scope: IUIRuntimeScope): IDisposable;
    get(unitId: string | null | undefined): IUIRuntimeScope | undefined;
}
