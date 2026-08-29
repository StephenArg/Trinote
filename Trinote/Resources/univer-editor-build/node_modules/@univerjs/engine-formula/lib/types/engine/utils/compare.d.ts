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
import { compareToken } from '../../basics/token';
/**
 * For SearchType
 */
export declare enum ArrayBinarySearchType {
    MIN = 0,// Ascending order
    MAX = 1
}
/**
 * For MatchType
 */
export declare enum ArrayOrderSearchType {
    NORMAL = 0,// Exact match.
    MIN = 1,// Exact match. If none found, return the next smaller item.
    MAX = 2
}
export declare function getCompare(): (x: string, y: string) => number;
export declare function isWildcard(str: string): boolean;
export declare function isMatchWildcard(currentValue: string, value: string): boolean;
export declare function replaceWildcard(value: string): string;
export declare function compareWithWildcard(currentValue: string, value: string, operator: compareToken): boolean;
export declare function getMatchModeValue(matchModeValue: number): ArrayOrderSearchType;
export declare function getSearchModeValue(searchModeValue: number): ArrayBinarySearchType;
