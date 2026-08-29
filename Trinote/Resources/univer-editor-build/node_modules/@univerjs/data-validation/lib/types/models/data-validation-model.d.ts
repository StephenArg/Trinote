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
import type { IDataValidationRule } from '@univerjs/core';
import type { IUpdateRulePayload } from '../types/interfaces/i-update-rule-payload';
import { Disposable, ILogService } from '@univerjs/core';
export type DataValidationChangeType = 'update' | 'add' | 'remove';
export type DataValidationChangeSource = 'command' | 'patched';
export interface IRuleChange {
    rule: IDataValidationRule;
    type: DataValidationChangeType;
    unitId: string;
    subUnitId: string;
    source: DataValidationChangeSource;
    updatePayload?: IUpdateRulePayload;
    oldRule?: IDataValidationRule;
}
export declare class DataValidationModel extends Disposable {
    private readonly _logService;
    private readonly _model;
    private readonly _ruleChange$;
    ruleChange$: import("rxjs").Observable<IRuleChange>;
    ruleChangeDebounce$: import("rxjs").Observable<IRuleChange>;
    constructor(_logService: ILogService);
    private _ensureMap;
    private _addSubUnitRule;
    private _removeSubUnitRule;
    private _updateSubUnitRule;
    private _addRuleSideEffect;
    addRule(unitId: string, subUnitId: string, rule: IDataValidationRule | IDataValidationRule[], source: DataValidationChangeSource, index?: number): void;
    updateRule(unitId: string, subUnitId: string, ruleId: string, payload: IUpdateRulePayload, source: DataValidationChangeSource): void;
    removeRule(unitId: string, subUnitId: string, ruleId: string, source: DataValidationChangeSource): void;
    getRuleById(unitId: string, subUnitId: string, ruleId: string): IDataValidationRule | undefined;
    getRuleIndex(unitId: string, subUnitId: string, ruleId: string): number;
    getRules(unitId: string, subUnitId: string): IDataValidationRule[];
    getUnitRules(unitId: string): [string, IDataValidationRule[]][];
    deleteUnitRules(unitId: string): void;
    getSubUnitIds(unitId: string): string[];
    getAll(): (readonly [string, [string, IDataValidationRule[]][]])[];
}
