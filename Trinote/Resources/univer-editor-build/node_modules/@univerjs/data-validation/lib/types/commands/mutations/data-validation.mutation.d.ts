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
import type { ICommand, IDataValidationRule } from '@univerjs/core';
import type { DataValidationChangeSource } from '../../models/data-validation-model';
import type { IUpdateRulePayload } from '../../types/interfaces/i-update-rule-payload';
export interface IAddDataValidationMutationParams {
    rule: IDataValidationRule | IDataValidationRule[];
    index?: number;
    source?: DataValidationChangeSource;
    unitId: string;
    subUnitId: string;
}
export declare const AddDataValidationMutation: ICommand<IAddDataValidationMutationParams>;
export interface IRemoveDataValidationMutationParams {
    ruleId: string | string[];
    source?: DataValidationChangeSource;
    unitId: string;
    subUnitId: string;
}
export declare const RemoveDataValidationMutation: ICommand<IRemoveDataValidationMutationParams>;
export interface IUpdateDataValidationMutationParams {
    payload: IUpdateRulePayload;
    ruleId: string;
    source?: DataValidationChangeSource;
    unitId: string;
    subUnitId: string;
}
export declare const UpdateDataValidationMutation: ICommand<IUpdateDataValidationMutationParams>;
