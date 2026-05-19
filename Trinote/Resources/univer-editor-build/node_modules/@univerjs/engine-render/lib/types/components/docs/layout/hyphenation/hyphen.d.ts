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
import { Lang } from './lang';
export declare class Hyphen implements IDisposable {
    private _patterns;
    private _hyphenCache;
    private static _instance;
    static getInstance(): Hyphen;
    constructor();
    private _preloadPatterns;
    private _loadExceptionsToCache;
    loadPattern(lang: Lang): Promise<void>;
    fetchHyphenCache(lang: Lang): Map<string, string[]> | undefined;
    hasPattern(lang: Lang): boolean;
    hyphenate(word: string, lang: Lang): string[] | undefined;
    dispose(): void;
}
