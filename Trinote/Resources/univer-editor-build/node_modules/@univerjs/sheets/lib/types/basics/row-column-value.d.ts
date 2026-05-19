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
import type { IColumnData, IRowData, Nullable } from '@univerjs/core';
/**
 * Reset the row data to undefined when undoing the operation
 * @param currentRow
 * @returns
 */
export declare function getOldRowData(currentRow: Nullable<Partial<IRowData>>, newRow: Nullable<Partial<IRowData>>): Nullable<Partial<IRowData>>;
/**
 * Reset the column data to undefined when undoing the operation
 * @param currenColumn
 * @param newColumn
 * @returns
 */
export declare function getOldColumnData(currenColumn: Nullable<Partial<IColumnData>>, newColumn: Nullable<Partial<IColumnData>>): Nullable<Partial<IColumnData>>;
