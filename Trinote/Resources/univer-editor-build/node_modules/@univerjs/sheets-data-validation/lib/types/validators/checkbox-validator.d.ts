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
import type { CellValue, DataValidationOperator, IDataValidationRule, IDataValidationRuleBase, ISheetDataValidationRule, Nullable } from '@univerjs/core';
import type { IFormulaResult, IFormulaValidResult, IValidatorCellInfo } from '@univerjs/data-validation';
import { WrapStrategy } from '@univerjs/core';
import { BaseSheetValidator } from './base-sheet-validator';
export declare const CHECKBOX_FORMULA_1 = 1;
export declare const CHECKBOX_FORMULA_2 = 0;
interface ICheckboxFormulaResult extends IFormulaResult {
    originFormula1: Nullable<CellValue>;
    originFormula2: Nullable<CellValue>;
}
export declare const transformCheckboxValue: (value: Nullable<CellValue>) => Nullable<CellValue>;
export declare class CheckboxValidator extends BaseSheetValidator {
    id: string;
    title: string;
    operators: DataValidationOperator[];
    scopes: string | string[];
    order: number;
    readonly offsetFormulaByRange = false;
    private _formulaService;
    skipDefaultFontRender: (rule: ISheetDataValidationRule, cellValue: Nullable<CellValue>, pos: {
        unitId: string;
        subUnitId: string;
        row: number;
        column: number;
    }) => boolean;
    validatorFormula(rule: IDataValidationRule, unitId: string, subUnitId: string): IFormulaValidResult;
    parseFormula(rule: IDataValidationRule, unitId: string, subUnitId: string): Promise<ICheckboxFormulaResult>;
    getExtraStyle(rule: IDataValidationRule, value: Nullable<CellValue>): {
        tb: WrapStrategy;
    };
    parseFormulaSync(rule: IDataValidationRule, unitId: string, subUnitId: string): ICheckboxFormulaResult;
    isValidType(cellInfo: IValidatorCellInfo<CellValue>, formula: IFormulaResult, rule: IDataValidationRule): Promise<boolean>;
    generateRuleErrorMessage(rule: IDataValidationRuleBase): string;
    generateRuleName(rule: IDataValidationRuleBase): string;
}
export {};
