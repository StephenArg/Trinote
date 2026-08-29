import type { IDimensionOutline } from '@univerjs-pro/sheets-outline';
import { DimensionOutlineAxis } from '@univerjs-pro/sheets-outline';
import { FWorksheet } from '@univerjs/sheets/facade';
/**
 * @ignore
 */
export interface IFWorksheetOutlineMixin {
    /**
     * @description Add a row outline group to the current worksheet.
     *
     * The row index is zero-based. The group covers `numRows` rows starting at
     * `startRow`, so `addRowOutline(1, 3)` groups rows 2 to 4.
     * Invalid groups are ignored and will not be added, including negative ranges,
     * zero or negative row counts, ranges outside the worksheet, crossing groups,
     * and groups that exceed the maximum outline depth.
     *
     * @param {number} startRow The zero-based start row index of the outline group.
     * @param {number} numRows The number of rows included in the outline group.
     * @returns {FWorksheet} The current worksheet instance, allowing chained facade calls.
     *
     * @example
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const fWorksheet = fWorkbook.getSheetByName('Sheet1');
     * if (!fWorksheet) return;
     *
     * // Group rows 2 to 6.
     * fWorksheet.addRowOutline(1, 5);
     * ```
     *
     * @example
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const fWorksheet = fWorkbook.getSheetByName('Sheet1');
     * if (!fWorksheet) return;
     *
     * // Facade methods return the worksheet, so calls can be chained.
     * fWorksheet
     *   .addRowOutline(1, 5)
     *   .addRowOutline(2, 2);
     * ```
     */
    addRowOutline(startRow: number, numRows: number): FWorksheet;
    /**
     * @description Add a column outline group to the current worksheet.
     *
     * The column index is zero-based. The group covers `numColumns` columns starting at
     * `startColumn`, so `addColumnOutline(0, 3)` groups columns A to C.
     * Invalid groups are ignored and will not be added, including negative ranges,
     * zero or negative column counts, ranges outside the worksheet, crossing groups,
     * and groups that exceed the maximum outline depth.
     *
     * @param {number} startColumn The zero-based start column index of the outline group.
     * @param {number} numColumns The number of columns included in the outline group.
     * @returns {FWorksheet} The current worksheet instance, allowing chained facade calls.
     *
     * @example
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const fWorksheet = fWorkbook.getSheetByName('Sheet1');
     * if (!fWorksheet) return;
     *
     * // Group columns B to E.
     * fWorksheet.addColumnOutline(1, 4);
     * ```
     */
    addColumnOutline(startColumn: number, numColumns: number): FWorksheet;
    /**
     * @description Remove a row or column outline group from the current worksheet.
     *
     * Use `getDimensionOutlines()` to read the current outline ids. Removing a parent outline
     * does not remove unrelated sibling outlines.
     *
     * @param {string} outlineId The id of the outline group to remove.
     * @returns {FWorksheet} The current worksheet instance, allowing chained facade calls.
     *
     * @example
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const fWorksheet = fWorkbook.getSheetByName('Sheet1');
     * if (!fWorksheet) return;
     *
     * const [firstRowOutline] = fWorksheet.getDimensionOutlines(univerAPI.Enum.DimensionOutlineAxis.ROW);
     * if (firstRowOutline) {
     *   fWorksheet.removeDimensionOutline(firstRowOutline.id);
     * }
     * ```
     */
    removeDimensionOutline(outlineId: string): FWorksheet;
    /**
     * @description Collapse or expand an existing row or column outline group.
     *
     * Pass `true` to collapse the group and hide its grouped rows or columns. Pass `false`
     * to expand it and show the grouped rows or columns again, subject to other nested
     * collapsed groups.
     *
     * @param {string} outlineId The id of the outline group to update.
     * @param {boolean} collapsed Whether the outline group should be collapsed.
     * @returns {FWorksheet} The current worksheet instance, allowing chained facade calls.
     *
     * @example
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const fWorksheet = fWorkbook.getSheetByName('Sheet1');
     * if (!fWorksheet) return;
     *
     * const [firstColumnOutline] = fWorksheet.getDimensionOutlines(univerAPI.Enum.DimensionOutlineAxis.COLUMN);
     * if (firstColumnOutline) {
     *   // Collapse the group.
     *   fWorksheet.setDimensionOutlineCollapsed(firstColumnOutline.id, true);
     *
     *   // Expand it later.
     *   fWorksheet.setDimensionOutlineCollapsed(firstColumnOutline.id, false);
     * }
     * ```
     */
    setDimensionOutlineCollapsed(outlineId: string, collapsed: boolean): FWorksheet;
    /**
     * @description Clear outline groups in a row or column range.
     *
     * The range uses zero-based indexes and is inclusive: `[start, end]`. Only outline
     * groups on the specified axis whose ranges are fully contained in this range are removed.
     *
     * @param {DimensionOutlineAxis} axis The outline axis to clear.
     * @param {number} start The zero-based inclusive start index of the clear range.
     * @param {number} end The zero-based inclusive end index of the clear range.
     * @returns {FWorksheet} The current worksheet instance, allowing chained facade calls.
     *
     * @example
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const fWorksheet = fWorkbook.getSheetByName('Sheet1');
     * if (!fWorksheet) return;
     *
     * // Remove row outline groups fully contained in rows 2 to 10.
     * fWorksheet.clearDimensionOutlines(univerAPI.Enum.DimensionOutlineAxis.ROW, 1, 9);
     * ```
     */
    clearDimensionOutlines(axis: DimensionOutlineAxis, start: number, end: number): FWorksheet;
    /**
     * @description Get outline groups on the current worksheet.
     *
     * When `axis` is omitted, both row and column outline groups are returned. The returned
     * array is a snapshot of the current outline data; use command or facade methods to make
     * changes instead of mutating the returned objects directly.
     *
     * @param {DimensionOutlineAxis} [axis] Optional outline axis filter.
     * @returns {IDimensionOutline[]} The outline groups on the current worksheet.
     *
     * @example
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const fWorksheet = fWorkbook.getSheetByName('Sheet1');
     * if (!fWorksheet) return;
     *
     * const rowOutlines = fWorksheet.getDimensionOutlines(univerAPI.Enum.DimensionOutlineAxis.ROW);
     * rowOutlines.forEach((outline) => {
     *   console.log(outline.id, outline.start, outline.end, outline.collapsed);
     * });
     * ```
     *
     * @example
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const fWorksheet = fWorkbook.getSheetByName('Sheet1');
     * if (!fWorksheet) return;
     *
     * const allOutlines = fWorksheet.getDimensionOutlines();
     * const collapsedOutlines = allOutlines.filter((outline) => outline.collapsed);
     * console.log('Collapsed outlines:', collapsedOutlines);
     * ```
     */
    getDimensionOutlines(axis?: DimensionOutlineAxis): IDimensionOutline[];
}
export declare class FWorksheetOutlineMixin extends FWorksheet implements IFWorksheetOutlineMixin {
    addRowOutline(startRow: number, numRows: number): FWorksheet;
    addColumnOutline(startColumn: number, numColumns: number): FWorksheet;
    removeDimensionOutline(outlineId: string): FWorksheet;
    setDimensionOutlineCollapsed(outlineId: string, collapsed: boolean): FWorksheet;
    clearDimensionOutlines(axis: DimensionOutlineAxis, start: number, end: number): FWorksheet;
    getDimensionOutlines(axis?: DimensionOutlineAxis): IDimensionOutline[];
    private _addDimensionOutline;
}
declare module '@univerjs/sheets/facade' {
    interface FWorksheet extends IFWorksheetOutlineMixin {
    }
}
