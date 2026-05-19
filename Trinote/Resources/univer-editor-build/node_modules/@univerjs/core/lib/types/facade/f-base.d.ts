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
import type { Injector } from '@univerjs/core';
import { Disposable } from '@univerjs/core';
/**
 * `FBase` is a base class for all facade classes.
 * It provides a way to extend classes with static and instance methods.
 * The `_initialize` as a special method that will be called after the constructor. You should never call it directly.
 * @ignore
 */
export declare abstract class FBase extends Disposable {
    /**
     * @ignore
     */
    static extend(source: any): void;
}
/**
 * @ignore
 */
declare const InitializerSymbol: unique symbol;
/**
 * @ignore
 * @hideconstructor
 */
export declare class FBaseInitialable extends Disposable {
    protected _injector: Injector;
    private [InitializerSymbol];
    constructor(_injector: Injector);
    /**
     * @ignore
     */
    _initialize(injector: Injector, ..._rest: any[]): void;
    protected _runInitializers(...args: any[]): void;
    protected static _enableManualInit(): void;
    /**
     * @ignore
     */
    static extend(source: any): void;
}
export {};
