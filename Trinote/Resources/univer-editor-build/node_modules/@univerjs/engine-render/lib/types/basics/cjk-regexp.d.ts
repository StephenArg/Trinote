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
type CharsetDataUnit = [number, number];
/**
 * Returns the CJK letter charset generated from `cjk-regex@3.4.0`.
 */
declare function letters(): import("@univerjs/core/common/regexp/charset.js").Charset;
/**
 * Returns the CJK punctuation charset generated from `cjk-regex@3.4.0`.
 */
declare function punctuations(): import("@univerjs/core/common/regexp/charset.js").Charset;
/**
 * Returns the combined CJK letter and punctuation charset generated from `cjk-regex@3.4.0`.
 */
declare function all(): import("@univerjs/core/common/regexp/charset.js").Charset;
/**
 * Returns true when text contains CJK letters, excluding punctuation and symbols.
 */
declare function hasCJKText(text: string): boolean;
/**
 * Returns true when text contains CJK letters or CJK punctuation.
 */
declare function hasCJK(text: string): boolean;
/**
 * Returns true when text contains CJK punctuation, excluding CJK letters.
 */
declare function hasCJKPunctuation(text: string): boolean;
/**
 * Namespace-style CJK regex API used by document rendering and layout.
 */
export declare const cjk: {
    CJK_LETTER_SOURCE: string;
    CJK_PUNCTUATION_SOURCE: string;
    CJK_ALL_SOURCE: string;
    CJK_LETTER_REG: RegExp;
    CJK_PUNCTUATION_REG: RegExp;
    CJK_ALL_REG: RegExp;
    CJK_LETTER_DATA: CharsetDataUnit[];
    CJK_PUNCTUATION_DATA: CharsetDataUnit[];
    CJK_ALL_DATA: CharsetDataUnit[];
    letters: typeof letters;
    punctuations: typeof punctuations;
    all: typeof all;
    hasCJKText: typeof hasCJKText;
    hasCJK: typeof hasCJK;
    hasCJKPunctuation: typeof hasCJKPunctuation;
};
export {};
