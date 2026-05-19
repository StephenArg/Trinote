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
import type { ICellData, IMutationInfo, IObjectMatrixPrimitiveType, IRange, Nullable } from '@univerjs/core';
import type { IDiscreteRange, ISetRangeValuesMutationParams } from '@univerjs/sheets';
/**
 *
 *
 * @param {IRange} sourceRange
 * @param {IRange} targetRange
 * @param {boolean} [isStrictMode] if is true,the remainder of the row and column must all be 0 to be repeated
 * @return {*}
 */
export declare const getRepeatRange: (sourceRange: IRange, targetRange: IRange, isStrictMode?: boolean) => {
    startRange: IRange;
    repeatRelativeRange: IRange;
}[];
export declare function htmlIsFromExcel(html: string): boolean;
export declare function htmlContainsImage(html: string): boolean;
export declare function mergeCellValues(...cellValues: IObjectMatrixPrimitiveType<Nullable<ICellData>>[]): IObjectMatrixPrimitiveType<Nullable<ICellData>> | IObjectMatrixPrimitiveType<IObjectMatrixPrimitiveType<Nullable<ICellData>>>;
export declare function getRangeValuesMergeable(m1: IMutationInfo<ISetRangeValuesMutationParams>, m2: IMutationInfo<ISetRangeValuesMutationParams>): boolean;
export declare function mergeSetRangeValues(mutations: IMutationInfo[]): IMutationInfo<object>[];
export declare function spilitLargeSetRangeValuesMutations(mutation: IMutationInfo<ISetRangeValuesMutationParams>, options?: {
    maxCellsPerChunk?: number;
    threshold?: number;
    maxChunks?: number;
}): IMutationInfo<ISetRangeValuesMutationParams>[];
export declare function rangeIntersectWithDiscreteRange(range: IRange, discrete: IDiscreteRange): true | undefined;
export declare function discreteRangeContainsRange(discrete: IDiscreteRange, range: IRange): boolean;
export declare function convertTextToTable(text: string): string;
