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
import type { CharsetInput } from './charset';
import { Charset } from './charset';
/**
 * A literal string, existing `Or`, or character-set input used to build alternatives.
 */
export type OrInput = string | Or | CharsetInput;
/**
 * Builds a regex alternation from literal strings and character sets.
 *
 * Literal strings are escaped automatically. Character-set inputs are folded into one
 * `Charset`, so `or('SUM', charset('A', 'B'))` serializes to an alternation containing
 * both the string branch and the character-class branch.
 */
export declare class Or {
    readonly charset: Charset;
    readonly strings: string[];
    constructor(...inputs: OrInput[]);
    /**
     * Returns a new alternation containing this instance and all provided inputs.
     */
    union(...inputs: OrInput[]): Or;
    /**
     * Returns a new alternation with matching string and charset inputs removed.
     */
    subtract(...inputs: OrInput[]): Or;
    /**
     * Returns whether this alternation would match no branches.
     */
    isEmpty(): boolean;
    /**
     * Serializes to a regex fragment, not a full anchored pattern.
     */
    toString(): string;
    /**
     * Creates a `RegExp` from this alternation fragment with optional flags.
     */
    toRegExp(flags?: string): RegExp;
}
/**
 * Convenience factory for `new Or(...)`.
 */
export declare const or: (...inputs: OrInput[]) => Or;
