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
import type { IRange } from '../sheets/typedef';
import type { Nullable } from './types';
export declare function moveRangeByOffset(range: IRange, refOffsetX: number, refOffsetY: number, ignoreAbsolute?: boolean): IRange;
/**
 * Split ranges into aligned smaller ranges
 * @param ranges no overlap ranges
 * @returns aligned smaller ranges
 */
export declare function splitIntoGrid(ranges: IRange[]): IRange[];
/**
 * Horizontal Merging
 * @param ranges no overlap ranges
 * @returns merged ranges
 */
export declare function mergeHorizontalRanges(ranges: IRange[]): IRange[];
/**
 * Vertical Merging
 * @param ranges no overlap ranges
 * @returns merged ranges
 */
export declare function mergeVerticalRanges(ranges: IRange[]): IRange[];
/**
 * Merge no overlap ranges
 * @param ranges no overlap ranges
 * @returns ranges
 */
export declare function mergeRanges(ranges: IRange[]): IRange[];
export declare function multiSubtractSingleRange(ranges: IRange[], toDelete: IRange): IRange[];
/**
 * Computes the intersection of two ranges.
 * If there is an overlap between the two ranges, returns a new range representing the intersection.
 * If there is no overlap, returns null.
 *
 * @param src - The source range.
 * @param target - The target range.
 * @returns The intersected range or null if there is no intersection.
 */
export declare function getIntersectRange(src: IRange, target: IRange): Nullable<IRange>;
