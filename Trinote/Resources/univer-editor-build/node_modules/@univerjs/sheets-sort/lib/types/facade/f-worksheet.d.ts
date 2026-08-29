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
import { FWorksheet } from '@univerjs/sheets/facade';
/**
 * @ignore
 */
export interface IFWorksheetSortMixin {
    /**
     * Sort the worksheet by the specified column.
     * @param {number} colIndex The column index to sort by.
     * @param {boolean} [asc=true] The sort order. `true` for ascending, `false` for descending. The column A index is 0.
     * @returns {FWorksheet} The worksheet itself for chaining.
     * @example
     * ```typescript
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const fWorksheet = fWorkbook.getSheetByName('Sheet1');
     * if (!fWorksheet) return;
     *
     * // Sorts the worksheet by the column A in ascending order.
     * fWorksheet.sort(0);
     *
     * // Sorts the worksheet by the column A in descending order.
     * fWorksheet.sort(0, false);
     * ```
     */
    sort(colIndex: number, asc?: boolean): FWorksheet;
}
export declare class FWorksheetSortMixin extends FWorksheet implements IFWorksheetSortMixin {
    sort(colIndex: number, asc?: boolean): FWorksheet;
}
declare module '@univerjs/sheets/facade' {
    interface FWorksheet extends IFWorksheetSortMixin {
    }
}
