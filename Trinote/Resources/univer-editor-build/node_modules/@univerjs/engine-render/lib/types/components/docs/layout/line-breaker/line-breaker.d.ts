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
import type { Nullable } from '@univerjs/core';
import type { ILineBreakRule } from './rule';
import { Break } from './break';
interface ILineBreakExtension {
    (breaker: LineBreaker): void;
}
export interface IBreakPoints {
    nextBreakPoint(): Nullable<Break>;
}
export declare class LineBreaker implements IBreakPoints {
    content: string;
    private _pos;
    private _lastPos;
    private _curClass;
    private _codePoint;
    private _lastCodePoint;
    private _nextClass;
    private _LB8a;
    private _LB21a;
    private _LB30a;
    private _rule;
    constructor(content: string);
    use(extension: ILineBreakExtension): this;
    addRule(key: string, rule: ILineBreakRule): this;
    nextBreakPoint(): Break | null;
    private _getNextCodePoint;
    private _nextCharClass;
    private _getSimpleBreak;
    private _getPairTableBreak;
}
export {};
