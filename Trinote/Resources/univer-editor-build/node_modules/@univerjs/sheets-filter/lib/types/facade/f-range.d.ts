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
import { FRange } from '@univerjs/sheets/facade';
import { FFilter } from './f-filter';
/**
 * @ignore
 */
export interface IFRangeSheetsFilterMixin {
    /**
     * Create a filter for the current range. If the worksheet already has a filter, this method would return `null`.
     * @returns {FFilter | null} The FFilter instance to handle the filter.
     * @example
     * ```typescript
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const fWorksheet = fWorkbook.getSheetByName('Sheet1');
     * if (!fWorksheet) return;
     * const fRange = fWorksheet.getRange('A1:D14');
     * let fFilter = fRange.createFilter();
     *
     * // If the worksheet already has a filter, remove it and create a new filter.
     * if (!fFilter) {
     *   fWorksheet.getFilter().remove();
     *   fFilter = fRange.createFilter();
     * }
     * console.log(fFilter, fFilter.getRange().getA1Notation());
     * ```
     */
    createFilter(this: FRange): FFilter | null;
    /**
     * Get the filter in the worksheet to which the range belongs. If the worksheet does not have a filter, this method would return `null`.
     * Normally, you can directly call `getFilter` on {@link FWorksheet}.
     * @returns {FFilter | null} The FFilter instance to handle the filter.
     * @example
     * ```typescript
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const fWorksheet = fWorkbook.getSheetByName('Sheet1');
     * if (!fWorksheet) return;
     * const fRange = fWorksheet.getRange('A1:D14');
     * let fFilter = fRange.getFilter();
     *
     * // If the worksheet does not have a filter, create a new filter.
     * if (!fFilter) {
     *    fFilter = fRange.createFilter();
     * }
     * console.log(fFilter, fFilter.getRange().getA1Notation());
     * ```
     */
    getFilter(): FFilter | null;
}
export declare class FRangeSheetsFilterMixin extends FRange implements IFRangeSheetsFilterMixin {
    createFilter(): FFilter | null;
    /**
     * Get the filter for the current range's worksheet.
     * @returns {FFilter | null} The interface class to handle the filter. If the worksheet does not have a filter,
     * this method would return `null`.
     */
    getFilter(): FFilter | null;
    private _getFilterModel;
}
declare module '@univerjs/sheets/facade' {
    interface FRange extends IFRangeSheetsFilterMixin {
    }
}
