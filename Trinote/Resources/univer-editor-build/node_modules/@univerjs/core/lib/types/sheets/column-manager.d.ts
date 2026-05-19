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
import type { CustomData, IColumnData, IRange, IWorksheetData } from './typedef';
/**
 * Manage configuration information of all columns, get column width, column length, set column width, etc.
 */
export declare class ColumnManager {
    private readonly _config;
    private _columnData;
    constructor(_config: IWorksheetData, data: IObjectArrayPrimitiveType<Partial<IColumnData>>);
    /**
     * Get width and hidden status of columns in the sheet
     * @returns {IObjectArrayPrimitiveType<Partial<IColumnData>>} Column data, including width, hidden status, etc.
     */
    getColumnData(): IObjectArrayPrimitiveType<Partial<IColumnData>>;
    getColVisible(colPos: number): boolean;
    /**
     * Get the column style
     * @param {number} col Column index
     * @returns {string | Nullable<IStyleData>} Style data, may be undefined
     */
    getColumnStyle(col: number): Nullable<string | IStyleData>;
    /**
     * Set the set column  default style
     * @param {number} col Column index
     * @param {string | Nullable<IStyleData>} style Style data
     */
    setColumnStyle(col: number, style: string | Nullable<IStyleData>): void;
    /**
     * Get all hidden columns
     * @param start Start index
     * @param end End index
     * @returns Hidden columns range list
     */
    getHiddenCols(start?: number, end?: number): IRange[];
    /**
     * Get all visible columns
     * @param start Start index
     * @param end End index
     * @returns Visible columns range list
     */
    getVisibleCols(start?: number, end?: number): IRange[];
    getColumnDatas(columnPos: number, numColumns: number): IObjectArrayPrimitiveType<Partial<IColumnData>>;
    /**
     * Get count of column in the sheet
     * @returns {number} count of column
     */
    getSize(): number;
    /**
     * Get the width of column
     * @param columnPos column index
     * @returns {number} width of column
     */
    getColumnWidth(columnPos: number): number;
    /**
     * Set the width of column
     * @param columnPos column index
     * @param width width of column
     */
    setColumnWidth(columnPos: number, width: number): void;
    /**
     * Get given column data
     * @param columnPos column index
     */
    getColumn(columnPos: number): Nullable<Partial<IColumnData>>;
    /**
     * Insert columns data at given position
     * @param {number} startColumn - start column index
     * @param {number} endColumn - end column index
     * @param {IObjectArrayPrimitiveType<IColumnData>} [columnDataInfo] - column data info
     */
    insertColumnsWithData(startColumn: number, endColumn: number, columnDataInfo?: IObjectArrayPrimitiveType<IColumnData>): void;
    /**
     * Remove column data of given column
     * @param columnPos
     */
    removeColumn(columnPos: number): void;
    /**
     * Get given column data or create a column data when it's null
     * This method is used to ensure that the column data should not be null when setting column properties.
     * To prevent data redundancy, if is not setting column properties, you can use `getColumn` method to get column data. don't use this method.
     * @param columnPos column index
     * @returns {Partial<IColumnData>} columnData
     */
    getColumnOrCreate(columnPos: number): Partial<IColumnData>;
    setCustomMetadata(index: number, custom: CustomData | undefined): void;
    getCustomMetadata(index: number): CustomData | undefined;
}
