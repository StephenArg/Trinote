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
import type { IRange, Worksheet } from '@univerjs/core';
/**
 * The default delimiter to split the text.
 */
export declare enum SplitDelimiterEnum {
    /**
     * The tab character
     */
    Tab = 1,
    /**
     * The comma character
     */
    Comma = 2,
    /**
     * The semicolon character
     */
    Semicolon = 4,
    /**
     * The space character
     */
    Space = 8,
    /**
     * The custom delimiter
     */
    Custom = 16
}
interface ISplitRangeTextResult {
    rs: (string[] | undefined)[];
    maxLength: number;
    lastRow: number;
}
/**
 * Split the text in the range into a two-dimensional array.
 * @param {Worksheet} sheet The worksheet which range belongs to.
 * @param {IRange} range The range to split.
 * @param {SplitDelimiterEnum} [delimiter] The delimiter to split the text.
 * @param {string} [customDelimiter] The custom delimiter to split the text. An error will be thrown if customDelimiter is not a character.
 * @param {boolean} [treatMultipleDelimitersAsOne] split multiple delimiters as one.
 * @returns {ISplitRangeTextResult} The two-dimensional array of the split text and max column length.
 */
export declare function splitRangeText(sheet: Worksheet, range: IRange, delimiter?: SplitDelimiterEnum, customDelimiter?: string, treatMultipleDelimitersAsOne?: boolean): ISplitRangeTextResult;
export {};
