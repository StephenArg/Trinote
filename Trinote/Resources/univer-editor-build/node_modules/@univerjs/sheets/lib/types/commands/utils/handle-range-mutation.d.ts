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
import type { IAccessor, IMutationInfo, IObjectMatrixPrimitiveType, IRange, Nullable } from '@univerjs/core';
import type { IDeleteRangeMutationParams, IInsertRangeMutationParams } from '../../basics/interfaces/mutation-interface';
import { Dimension, ObjectMatrix } from '@univerjs/core';
/**
 * Generate undo mutation of a `InsertRangeMutation`
 *
 * @param {IAccessor} accessor - injector accessor
 * @param {IInsertRangeMutationParams} params - do mutation params
 * @returns {IDeleteRangeMutationParams} undo mutation params
 */
export declare const InsertRangeUndoMutationFactory: (accessor: IAccessor, params: IInsertRangeMutationParams) => IDeleteRangeMutationParams;
/**
 * InsertRange is not a mutation but combination of `SetRangeValuesMutation` and `MoveRangeMutation`.
 * @param accessor
 * @param params
 * @returns
 */
export declare function getInsertRangeMutations(accessor: IAccessor, params: IInsertRangeMutationParams): {
    redo: IMutationInfo<object>[];
    undo: IMutationInfo<object>[];
};
export declare function getRemoveRangeMutations(accessor: IAccessor, params: IDeleteRangeMutationParams): {
    redo: IMutationInfo<object>[];
    undo: IMutationInfo<object>[];
};
export declare function handleInsertRangeMutation<T>(cellMatrix: ObjectMatrix<T>, range: IRange, lastEndRow: number, lastEndColumn: number, shiftDimension: Dimension, cellValue?: IObjectMatrixPrimitiveType<T>): void;
/**
 * Generate undo mutation of a `DeleteRangeMutation`
 *
 * @param {IAccessor} accessor - injector accessor
 * @param {IDeleteRangeMutationParams} params - do mutation params
 * @returns {IInsertRangeMutationParams} undo mutation params
 */
export declare const DeleteRangeUndoMutationFactory: (accessor: IAccessor, params: IDeleteRangeMutationParams) => Nullable<IInsertRangeMutationParams>;
export declare function handleDeleteRangeMutation<T>(cellMatrix: ObjectMatrix<T>, range: IRange, lastEndRow: number, lastEndColumn: number, shiftDimension: Dimension): void;
