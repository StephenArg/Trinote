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
import type { CustomDecorationType, IAccessor, IMutationInfo } from '@univerjs/core';
import type { IRichTextEditingMutationParams } from '@univerjs/docs';
import type { ITextRangeWithStyle } from '@univerjs/engine-render';
interface IAddCustomDecorationParam {
    unitId: string;
    ranges: ITextRangeWithStyle[];
    segmentId?: string;
    id: string;
    type: CustomDecorationType;
}
export declare function addCustomDecorationFactory(param: IAddCustomDecorationParam): IMutationInfo<IRichTextEditingMutationParams>;
interface IAddCustomDecorationFactoryParam {
    segmentId?: string;
    id: string;
    type: CustomDecorationType;
    unitId?: string;
}
export declare function addCustomDecorationBySelectionFactory(accessor: IAccessor, param: IAddCustomDecorationFactoryParam): false | IMutationInfo<IRichTextEditingMutationParams>;
export interface IDeleteCustomRangeParam {
    unitId: string;
    id: string;
    segmentId?: string;
}
export declare function deleteCustomDecorationFactory(accessor: IAccessor, params: IDeleteCustomRangeParam): false | IMutationInfo<IRichTextEditingMutationParams>;
export {};
