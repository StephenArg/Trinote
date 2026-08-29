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
import type { IMutation, IRange, Nullable } from '@univerjs/core';
import type { ISheetCommandSharedParams } from '@univerjs/sheets';
import type { IFilterColumn } from '../../models/types';
/**
 * Parameters of mutation {@link SetSheetsFilterRangeMutation}.
 * @property range - the range to be set as filter range.
 */
export interface ISetSheetsFilterRangeMutationParams extends ISheetCommandSharedParams {
    range: IRange;
}
/**
 * A {@link CommandType.MUTATION} to set filter range in a {@link Worksheet}. If no {@link FilterModel} exists,
 * a new `FilterModel` will be created.
 *
 * Since there could only be a filter on a worksheet, when you want to update the range, you
 * don't necessarily need to remove the filter first, you can just execute this mutation.
 */
export declare const SetSheetsFilterRangeMutation: IMutation<ISetSheetsFilterRangeMutationParams>;
/**
 * Parameters of mutation {@link SetSheetsFilterCriteriaMutation}.
 * @property {number} col - the column index to set filter criteria.
 * @property {IFilterColumn | null} criteria - the filter criteria to set. If it is `null`, the criteria will be removed.
 * @property {boolean} [reCalc=true] - if it should trigger calculation on this `FilterColumn`.
 */
export interface ISetSheetsFilterCriteriaMutationParams extends ISheetCommandSharedParams {
    col: number;
    criteria: Nullable<IFilterColumn>;
    reCalc?: boolean;
}
/**
 * A {@link CommandType.MUTATION} to set filter criteria of a given column of a {@link FilterModel}.
 */
export declare const SetSheetsFilterCriteriaMutation: IMutation<ISetSheetsFilterCriteriaMutationParams>;
/**
 * A {@link CommandType.MUTATION} to remove a {@link FilterModel} in a {@link Worksheet}.
 */
export declare const RemoveSheetsFilterMutation: IMutation<ISheetCommandSharedParams>;
/**
 * A {@link CommandType.MUTATION} to re-calculate a {@link FilterModel}.
 */
export declare const ReCalcSheetsFilterMutation: IMutation<ISheetCommandSharedParams>;
