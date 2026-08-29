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
import type { IAccessor, ICommand, IDataValidationRuleBase, IDataValidationRuleOptions, IMutationInfo, Injector, IRange, ISheetDataValidationRule } from '@univerjs/core';
import type { DataValidationChangeSource, IRemoveDataValidationMutationParams } from '@univerjs/data-validation';
import type { ISheetCommandSharedParams } from '@univerjs/sheets';
import type { RangeMutation } from '../../models/rule-matrix';
export interface IUpdateSheetDataValidationRangeCommandParams {
    unitId: string;
    subUnitId: string;
    ruleId: string;
    ranges: IRange[];
}
export declare function getDataValidationDiffMutations(unitId: string, subUnitId: string, diffs: RangeMutation[], accessor: IAccessor, source?: DataValidationChangeSource, fillDefaultValue?: boolean): {
    redoMutations: IMutationInfo<object>[];
    undoMutations: IMutationInfo<object>[];
};
export declare const UpdateSheetDataValidationRangeCommand: ICommand<IUpdateSheetDataValidationRangeCommandParams>;
export interface IAddSheetDataValidationCommandParams {
    unitId: string;
    subUnitId: string;
    rule: ISheetDataValidationRule;
}
export declare const AddSheetDataValidationCommand: ICommand<IAddSheetDataValidationCommandParams>;
export interface IUpdateSheetDataValidationSettingCommandParams extends ISheetCommandSharedParams {
    ruleId: string;
    setting: IDataValidationRuleBase;
}
export declare const UpdateSheetDataValidationSettingCommand: ICommand<IUpdateSheetDataValidationSettingCommandParams>;
export interface IUpdateSheetDataValidationOptionsCommandParams extends ISheetCommandSharedParams {
    ruleId: string;
    options: IDataValidationRuleOptions;
}
export declare const UpdateSheetDataValidationOptionsCommand: ICommand<IUpdateSheetDataValidationOptionsCommandParams>;
export interface IClearRangeDataValidationCommandParams {
    unitId: string;
    subUnitId: string;
    ranges: IRange[];
}
export declare const ClearRangeDataValidationCommand: ICommand<IClearRangeDataValidationCommandParams>;
export interface IRemoveSheetAllDataValidationCommandParams extends ISheetCommandSharedParams {
}
export declare const RemoveSheetAllDataValidationCommand: ICommand<IRemoveSheetAllDataValidationCommandParams>;
export interface IRemoveSheetDataValidationCommandParams extends ISheetCommandSharedParams {
    ruleId: string;
}
export declare const removeDataValidationUndoFactory: (accessor: Injector, redoParams: IRemoveDataValidationMutationParams) => IMutationInfo<object>[];
export declare const RemoveSheetDataValidationCommand: ICommand<IRemoveSheetDataValidationCommandParams>;
