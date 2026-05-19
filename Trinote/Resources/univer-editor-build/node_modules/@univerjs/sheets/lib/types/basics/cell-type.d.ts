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
import type { CellValue, ICellData, Nullable, Styles } from '@univerjs/core';
import { CellValueType } from '@univerjs/core';
/**
 * Get cell value type by style, new value and old value.
 * If the new value contains t, then take t directly. In other cases, we need to dynamically determine based on actual data and styles
 * @param newVal
 * @param oldVal
 * @returns
 */
export declare function getCellType(styles: Styles, newVal: ICellData, oldVal: ICellData): void | CellValueType | null;
/**
 * Get the correct type after setting values to a cell.
 *
 * @param v the new value
 * @param type the old type
 * @returns the new type
 */
export declare function checkCellValueType(v: Nullable<CellValue>, type: Nullable<CellValueType>): Nullable<CellValueType>;
export declare function getCellTypeByPattern(cell: ICellData, pattern: string): Nullable<CellValueType>;
