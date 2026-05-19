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
import type { IDisposable, Nullable } from '@univerjs/core';
import type { IFunctionNames } from '@univerjs/engine-formula';
import type { Observable } from 'rxjs';
export interface IStatusBarService {
    state$: Observable<Nullable<IStatusBarServiceStatus>>;
    dispose(): void;
    setState(param: IStatusBarServiceStatus | null): void;
    getState(): Readonly<Nullable<IStatusBarServiceStatus>>;
    getFunctions(): Readonly<IStatusBarFunction[]>;
}
export interface IStatusBarServiceStatus {
    values: Array<{
        func: IFunctionNames;
        value: number;
    }>;
    pattern: Nullable<string>;
}
export interface IStatusBarFunction {
    func: IFunctionNames;
    filter?: (status: IStatusBarServiceStatus) => boolean;
}
export declare class StatusBarService implements IStatusBarService, IDisposable {
    private readonly _functions;
    private readonly _state$;
    readonly state$: Observable<Nullable<IStatusBarServiceStatus>>;
    dispose(): void;
    setState(param: IStatusBarServiceStatus | null): void;
    getState(): Readonly<Nullable<IStatusBarServiceStatus>>;
    getFunctions(): Readonly<IStatusBarFunction[]>;
    addFunctions(functions: IStatusBarFunction[]): void;
}
export declare const IStatusBarService: import("@wendellhu/redi").IdentifierDecorator<IStatusBarService>;
