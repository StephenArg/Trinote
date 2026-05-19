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
import type { IObjectMatrixPrimitiveType, Nullable } from '../shared';
import type { ICellData, ICellDataWithSpanAndDisplay, IWorksheetData } from './typedef';
/**
 * Fast clone for primitive values and simple objects.
 * Avoids type checking overhead when we know the structure.
 */
export declare function cloneValue<T>(value: T): T;
/**
 * Fast clone for ICellData. Optimized for the known structure.
 * @param cell - The cell data to clone
 * @returns A deep clone of the cell data
 */
export declare function cloneCellData(cell: Nullable<ICellData>): Nullable<ICellData>;
/**
 * Fast clone for ICellDataWithSpanAndDisplay. Optimized for the known structure.
 * This extends cloneCellData with additional span and display properties.
 * @param cell - The cell data with span and display info to clone
 * @returns A deep clone of the cell data
 */
export declare function cloneCellDataWithSpanAndDisplay(cell: Nullable<ICellDataWithSpanAndDisplay>): Nullable<ICellDataWithSpanAndDisplay>;
/**
 * Fast clone for cell data matrix. Optimized for sparse matrix structure.
 * @param cellData - The cell data matrix to clone
 * @returns A deep clone of the cell data matrix
 */
export declare function cloneCellDataMatrix(cellData: IObjectMatrixPrimitiveType<ICellData>): IObjectMatrixPrimitiveType<ICellData>;
/**
 * Optimized deep clone specifically for IWorksheetData.
 * This is significantly faster than generic deepClone because:
 * 1. No recursive type checking - we know the structure
 * 2. Direct property access instead of Object.keys iteration for known properties
 * 3. Specialized handlers for cellData matrix (the largest data)
 * 4. Primitive values copied directly without cloning
 *
 * @param worksheet - The worksheet data to clone
 * @returns A deep clone of the worksheet data
 */
export declare function cloneWorksheetData(worksheet: IWorksheetData): IWorksheetData;
