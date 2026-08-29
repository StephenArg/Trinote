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
import type { Injector } from '@univerjs/core';
import { FUniver } from '@univerjs/core/facade';
import { FDataValidationBuilder } from './f-data-validation-builder';
/**
 * @ignore
 */
export interface IFUniverSheetsDataValidationMixin {
    /**
     * Creates a new instance of FDataValidationBuilder
     * @returns {FDataValidationBuilder} A new instance of the FDataValidationBuilder class
     * @example
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const fWorksheet = fWorkbook.getSheetByName('Sheet1');
     * if (!fWorksheet) return;
     *
     * // Create a new data validation rule that requires a number between 1 and 10 fot the range A1:B10
     * const fRange = fWorksheet.getRange('A1:B10');
     * const rule = univerAPI.newDataValidation()
     *   .requireNumberBetween(1, 10)
     *   .setOptions({
     *     allowBlank: true,
     *     showErrorMessage: true,
     *     error: 'Please enter a number between 1 and 10'
     *   })
     *   .build();
     * fRange.setDataValidation(rule);
     * ```
     */
    newDataValidation(): FDataValidationBuilder;
}
export declare class FUniverSheetsDataValidationMixin extends FUniver implements IFUniverSheetsDataValidationMixin {
    /**
     * @deprecated use `univerAPI.newDataValidation()` as instead.
     * @returns {FDataValidationBuilder} A new instance of the FDataValidationBuilder class
     */
    static newDataValidation(): FDataValidationBuilder;
    newDataValidation(): FDataValidationBuilder;
    /**
     * @ignore
     */
    _initialize(injector: Injector): void;
}
declare module '@univerjs/core/facade' {
    /**
     * @ignore
     */
    namespace FUniver {
        /**
         * @deprecated use `univerAPI.newDataValidation()` as instead.
         * @returns {FDataValidationBuilder} A new instance of the FDataValidationBuilder class
         */
        function newDataValidation(): FDataValidationBuilder;
    }
    interface FUniver extends IFUniverSheetsDataValidationMixin {
    }
}
