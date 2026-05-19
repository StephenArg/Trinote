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
import type { IObjectArrayPrimitiveType } from '../shared/object-matrix';
import type { Nullable } from '../shared/types';
import type { IStyleData } from '../types/interfaces';
import type { CustomData, IRange, IRowData, IWorksheetData } from './typedef';
import type { SheetViewModel } from './view-model';
/**
 * Manage configuration information of all rows, get row height, row length, set row height, etc.
 */
export declare class RowManager {
    private readonly _config;
    private readonly _viewModel;
    private _rowData;
    constructor(_config: IWorksheetData, _viewModel: SheetViewModel, data: IObjectArrayPrimitiveType<Partial<IRowData>>);
    /**
     * Get height and hidden status of columns in the sheet
     * @returns {IObjectArrayPrimitiveType<Partial<IRowData>>} Row data, including height, hidden status, etc.
     */
    getRowData(): IObjectArrayPrimitiveType<Partial<IRowData>>;
    /**
     * Get the row style
     * @param {number} row Row index
     * @returns {string | Nullable<IStyleData>} Style data, may be undefined
     */
    getRowStyle(row: number): Nullable<string | IStyleData>;
    /**
     * Set row default style
     * @param {number} row The row index
     * @param {string | Nullable<IStyleData>} style The style data
     */
    setRowStyle(row: number, style: string | Nullable<IStyleData>): void;
    getRowDatas(rowPos: number, numRows: number): IObjectArrayPrimitiveType<Partial<IRowData>>;
    getRowHeight(rowPos: number): number;
    getRowHeight(rowPos: number, count: number): number;
    /**
     * Set row height of given row
     * @param rowPos row index
     * @param height row height
     */
    setRowHeight(rowPos: number, height: number): void;
    /**
     * Get row data of given row
     * @param rowPos row index
     * @returns {Nullable<Partial<IRowData>>} rowData
     */
    getRow(rowPos: number): Nullable<Partial<IRowData>>;
    /**
     * Insert rows data at given position
     * @param {number} startRow - start row index
     * @param {number} endRow - end row index
     * @param {IObjectArrayPrimitiveType<IRowData>} [rowDataInfo] - row data info
     */
    insertRowsWithData(startRow: number, endRow: number, rowDataInfo?: IObjectArrayPrimitiveType<IRowData>): void;
    /**
     * Remove row data of given row
     * @param rowPos
     */
    removeRow(rowPos: number): void;
    /**
     * Get given row data or create a row data when it's null
     * This method is used to ensure that the row data should not be null when setting row properties.
     * To prevent data redundancy, if is not setting row properties, you can use `getRow` method to get row data. don't use this method.
     * @param rowPos row index
     * @returns {Partial<IRowData>} rowData
     */
    getRowOrCreate(rowPos: number): Partial<IRowData>;
    /**
     * Get all hidden rows
     * @param start Start index
     * @param end End index
     * @returns Hidden rows range list
     */
    getHiddenRows(start?: number, end?: number): IRange[];
    /**
     * Get all visible rows
     * @param start Start index
     * @param end End index
     * @returns Visible rows range list
     */
    getVisibleRows(start?: number, end?: number): IRange[];
    getRowRawVisible(row: number): boolean;
    /**
     * Get count of row in the sheet
     * @returns {number} row count
     */
    getSize(): number;
    setCustomMetadata(index: number, custom: CustomData | undefined): void;
    getCustomMetadata(index: number): CustomData | undefined;
}
