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
import type { IObjectModel, IWorksheetProtectionRule } from '../type';
type IRuleChangeType = 'add' | 'set' | 'delete';
export declare class WorksheetProtectionRuleModel {
    /**
     *
     * Map<unitId, Map<subUnitId, Map<subUnitId, IWorksheetProtectionRule>>>
     */
    private _model;
    private _ruleChange;
    private _ruleRefresh;
    private _resetOrder;
    ruleChange$: import("rxjs").Observable<{
        unitId: string;
        subUnitId: string;
        rule: IWorksheetProtectionRule;
        oldRule?: IWorksheetProtectionRule;
        type: IRuleChangeType;
    }>;
    ruleRefresh$: import("rxjs").Observable<string>;
    resetOrder$: import("rxjs").Observable<unknown>;
    private _worksheetRuleInitStateChange;
    worksheetRuleInitStateChange$: import("rxjs").Observable<boolean>;
    changeRuleInitState(state: boolean): void;
    getSheetRuleInitState(): boolean;
    addRule(unitId: string, rule: IWorksheetProtectionRule): void;
    deleteRule(unitId: string, subUnitId: string): void;
    setRule(unitId: string, subUnitId: string, rule: IWorksheetProtectionRule): void;
    getRule(unitId: string, subUnitId: string): IWorksheetProtectionRule | undefined;
    toObject(): IObjectModel;
    fromObject(obj: IObjectModel): void;
    deleteUnitModel(unitId: string): void;
    private _ensureSubUnitMap;
    ruleRefresh(permissionId: string): void;
    resetOrder(): void;
    getTargetByPermissionId(unitId: string, permissionId: string): string[] | null | undefined;
}
export {};
