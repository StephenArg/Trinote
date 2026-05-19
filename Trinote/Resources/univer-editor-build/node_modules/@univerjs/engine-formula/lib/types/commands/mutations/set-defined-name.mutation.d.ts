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
export interface ISetDefinedNameMutationSearchParam {
    unitId: string;
    id: string;
}
export interface ISetDefinedNameMutationParam extends ISetDefinedNameMutationSearchParam {
    name: string;
    formulaOrRefString: string;
    comment?: string;
    localSheetId?: string;
    hidden?: boolean;
    formulaOrRefStringWithPrefix?: string;
}
/**
 * Generate undo mutation of a `SetDefinedNameMutation`
 */
export declare const SetDefinedNameMutationFactory: (accessor: IAccessor, params: ISetDefinedNameMutationParam) => ISetDefinedNameMutationParam | null;
/**
 * In the formula engine, the mutation is solely responsible for communication between the worker and the main thread.
 * It requires setting local to true during execution.
 */
export declare const SetDefinedNameMutation: IMutation<ISetDefinedNameMutationParam>;
export declare const RemoveDefinedNameMutation: IMutation<ISetDefinedNameMutationParam>;
