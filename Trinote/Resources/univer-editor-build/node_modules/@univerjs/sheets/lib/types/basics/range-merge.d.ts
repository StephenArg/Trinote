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
import type { IRange } from '@univerjs/core';
import { ObjectMatrix } from '@univerjs/core';
export declare const createTopMatrixFromRanges: (ranges: IRange[]) => ObjectMatrix<number>;
export declare const createTopMatrixFromMatrix: (matrix: ObjectMatrix<1>) => ObjectMatrix<number>;
export declare const findAllRectangle: (topMatrix: ObjectMatrix<number>) => IRange[];
/**
 * Some operations generate sparse ranges such as paste/autofill/ref-range, and this function merge some small ranges into some large ranges to reduce transmission size.
 * Time Complexity: O(mn) , where m and n are rows and columns. It takes O(mn) to compute the markMatrix and O(n) to apply the histogram algorithm to each column.
 * ps. column sparse matrices have better performance
 * @param {IRange[]} ranges
 * @returns {IRange[]}
 */
export declare const rangeMerge: (ranges: IRange[]) => IRange[];
export declare class RangeMergeUtil {
    private _matrix;
    add(...ranges: IRange[]): this;
    subtract(...ranges: IRange[]): this;
    merge(): IRange[];
}
