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
import { Disposable, ObjectMatrix, RefAlias } from '@univerjs/core';
import { FormulaResultStatus, RegisterOtherFormulaService } from '@univerjs/engine-formula';
import { ConditionalFormattingRuleModel } from '../models/conditional-formatting-rule-model';
type IFormulaItem = {
    formulaText: string;
    cfId: string;
    id: string;
    unitId: string;
    subUnitId: string;
    formulaId: string;
};
export declare class ConditionalFormattingFormulaService extends Disposable {
    private _registerOtherFormulaService;
    private _conditionalFormattingRuleModel;
    private _formulaMap;
    private _result$;
    result$: import("rxjs").Observable<IFormulaItem & {
        isAllFinished: boolean;
    }>;
    constructor(_registerOtherFormulaService: RegisterOtherFormulaService, _conditionalFormattingRuleModel: ConditionalFormattingRuleModel);
    private _initRuleChange;
    /**
     * Register formulas for a specific rule based on its type
     */
    private _registerRuleFormulas;
    private _initFormulaResultChange;
    private _ensureSubunitFormulaMap;
    getSubUnitFormulaMap(unitId: string, subUnitId: string): RefAlias<IFormulaItem, "id" | "formulaId"> | undefined;
    registerFormulaWithRange(unitId: string, subUnitId: string, cfId: string, formulaText: string, ranges?: IRange[]): void;
    private _removeFormulaByCfId;
    getFormulaResultWithCoords(unitId: string, subUnitId: string, cfId: string, formulaText: string, row?: number, col?: number): {
        status: FormulaResultStatus;
        result?: undefined;
    } | {
        result: string | number | boolean | void | null | undefined;
        status: FormulaResultStatus;
    };
    getFormulaMatrix(unitId: string, subUnitId: string, cfId: string, formulaText: string): {
        status: FormulaResultStatus;
        result?: undefined;
    } | {
        result: ObjectMatrix<string | number | boolean | void | null | undefined>;
        status: FormulaResultStatus;
    };
    private _getCellValue;
    /**
     * If `formulaText` is not provided, then all caches related to `cfId` will be deleted.
     */
    deleteCache(unitId: string, subUnitId: string, cfId: string, formulaText?: string): IFormulaItem[];
    private _getAllFormulaResultByCfId;
    /**
     * A conditional formatting may have multiple formulas;if the formulas are identical,then the results will be consistent.
     */
    createCFormulaId(cfId: string, formulaText: string): string;
}
export {};
