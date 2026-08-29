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
import { FWorkbook } from '@univerjs/sheets/facade';
interface IFWorkbookHyperlinkUIMixin {
    /**
     * Navigate to the sheet hyperlink.
     * @param {string} hyperlink - The hyperlink string
     * @example
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const sheets = fWorkbook.getSheets();
     *
     * // Create a hyperlink to the cell F6 in the first sheet
     * const sheet1 = sheets[0];
     * const range = sheet1.getRange('F6');
     * const hyperlink = range.getUrl();
     *
     * // Switch to the second sheet
     * fWorkbook.setActiveSheet(sheets[1]);
     * console.log(fWorkbook.getActiveSheet().getSheetName());
     *
     * // Navigate to the hyperlink after 3 seconds
     * setTimeout(() => {
     *   fWorkbook.navigateToSheetHyperlink(hyperlink);
     *   console.log(fWorkbook.getActiveSheet().getSheetName());
     * }, 3000);
     * ```
     */
    navigateToSheetHyperlink(this: FWorkbook, hyperlink: string): void;
}
declare module '@univerjs/sheets/facade' {
    interface FWorkbook extends IFWorkbookHyperlinkUIMixin {
    }
}
export {};
