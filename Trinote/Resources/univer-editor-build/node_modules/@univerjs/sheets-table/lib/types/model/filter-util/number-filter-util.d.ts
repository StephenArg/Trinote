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
import type { ICalculatedOptions, ITableNumberFilterInfo } from '../../types/type';
/**
 * @description Checks if a value is above the average.
 * @param {number} value - The value to check.
 * @param {number} average - The average value.
 * @returns {boolean} A boolean value indicating whether the value is above the average.
 */
export declare const above: (value: number, average: number) => boolean;
/**
 * @description Checks if a value is below the average.
 * @param {number} value - The value to check.
 * @param {number} average - The average value.
 * @returns {boolean} A boolean value indicating whether the value is below the average.
 */
export declare const below: (value: number, average: number) => boolean;
/**
 * @description Gets the largest N values from a list and checks if the expected value is included.
 * @param {number[]} list - The list of numbers.
 * @param {number} top - The number of top values to retrieve.
 * @param {number} expectedValue - The expected value to check for inclusion.
 * @returns {boolean} A boolean value indicating whether the expected value is included in the top N values.
 */
export declare const getTopN: (list: number[], top: number, expectedValue: number) => boolean;
/**
 * @description Gets the smallest N values from a list and checks if the expected value is included.
 * @param {number[]} list - The list of numbers.
 * @param {number} bottom - The number of bottom values to retrieve.
 * @param {number} expectedValue - The expected value to check for inclusion.
 * @returns {boolean} A boolean value indicating whether the expected value is included in the bottom N values.
 */
export declare const getBottomN: (list: number[], bottom: number, expectedValue: number) => boolean;
export declare function getNumberFilterExecuteFunc(filter: ITableNumberFilterInfo, calculatedOptions: ICalculatedOptions | undefined): (value: number) => boolean;
