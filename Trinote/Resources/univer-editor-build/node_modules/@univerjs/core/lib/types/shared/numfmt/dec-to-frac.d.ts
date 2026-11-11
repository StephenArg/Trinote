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
/**
 * Split a fractional number into a numerator and denominator for display as
 * vulgar fractions.
 *
 * @ignore
 * @param {number} number The value to split
 * @param {number} [numeratorMaxDigits] The maxdigits number
 * @param {number} [denominatorMaxDigits] The maxdigits de
 * @returns {Array<number>} Array of two numbers, numerator and denominator.
 */
export declare function dec2frac(number: number, numeratorMaxDigits?: number, denominatorMaxDigits?: number): [number, number];
