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
import type { IInsertColMutationParams, IInsertRowMutationParams, IRemoveColMutationParams, IRemoveRowsMutationParams } from '../../basics/interfaces/mutation-interface';
export declare const InsertRowMutationUndoFactory: (accessor: IAccessor, params: IInsertRowMutationParams) => IRemoveRowsMutationParams;
export declare const InsertRowMutation: IMutation<IInsertRowMutationParams>;
export declare const InsertColMutationUndoFactory: (accessor: IAccessor, params: IInsertColMutationParams) => IRemoveColMutationParams;
export declare const InsertColMutation: IMutation<IInsertColMutationParams>;
