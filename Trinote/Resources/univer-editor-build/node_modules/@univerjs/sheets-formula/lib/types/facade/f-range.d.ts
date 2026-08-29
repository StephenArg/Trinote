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
import type { ISheetFormulaError } from '@univerjs/engine-formula';
import { FRange } from '@univerjs/sheets/facade';
/**
 * @ignore
 */
export interface IFRangeEngineFormulaMixin {
    /**
     * Get formula errors in the current range
     * @returns {ISheetFormulaError[]} Array of formula errors in the range
     * @example
     * ```typescript
     * const fWorksheet = univerAPI.getActiveWorkbook().getSheetByName('Sheet1');
     * if (!fWorksheet) return;
     * const range = fWorksheet.getRange('A1:B10');
     * const errors = range.getFormulaError();
     * console.log('Formula errors in range:', errors);
     * ```
     */
    getFormulaError(): ISheetFormulaError[];
}
/**
 * @ignore
 */
export declare class FRangeEngineFormulaMixin extends FRange implements IFRangeEngineFormulaMixin {
    getFormulaError(): ISheetFormulaError[];
}
declare module '@univerjs/sheets/facade' {
    interface FRange extends IFRangeEngineFormulaMixin {
    }
}
