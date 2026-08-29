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
import type { CellValue, IDataValidationRule, IDataValidationRuleBase, Nullable } from '@univerjs/core';
import type { IFormulaResult, IFormulaValidResult, IValidatorCellInfo } from '@univerjs/data-validation';
import type { ISheetLocationBase } from '@univerjs/sheets';
import { DataValidationOperator } from '@univerjs/core';
import { BaseSheetValidator } from './base-sheet-validator';
export declare class WholeValidator extends BaseSheetValidator {
    private readonly _customFormulaService;
    private readonly _lexerTreeBuilder;
    id: string;
    title: string;
    order: number;
    operators: DataValidationOperator[];
    scopes: string | string[];
    private _isFormulaOrInt;
    isValidType(cellInfo: IValidatorCellInfo<CellValue>, _formula: IFormulaResult, _rule: IDataValidationRule): Promise<boolean>;
    transform(cellInfo: IValidatorCellInfo<CellValue>, _formula: IFormulaResult, _rule: IDataValidationRule): {
        value: number;
        interceptValue: Nullable<CellValue>;
        row: number;
        column: number;
        unitId: string;
        subUnitId: string;
        worksheet: import("@univerjs/core").Worksheet;
        workbook: import("@univerjs/core").Workbook;
        t: Nullable<import("@univerjs/protocol").CellValueType>;
    };
    private _parseNumber;
    parseFormula(rule: IDataValidationRule, unitId: string, subUnitId: string, row: number, column: number): Promise<IFormulaResult>;
    validatorFormula(rule: IDataValidationRuleBase, _unitId: string, _subUnitId: string): IFormulaValidResult;
    generateRuleErrorMessage(rule: IDataValidationRuleBase, position: ISheetLocationBase): string;
}
