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
import { LRUMap } from '@univerjs/core';
export declare class FormulaAstLRU<T> {
    private _cache;
    constructor(cacheCount: number);
    set(formulaString: string, node: T): void;
    get(formulaString: string): T | undefined;
    clear(): void;
    delete(formulaString: string): void;
    forEach(callbackfn: (value: T, key: string, map: LRUMap<string, T>) => void, thisArg?: any): void;
    private _hash;
}
