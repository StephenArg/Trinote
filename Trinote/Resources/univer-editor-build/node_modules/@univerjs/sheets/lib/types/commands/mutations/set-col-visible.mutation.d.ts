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
import type { IAccessor, IMutation, IRange } from '@univerjs/core';
export interface ISetColHiddenMutationParams {
    unitId: string;
    subUnitId: string;
    ranges: IRange[];
}
export declare const SetColHiddenUndoMutationFactory: (accessor: IAccessor, params: ISetColHiddenMutationParams) => {
    unitId: string;
    subUnitId: string;
    ranges: IRange[];
};
export declare const SetColHiddenMutation: IMutation<ISetColHiddenMutationParams>;
export interface ISetColVisibleMutationParams {
    unitId: string;
    subUnitId: string;
    ranges: IRange[];
}
export declare const SetColVisibleUndoMutationFactory: (accessor: IAccessor, params: ISetColVisibleMutationParams) => {
    unitId: string;
    subUnitId: string;
    ranges: IRange[];
};
export declare const SetColVisibleMutation: IMutation<ISetColVisibleMutationParams>;
