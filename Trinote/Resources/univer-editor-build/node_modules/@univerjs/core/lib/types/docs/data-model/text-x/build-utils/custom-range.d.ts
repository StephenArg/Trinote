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
import type { ITextRange } from '../../../../sheets/typedef';
import type { CustomRangeType, ICustomRange, IDocumentBody } from '../../../../types/interfaces';
/**
 * Check if two ranges intersect
 * @param line1Start - The start of the first range
 * @param line1End - The end of the first range
 * @param line2Start - The start of the second range
 * @param line2End - The end of the second range
 * @returns True if the ranges intersect, false otherwise
 */
export declare function isIntersecting(line1Start: number, line1End: number, line2Start: number, line2End: number): boolean;
export declare function getCustomRangesInterestsWithSelection(range: ITextRange, customRanges: ICustomRange[]): ICustomRange<Record<string, any>>[];
export declare function copyCustomRange(range: ICustomRange): {
    rangeId: string;
    startIndex: number;
    endIndex: number;
    rangeType: CustomRangeType | number;
    wholeEntity?: boolean;
    properties?: Record<string, any> | undefined;
};
export declare function excludePointsFromRange(range: [number, number], points: number[]): [number, number][];
export declare function getIntersectingCustomRanges(startIndex: number, endIndex: number, customRanges: ICustomRange[], rangeType?: CustomRangeType): {
    startIndex: number;
    endIndex: number;
    rangeId: string;
    rangeType: CustomRangeType | number;
    wholeEntity?: boolean;
    properties?: Record<string, any> | undefined;
}[];
export declare function getSelectionForAddCustomRange(range: ITextRange, body: IDocumentBody): {
    startOffset: number;
    endOffset: number;
    collapsed: boolean;
};
