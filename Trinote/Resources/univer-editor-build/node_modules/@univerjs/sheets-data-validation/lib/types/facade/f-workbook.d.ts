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
import type { IDataValidationRule, Nullable, ObjectMatrix } from '@univerjs/core';
import { DataValidationStatus } from '@univerjs/core';
import { SheetDataValidationModel } from '@univerjs/sheets-data-validation';
import { FWorkbook } from '@univerjs/sheets/facade';
export interface IDataValidationError {
    sheetName: string;
    /** The row of the cell that triggered the error */
    row: number;
    column: number;
    /** The ID of the rule that triggered the error */
    ruleId: string;
    /** The input value that triggered the error */
    inputValue: string | number | boolean | null;
    /** The rule content snapshot (optional, to avoid tracing back to the rule after modification) */
    rule?: IDataValidationRule;
}
/**
 * @ignore
 */
export interface IFWorkbookSheetsDataValidationMixin {
    /**
     * Get data validation validator status for current workbook.
     * @returns A promise that resolves to a matrix of validator status.
     * @example
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const status = await fWorkbook.getValidatorStatus();
     * console.log(status);
     * ```
     */
    getValidatorStatus(): Promise<Record<string, ObjectMatrix<Nullable<DataValidationStatus>>>>;
    /**
     * Get all data validation errors for current workbook.
     * @returns A promise that resolves to an array of validation errors.
     * @example
     * ```ts
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const errors = await fWorkbook.getAllDataValidationError();
     * console.log(errors);
     * ```
     */
    getAllDataValidationErrorAsync(): Promise<IDataValidationError[]>;
}
/**
 * @ignore
 */
export declare class FWorkbookSheetsDataValidationMixin extends FWorkbook implements IFWorkbookSheetsDataValidationMixin {
    _dataValidationModel: SheetDataValidationModel;
    _initialize(): void;
    getValidatorStatus(): Promise<Record<string, ObjectMatrix<Nullable<DataValidationStatus>>>>;
    getAllDataValidationErrorAsync(): Promise<IDataValidationError[]>;
    private _collectValidationErrorsForSheet;
    private _collectValidationErrorsForRange;
    private _createDataValidationError;
}
declare module '@univerjs/sheets/facade' {
    interface FWorkbook extends IFWorkbookSheetsDataValidationMixin {
    }
}
