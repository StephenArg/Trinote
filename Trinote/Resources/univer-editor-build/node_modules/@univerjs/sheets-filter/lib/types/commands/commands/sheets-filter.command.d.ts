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
import type { ICommand, IMutationInfo, IRange, Nullable } from '@univerjs/core';
import type { ISheetCommandSharedParams } from '@univerjs/sheets';
import type { IAutoFilter, IFilterColumn } from '../../models/types';
import type { ISetSheetsFilterCriteriaMutationParams } from '../mutations/sheets-filter.mutation';
/**
 * Parameters of command {@link SetSheetFilterRangeCommand}.
 * @property {IRange} range - the range to be set as filter range.
 */
export interface ISetSheetFilterRangeCommandParams extends ISheetCommandSharedParams {
    range: IRange;
}
/**
 * A {@link CommandType.COMMAND} to set filter range in a Worksheet. Its params {@link ISetSheetFilterRangeCommandParams}
 * is required. If the {@link FilterModel} does not exist, it will be created.
 */
export declare const SetSheetFilterRangeCommand: ICommand<ISetSheetFilterRangeCommandParams>;
/**
 * A {@link CommandType.COMMAND} to remove filter in a Worksheet. Its params {@link ISheetCommandSharedParams} is
 * required. If the {@link FilterModel} does not exist, it will fail to execute.
 */
export declare const RemoveSheetFilterCommand: ICommand<ISheetCommandSharedParams>;
/**
 * A {@link CommandType.COMMAND} to toggle filter in the current {@link Worksheet}.
 */
export declare const SmartToggleSheetsFilterCommand: ICommand;
/**
 * Parameters of command {@link SetSheetsFilterCriteriaCommand}.
 * @property {number} col - the column index of the filter criteria
 * @property {Nullable<IFilterColumn>} criteria - the filter criteria to be set
 */
export interface ISetSheetsFilterCriteriaCommandParams extends ISheetCommandSharedParams {
    col: number;
    criteria: Nullable<IFilterColumn>;
}
/**
 * A {@link CommandType.COMMAND} to set filter criteria to a column in the targeting {@link FilterModel}. Its params
 * {@link ISetSheetsFilterCriteriaCommandParams} is required.
 */
export declare const SetSheetsFilterCriteriaCommand: ICommand<ISetSheetsFilterCriteriaCommandParams>;
/**
 * A {@link CommandType.COMMAND} to clear all filter criteria in the targeting {@link FilterModel}. Its params
 * {@link ISheetCommandSharedParams} is required.
 */
export declare const ClearSheetsFilterCriteriaCommand: ICommand<ISheetCommandSharedParams>;
/**
 * A {@link CommandType.COMMAND} forcing the currently active {@link FilterModel} to re-calculate all filter criteria.
 * Its params {@link ISheetCommandSharedParams} is required.
 */
export declare const ReCalcSheetsFilterCommand: ICommand<ISheetCommandSharedParams>;
/**
 * Transform a {@link FilterModel} to a list of mutations to set the filter criteria.
 * @param unitId - the unit id of the {@link Workbook}
 * @param subUnitId - the sub unit id of the {@link Worksheet}
 * @param autoFilter - the to be destructed {@link FilterModel}
 * @returns {IMutationInfo<ISetSheetsFilterCriteriaMutationParams>} a list of mutations those can be used to
 * reconstruct the {@link FilterModel}
 */
export declare function destructFilterCriteria(unitId: string, subUnitId: string, autoFilter: IAutoFilter): IMutationInfo<ISetSheetsFilterCriteriaMutationParams>[];
