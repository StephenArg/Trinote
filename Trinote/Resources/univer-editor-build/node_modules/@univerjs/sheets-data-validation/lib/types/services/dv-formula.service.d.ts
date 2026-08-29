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
import type { ISheetDataValidationRule, Nullable } from '@univerjs/core';
import type { IFormulaInfo, IOtherFormulaResult } from '@univerjs/engine-formula';
import { Disposable, IUniverInstanceService } from '@univerjs/core';
import { DataValidationModel, DataValidatorRegistryService } from '@univerjs/data-validation';
import { RegisterOtherFormulaService } from '@univerjs/engine-formula';
import { DataValidationCacheService } from './dv-cache.service';
import { DataValidationListCacheService } from './dv-list-cache.service';
export declare class DataValidationFormulaService extends Disposable {
    private readonly _instanceService;
    private _registerOtherFormulaService;
    private readonly _dataValidationCacheService;
    private readonly _dataValidationModel;
    private readonly _validatorRegistryService;
    private readonly _listCacheService;
    private _formulaRuleMap;
    constructor(_instanceService: IUniverInstanceService, _registerOtherFormulaService: RegisterOtherFormulaService, _dataValidationCacheService: DataValidationCacheService, _dataValidationModel: DataValidationModel, _validatorRegistryService: DataValidatorRegistryService, _listCacheService: DataValidationListCacheService);
    private _initFormulaResultHandler;
    private _ensureRuleFormulaMap;
    private _registerSingleFormula;
    addRule(unitId: string, subUnitId: string, rule: ISheetDataValidationRule): void;
    removeRule(unitId: string, subUnitId: string, ruleId: string): void;
    getRuleFormulaResult(unitId: string, subUnitId: string, ruleId: string): Promise<Nullable<[Nullable<IOtherFormulaResult>, Nullable<IOtherFormulaResult>]>>;
    getRuleFormulaResultSync(unitId: string, subUnitId: string, ruleId: string): Nullable<IOtherFormulaResult>[] | undefined;
    getRuleFormulaInfo(unitId: string, subUnitId: string, ruleId: string): [IFormulaInfo | undefined, IFormulaInfo | undefined] | undefined;
}
