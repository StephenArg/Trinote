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
/**
 * Options for saving cell images
 */
export interface ISaveCellImagesOptions {
    /**
     * Whether to use cell address in file name (e.g., A1, B2)
     * @default true
     */
    useCellAddress?: boolean;
    /**
     * Column index to use for file name (0-based). If specified, the value from this column will be used in file name.
     */
    useColumnIndex?: number;
}
export interface IFRangeSheetsDrawingUIMixin {
    /**
     * Inserts an image into the current cell.
     *
     * @param {string | File} file File or URL string
     * @returns True if the image is inserted successfully, otherwise false
     * @example
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const fWorksheet = fWorkbook.getSheetByName('Sheet1');
     * if (!fWorksheet) return;
     *
     * // Insert an image into the cell A10
     * const fRange = fWorksheet.getRange('A10');
     * const result = await fRange.insertCellImageAsync('https://avatars.githubusercontent.com/u/61444807?s=48&v=4');
     * console.log(result);
     * ```
     */
    insertCellImageAsync(file: File | string): Promise<boolean>;
    /**
     * Save all cell images in this range to the file system.
     * This method will open a directory picker dialog and save all images to the selected directory.
     *
     * @param {ISaveCellImagesOptions} [options] Options for saving images
     * @returns {Promise<boolean>} True if images are saved successfully, otherwise false
     * @example
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const fWorksheet = fWorkbook.getSheetByName('Sheet1');
     * if (!fWorksheet) return;
     *
     * // Save all cell images in range A1:D10
     * const fRange = fWorksheet.getRange('A1:D10');
     *
     * // Save with default options (using cell address as file name)
     * await fRange.saveCellImagesAsync();
     *
     * // Save with custom options
     * await fRange.saveCellImagesAsync({
     *   useCellAddress: true,
     *   useColumnIndex: 0, // Use values from column A for file names
     * });
     * ```
     */
    saveCellImagesAsync(options?: ISaveCellImagesOptions): Promise<boolean>;
}
export declare class FRangeSheetsDrawingUIMixin extends FRange implements IFRangeSheetsDrawingUIMixin {
    insertCellImageAsync(file: File | string): Promise<boolean>;
    saveCellImagesAsync(options?: ISaveCellImagesOptions): Promise<boolean>;
}
declare module '@univerjs/sheets/facade' {
    interface FRange extends IFRangeSheetsDrawingUIMixin {
    }
}
