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
import type { ICellData, IObjectMatrixPrimitiveType, IRange, ISelectionCell, Nullable, Workbook, Worksheet } from '@univerjs/core';
import type { ISelectionWithStyle } from '../../../basics/selection';
import type { ISetSelectionsOperationParams } from '../../operations/selection.operation';
export interface IExpandParams {
    left?: boolean;
    right?: boolean;
    up?: boolean;
    down?: boolean;
}
/**
 * Adjust the range to align merged cell's borders.
 */
export declare function alignToMergedCellsBorders(startRange: IRange, worksheet: Worksheet, shouldRecursive?: boolean): IRange;
export declare function getCellAtRowCol(row: number, col: number, worksheet: Worksheet): ISelectionCell;
export declare function setEndForRange(range: IRange, rowCount: number, columnCount: number): IRange;
/**
 * Get the default primary cell (the most top-left cell) of a range.
 * @param range
 * @param worksheet
 */
export declare function getPrimaryForRange(range: IRange, worksheet: Worksheet): ISelectionCell;
export interface IInterval {
    [index: string]: [start: number, end: number];
}
/**
 * Calculate the real length of the intervals
 * @param intervalsObject
 * @returns
 */
export declare function calculateTotalLength(intervalsObject: IInterval): number;
export declare const followSelectionOperation: (range: IRange, workbook: Workbook, worksheet: Worksheet) => {
    id: string;
    params: ISetSelectionsOperationParams;
};
/**
 * Examine if a selection only contains a single cell (a merged cell is considered as a single cell in this case).
 * @param selection
 * @returns `true` if the selection only contains a single cell.
 */
export declare function isSingleCellSelection(selection: Nullable<ISelectionWithStyle & {
    primary: ISelectionCell;
}>): boolean;
/**
 * Create an iterator to iterate over cells in range.
 * It will skip the row that has been filtered.
 * @param sheet bind a sheet
 * @returns iterator
 */
export declare function createRangeIteratorWithSkipFilteredRows(sheet: Worksheet): {
    forOperableEach: (ranges: IRange, operator: (row: number, col: number, range: IRange) => void) => void;
};
/**
 * Copy the styles of a range of cells to another range. Used for insert row and insert column.
 * @param worksheet
 * @param startRow
 * @param endRow
 * @param startColumn
 * @param endColumn
 * @param isRow
 * @param sourceRangeIndex
 */
export declare function copyRangeStyles(worksheet: Worksheet, startRow: number, endRow: number, startColumn: number, endColumn: number, isRow: boolean, sourceRangeIndex: number): IObjectMatrixPrimitiveType<ICellData>;
export declare function copyRangeStylesWithoutBorder(worksheet: Worksheet, startRow: number, endRow: number, startColumn: number, endColumn: number, isRow: boolean, styleRowOrColumn: number): IObjectMatrixPrimitiveType<ICellData>;
