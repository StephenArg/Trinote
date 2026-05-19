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
import type { IRange } from '@univerjs/core';
import type { SpreadsheetSkeleton } from '../sheet.render-skeleton';
import { ComponentExtension } from '../../extension';
export declare enum SHEET_EXTENSION_TYPE {
    GRID = 0
}
/**
 * for distinguish doc & slides extensions, now only used when metric performance.
 */
export declare const SHEET_EXTENSION_PREFIX = "sheet-ext-";
export declare class SheetExtension extends ComponentExtension<SpreadsheetSkeleton, SHEET_EXTENSION_TYPE, IRange[]> {
    type: SHEET_EXTENSION_TYPE;
    isRenderDiffRangesByCell(rangeP: IRange, diffRanges?: IRange[]): boolean;
    isRenderDiffRangesByColumn(curStartColumn: number, curEndColumn: number, diffRanges?: IRange[]): boolean;
    isRenderDiffRangesByRow(curStartRow: number, curEndRow: number, diffRanges?: IRange[]): boolean;
    /**
     * Check if row range is in view ranges
     * @param curStartRow
     * @param curEndRow
     * @param viewranges
     */
    isRowInRanges(curStartRow: number, curEndRow: number, viewranges?: IRange[]): boolean;
}
