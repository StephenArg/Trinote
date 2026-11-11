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
export type CharsetDataUnit = [number, number];
/**
 * A single character, code point, or inclusive range used to build a character class.
 *
 * String inputs must contain exactly one Unicode code point. Use `or()` for multi-character
 * alternatives such as keywords or table names.
 */
export type CharsetRawInput = string | number | [string, string] | [number, number];
export type CharsetInput = Charset | CharsetRawInput;
/**
 * Builds a normalized regular-expression character class.
 *
 * `Charset` is intended for dynamic character sets, especially when callers need set
 * operations that are hard to read or easy to get wrong with handwritten `[...]` strings.
 * Ranges are stored as inclusive Unicode code-point pairs and merged during construction.
 */
export declare class Charset {
    readonly data: CharsetDataUnit[];
    constructor(...inputs: CharsetInput[]);
    /**
     * Returns a new charset containing this charset and all provided characters or ranges.
     */
    union(...inputs: CharsetInput[]): Charset;
    /**
     * Returns a new charset with the provided characters or ranges removed.
     */
    subtract(...inputs: CharsetInput[]): Charset;
    /**
     * Returns a new charset containing only characters shared with the provided inputs.
     */
    intersect(...inputs: CharsetInput[]): Charset;
    /**
     * Returns whether this charset would match no characters.
     */
    isEmpty(): boolean;
    /**
     * Serializes to a regex fragment, not a full anchored pattern.
     */
    toString(): string;
    /**
     * Creates a `RegExp` from this charset fragment with optional flags.
     */
    toRegExp(flags?: string): RegExp;
}
/**
 * Convenience factory for `new Charset(...)`.
 */
export declare const charset: (...inputs: CharsetInput[]) => Charset;
