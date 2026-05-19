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
import type { ICellData, ICommand, IRange, Nullable, ObjectMatrix } from '@univerjs/core';
export interface IInsertFunctionOperationParams {
    /**
     * function name
     */
    value: string;
}
export declare const InsertFunctionOperation: ICommand;
export declare function isNumberCell(cell: Nullable<ICellData>): boolean | void | null;
/**
 * Check if a single cell
 * @param range
 */
export declare function isSingleCell(range: IRange): boolean;
/**
 * Check if there is a multi-row, multi-column range
 * @param range
 */
export declare function isMultiRowsColumnsRange(range: IRange): boolean;
/**
 * Check the range has no number
 * @param cellMatrix
 * @param range
 */
export declare function rangeHasNoNumber(cellMatrix: ObjectMatrix<Nullable<ICellData>>, range: IRange): boolean;
