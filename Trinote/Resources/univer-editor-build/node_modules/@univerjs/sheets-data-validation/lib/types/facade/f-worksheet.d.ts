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
import type { Nullable, ObjectMatrix } from '@univerjs/core';
import type { IDataValidationError } from './f-workbook';
import { DataValidationStatus } from '@univerjs/core';
import { FWorksheet } from '@univerjs/sheets/facade';
import { FDataValidation } from './f-data-validation';
/**
 * @ignore
 */
export interface IFWorksheetDataValidationMixin {
    /**
     * Get all data validation rules in current sheet.
     * @returns {FDataValidation[]} All data validation rules
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const fWorksheet = fWorkbook.getSheetByName('Sheet1');
     * if (!fWorksheet) return;
     * const rules = fWorksheet.getDataValidations();
     * console.log(rules);
     * ```
     */
    getDataValidations(): FDataValidation[];
    /**
     * Get data validation validator status for current sheet.
     * @returns {Promise<ObjectMatrix<Nullable<DataValidationStatus>>>} matrix of validator status
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const fWorksheet = fWorkbook.getSheetByName('Sheet1');
     * if (!fWorksheet) return;
     * const status = await fWorksheet.getValidatorStatusAsync();
     * console.log(status);
     * ```
     */
    getValidatorStatusAsync(): Promise<ObjectMatrix<Nullable<DataValidationStatus>>>;
    /**
     * get data validation rule by rule id
     * @param ruleId - the rule id
     * @returns {Nullable<FDataValidation>} data validation rule
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const fWorksheet = fWorkbook.getSheetByName('Sheet1');
     * if (!fWorksheet) return;
     * const rules = fWorksheet.getDataValidations();
     * console.log(fWorksheet.getDataValidation(rules[0]?.rule.uid));
     * ```
     */
    getDataValidation(ruleId: string): Nullable<FDataValidation>;
    /**
     * Get all data validation errors for current worksheet.
     * @returns A promise that resolves to an array of validation errors.
     * @example
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const fWorksheet = fWorkbook.getSheetByName('Sheet1');
     * if (!fWorksheet) return;
     * const errors = await fWorksheet.getAllDataValidationError();
     * console.log(errors);
     * ```
     */
    getAllDataValidationErrorAsync(): Promise<IDataValidationError[]>;
}
/**
 * @ignore
 */
export declare class FWorksheetDataValidationMixin extends FWorksheet implements IFWorksheetDataValidationMixin {
    getDataValidations(): FDataValidation[];
    getValidatorStatusAsync(): Promise<ObjectMatrix<Nullable<DataValidationStatus>>>;
    getDataValidation(ruleId: string): Nullable<FDataValidation>;
    getAllDataValidationErrorAsync(): Promise<IDataValidationError[]>;
    private _collectValidationErrorsForSheet;
    private _collectValidationErrorsForRange;
    private _createDataValidationError;
}
declare module '@univerjs/sheets/facade' {
    interface FWorksheet extends IFWorksheetDataValidationMixin {
    }
}
