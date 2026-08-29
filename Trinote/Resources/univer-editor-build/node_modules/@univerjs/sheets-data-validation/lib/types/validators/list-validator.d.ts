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
import type { CellValue, DataValidationOperator, ICellData, IDataValidationRule, ISheetDataValidationRule, IStyleData, Nullable } from '@univerjs/core';
import type { IFormulaResult, IFormulaValidResult, IValidatorCellInfo } from '@univerjs/data-validation';
import { LexerTreeBuilder } from '@univerjs/engine-formula';
import { DataValidationFormulaService } from '../services/dv-formula.service';
import { BaseSheetValidator } from './base-sheet-validator';
export declare function getRuleFormulaResultSet(result: Nullable<Nullable<ICellData>[][]>): string[];
export declare function isValidListFormula(formula: string, lexer: LexerTreeBuilder): boolean | undefined;
export declare class ListValidator extends BaseSheetValidator {
    protected formulaService: DataValidationFormulaService;
    private _lexer;
    private _univerInstanceService;
    private _listCacheService;
    order: number;
    readonly offsetFormulaByRange = false;
    id: string;
    title: string;
    operators: DataValidationOperator[];
    scopes: string | string[];
    skipDefaultFontRender: (rule: ISheetDataValidationRule) => boolean;
    validatorFormula(rule: IDataValidationRule, unitId: string, subUnitId: string): IFormulaValidResult;
    getExtraStyle(rule: IDataValidationRule, value: Nullable<CellValue>, { style: defaultStyle }: {
        style: IStyleData;
    }): Nullable<IStyleData>;
    parseCellValue(cellValue: CellValue): string[];
    parseFormula(rule: IDataValidationRule, unitId: string, subUnitId: string): Promise<IFormulaResult<number | undefined>>;
    isValidType(cellInfo: IValidatorCellInfo<Nullable<CellValue>>, formula: IFormulaResult<string[] | undefined>, rule: IDataValidationRule): Promise<boolean>;
    generateRuleName(): string;
    generateRuleErrorMessage(): string;
    private _getUnitAndSubUnit;
    getList(rule: IDataValidationRule, currentUnitId?: string, currentSubUnitId?: string): string[];
    getListAsync(rule: IDataValidationRule, currentUnitId?: string, currentSubUnitId?: string): Promise<string[]>;
    getListWithColor(rule: IDataValidationRule, currentUnitId?: string, currentSubUnitId?: string): Array<{
        label: string;
        color: string;
    }>;
    getListWithColorMap(rule: IDataValidationRule, currentUnitId?: string, currentSubUnitId?: string): Record<string, string>;
}
