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
import type { IRange, ISelection, ISelectionCell, Nullable, Worksheet } from '@univerjs/core';
import { Direction } from '@univerjs/core';
export declare enum MergeType {
    MergeAll = "mergeAll",
    MergeVertical = "mergeVertical",
    MergeHorizontal = "mergeHorizontal"
}
export interface IExpandParams {
    left?: boolean;
    right?: boolean;
    up?: boolean;
    down?: boolean;
}
export declare function findNextRange(startRange: IRange, direction: Direction, worksheet: Worksheet, boundary?: IRange, isFindNext?: boolean, nextStep?: number, isGoBack?: boolean): IRange;
export declare function findNextGapRange(startRange: IRange, direction: Direction, worksheet: Worksheet): IRange;
export declare function findNextRangeExpand(startRange: IRange, direction: Direction, worksheet: Worksheet): IRange;
export declare function expandToNextGapRange(startRange: IRange, direction: Direction, worksheet: Worksheet): IRange;
export declare function expandToNextCell(startRange: IRange, direction: Direction, worksheet: Worksheet): IRange;
/**
 * This function is considered as a reversed operation of `expandToNextGapCell` but there are slightly differences.
 * @param startRange
 * @param direction
 * @param worksheet
 */
export declare function shrinkToNextGapRange(startRange: IRange, anchorRange: IRange, direction: Direction, worksheet: Worksheet): IRange;
/**
 * This function is considered as a reversed operation of `expandToNextCell` but there are some slightly differences.
 * @param startRange
 * @param direction
 * @param worksheet
 */
export declare function shrinkToNextCell(startRange: IRange, direction: Direction, worksheet: Worksheet): IRange;
export declare function expandToWholeSheet(worksheet: Worksheet): IRange;
export declare function getStartRange(range: IRange, primary: Nullable<ISelectionCell>, direction: Direction): IRange;
export declare function checkIfShrink(selection: ISelection, direction: Direction, worksheet: Worksheet): boolean;
/**
 * Determine whether the entire row is selected
 * @param allRowRanges Range of all rows
 * @param ranges Range of selected rows
 * @returns Whether the entire row is selected
 */
export declare function isAllRowsCovered(allRowRanges: IRange[], ranges: IRange[]): boolean;
/**
 * Determine whether the entire column is selected
 * @param allColumnRanges Range of all columns
 * @param ranges Range of selected columns
 * @returns Whether the entire column is selected
 */
export declare function isAllColumnsCovered(allColumnRanges: IRange[], ranges: IRange[]): boolean;
export declare function getMergeableSelectionsByType(type: MergeType, selections: Nullable<IRange[]>): Nullable<IRange[]>;
