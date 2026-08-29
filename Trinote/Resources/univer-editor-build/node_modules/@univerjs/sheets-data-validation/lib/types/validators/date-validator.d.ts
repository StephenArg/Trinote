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
import type { CellValue, IDataValidationRule, IDataValidationRuleBase } from '@univerjs/core';
import type { IFormulaResult, IFormulaValidResult, IValidatorCellInfo } from '@univerjs/data-validation';
import type { ISheetLocationBase } from '@univerjs/sheets';
import { DataValidationOperator } from '@univerjs/core';
import { BaseSheetValidator } from './base-sheet-validator';
export declare class DateValidator extends BaseSheetValidator {
    id: string;
    title: string;
    order: number;
    operators: DataValidationOperator[];
    scopes: string | string[];
    private readonly _customFormulaService;
    private readonly _lexerTreeBuilder;
    parseFormula(rule: IDataValidationRule, unitId: string, subUnitId: string, row: number, column: number): Promise<IFormulaResult<number | undefined>>;
    isValidType(info: IValidatorCellInfo): Promise<boolean>;
    private _validatorSingleFormula;
    validatorFormula(rule: IDataValidationRule, unitId: string, subUnitId: string): IFormulaValidResult;
    normalizeFormula(rule: IDataValidationRule, _unitId: string, _subUnitId: string): {
        formula1: string | undefined;
        formula2: string | undefined;
    };
    transform(cellInfo: IValidatorCellInfo<CellValue>, _formula: IFormulaResult, _rule: IDataValidationRule): IValidatorCellInfo<number>;
    get operatorNames(): string[];
    generateRuleName(rule: IDataValidationRuleBase): string;
    generateRuleErrorMessage(rule: IDataValidationRuleBase, pos: ISheetLocationBase): string;
}
