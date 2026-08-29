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
import type { IAccessor, IMutation } from '@univerjs/core';
import type { IConditionFormattingRule } from '../../models/type';
import type { IDeleteConditionalRuleMutationParams } from './delete-conditional-rule.mutation';
export interface IAddConditionalRuleMutationParams {
    unitId: string;
    subUnitId: string;
    rule: IConditionFormattingRule;
}
export declare const AddConditionalRuleMutationUndoFactory: (accessor: IAccessor, param: IAddConditionalRuleMutationParams) => {
    id: string;
    params: IDeleteConditionalRuleMutationParams;
};
export declare const AddConditionalRuleMutation: IMutation<IAddConditionalRuleMutationParams>;
