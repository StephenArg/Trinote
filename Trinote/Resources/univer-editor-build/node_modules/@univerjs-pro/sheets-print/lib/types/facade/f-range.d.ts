import { FRange } from '@univerjs/sheets/facade';
/**
 * Options for range screenshot.
 */
export interface IRangeScreenshotOptions {
    /** Whether to include row and column headers in the screenshot. Default is false. */
    includeHeaders?: boolean;
}
/**
 * @ignore
 */
export interface IFRangeSheetsPrint {
    /**
     * Get screenshot of this range.
     * This API is only available with a license. Users without a license will face usage restrictions. On failure, it returns false, and on success, it returns the image's base64 string.
     * @param options - Screenshot options.
     * @returns {string | false} - The base64 encoded image string, or false if the user does not have permission.
     *
     * @example
     * ``` ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const fWorksheet = fWorkbook.getSheetByName('Sheet1');
     * if (!fWorksheet) return;
     * const fRange = fWorksheet.getRange('A1:D10');
     * // Screenshot without headers
     * console.log(fRange.getScreenshot());
     * // Screenshot with row and column headers
     * console.log(fRange.getScreenshot({ includeHeaders: true }));
     * ```
     */
    getScreenshot(options?: IRangeScreenshotOptions): string | false;
}
export declare class FRangeSheetsPrint extends FRange implements IFRangeSheetsPrint {
    getScreenshot(options?: IRangeScreenshotOptions): string | false;
}
declare module '@univerjs/sheets/facade' {
    interface FRange extends IFRangeSheetsPrint {
    }
}
