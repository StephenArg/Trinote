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
import type { DataValidationType, ISheetDataValidationRule } from '@univerjs/core';
import type { IRuleChange } from '@univerjs/data-validation';
import type { ISheetLocation } from '@univerjs/sheets';
import { DataValidationStatus, Disposable, ICommandService, IUniverInstanceService } from '@univerjs/core';
import { DataValidationModel, DataValidatorRegistryService } from '@univerjs/data-validation';
import { DataValidationCacheService } from '../services/dv-cache.service';
import { DataValidationCustomFormulaService } from '../services/dv-custom-formula.service';
import { DataValidationFormulaService } from '../services/dv-formula.service';
import { RuleMatrix } from './rule-matrix';
export interface IValidStatusChange {
    unitId: string;
    subUnitId: string;
    row: number;
    col: number;
    ruleId: string;
    status: DataValidationStatus;
}
export declare class SheetDataValidationModel extends Disposable {
    private readonly _dataValidationModel;
    private readonly _univerInstanceService;
    private _dataValidatorRegistryService;
    private _dataValidationCacheService;
    private _dataValidationFormulaService;
    private _dataValidationCustomFormulaService;
    private readonly _commandService;
    private readonly _ruleMatrixMap;
    private readonly _validStatusChange$;
    private readonly _ruleChange$;
    readonly ruleChange$: import("rxjs").Observable<IRuleChange>;
    readonly validStatusChange$: import("rxjs").Observable<IValidStatusChange>;
    constructor(_dataValidationModel: DataValidationModel, _univerInstanceService: IUniverInstanceService, _dataValidatorRegistryService: DataValidatorRegistryService, _dataValidationCacheService: DataValidationCacheService, _dataValidationFormulaService: DataValidationFormulaService, _dataValidationCustomFormulaService: DataValidationCustomFormulaService, _commandService: ICommandService);
    private _initUniverInstanceListener;
    private _initRuleUpdateListener;
    private _ensureRuleMatrix;
    private _addRuleSideEffect;
    private _addRule;
    private _updateRule;
    private _removeRule;
    getValidator(type: DataValidationType | string): import("@univerjs/data-validation").BaseDataValidator | undefined;
    getRuleIdByLocation(unitId: string, subUnitId: string, row: number, col: number): string | undefined;
    getRuleByLocation(unitId: string, subUnitId: string, row: number, col: number): ISheetDataValidationRule | undefined;
    validator(rule: ISheetDataValidationRule, pos: ISheetLocation, _onCompete?: (status: DataValidationStatus, changed: boolean) => void): DataValidationStatus;
    getRuleObjectMatrix(unitId: string, subUnitId: string): RuleMatrix;
    getRuleById(unitId: string, subUnitId: string, ruleId: string): ISheetDataValidationRule | undefined;
    getRuleIndex(unitId: string, subUnitId: string, ruleId: string): number;
    getRules(unitId: string, subUnitId: string): ISheetDataValidationRule[];
    getUnitRules(unitId: string): [string, ISheetDataValidationRule[]][];
    deleteUnitRules(unitId: string): void;
    getSubUnitIds(unitId: string): string[];
    getAll(): (readonly [string, [string, import("@univerjs/core").IDataValidationRule[]][]])[];
}
