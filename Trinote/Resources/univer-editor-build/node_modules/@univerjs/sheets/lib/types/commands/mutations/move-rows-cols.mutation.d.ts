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
export interface IMoveRowsMutationParams {
    unitId: string;
    subUnitId: string;
    /**
     * The rows to be moved.
     */
    sourceRange: IRange;
    /**
     * The destination range to move the source rows to. Note that the range is before the movement has occurred.
     */
    targetRange: IRange;
}
/**
 * Get an undo mutation for the move rows mutation.
 * @param accessor
 * @param params
 */
export declare function MoveRowsMutationUndoFactory(_accessor: IAccessor | null, params: IMoveRowsMutationParams): IMoveRowsMutationParams;
export declare const MoveRowsMutation: IMutation<IMoveRowsMutationParams>;
export interface IMoveColumnsMutationParams {
    unitId: string;
    subUnitId: string;
    /**
     * The cols to be moved.
     */
    sourceRange: IRange;
    /**
     * The destination range to move the source cols to. Note that the range is before the movement has occurred.
     */
    targetRange: IRange;
}
export declare function MoveColsMutationUndoFactory(_accessor: IAccessor | null, params: IMoveColumnsMutationParams): IMoveColumnsMutationParams;
export declare const MoveColsMutation: IMutation<IMoveColumnsMutationParams>;
