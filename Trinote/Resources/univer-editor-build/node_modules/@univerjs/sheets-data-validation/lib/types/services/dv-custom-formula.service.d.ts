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
import type { ISheetDataValidationRule } from '@univerjs/core';
import { Disposable, IUniverInstanceService } from '@univerjs/core';
import { DataValidationModel, DataValidatorRegistryService } from '@univerjs/data-validation';
import { RegisterOtherFormulaService } from '@univerjs/engine-formula';
import { DataValidationCacheService } from './dv-cache.service';
interface IFormulaData {
    formula: string;
    originRow: number;
    originCol: number;
    formulaId: string;
}
export declare class DataValidationCustomFormulaService extends Disposable {
    private readonly _instanceSrv;
    private _registerOtherFormulaService;
    private readonly _dataValidationModel;
    private readonly _dataValidationCacheService;
    private readonly _validatorRegistryService;
    /**
     * Map of origin formula of rule
     */
    private _ruleFormulaMap;
    private _ruleFormulaMap2;
    constructor(_instanceSrv: IUniverInstanceService, _registerOtherFormulaService: RegisterOtherFormulaService, _dataValidationModel: DataValidationModel, _dataValidationCacheService: DataValidationCacheService, _validatorRegistryService: DataValidatorRegistryService);
    dispose(): void;
    private _initFormulaResultHandler;
    private _ensureMaps;
    private _registerFormula;
    private _handleDirtyRanges;
    private _initDirtyRanges;
    deleteByRuleId(unitId: string, subUnitId: string, ruleId: string): void;
    private _addFormulaByRange;
    addRule(unitId: string, subUnitId: string, rule: ISheetDataValidationRule): void;
    getCellFormulaValue(unitId: string, subUnitId: string, ruleId: string, row: number, column: number): Promise<import("@univerjs/core").Nullable<import("@univerjs/core").ICellData>>;
    getCellFormula2Value(unitId: string, subUnitId: string, ruleId: string, row: number, column: number): Promise<import("@univerjs/core").Nullable<import("@univerjs/core").ICellData>>;
    getCellFormulaValueSync(unitId: string, subUnitId: string, ruleId: string, row: number, column: number): import("@univerjs/core").Nullable<import("@univerjs/core").ICellData>;
    getCellFormula2ValueSync(unitId: string, subUnitId: string, ruleId: string, row: number, column: number): import("@univerjs/core").Nullable<import("@univerjs/core").ICellData>;
    getRuleFormulaInfo(unitId: string, subUnitId: string, ruleId: string): IFormulaData | undefined;
    makeRuleDirty(unitId: string, subUnitId: string, ruleId: string): void;
}
export {};
