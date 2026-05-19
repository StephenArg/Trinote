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
import type { IExecutionOptions, IMutation, IUnitRange, Nullable } from '@univerjs/core';
import type { IFormulaExecuteResultMap, IFormulaStringMap, IRuntimeOtherUnitDataType, IRuntimeUnitDataPrimitiveType } from '../../basics/common';
import type { IFormulaDependencyTreeFullJson, IFormulaDependencyTreeJson, IFormulaDependentsAndInRangeResults } from '../../engine/dependency/dependency-tree';
import type { IFormulaDirtyData } from '../../services/current-data.service';
import type { FormulaExecutedStateType, IExecutionInProgressParams } from '../../services/runtime.service';
export interface ISetFormulaCalculationStartMutation extends IFormulaDirtyData {
    options: Nullable<IExecutionOptions>;
}
export interface ISetFormulaStringBatchCalculationMutation {
    formulas: IFormulaStringMap;
}
export interface ISetFormulaStringBatchCalculationResultMutation {
    result: IFormulaExecuteResultMap;
}
export interface ISetFormulaStringBatchCalculationResultMutation {
    result: IFormulaExecuteResultMap;
}
export interface ISetFormulaDependencyCalculationMutation {
    unitId: string;
    sheetId: string;
    row: number;
    column: number;
}
export interface ISetFormulaDependencyCalculationResultMutation {
    result: IFormulaDependencyTreeJson[];
}
export interface ISetCellFormulaDependencyCalculationResultMutation {
    result: IFormulaDependencyTreeFullJson | undefined;
}
export interface ISetQueryFormulaDependencyMutation {
    unitRanges: IUnitRange[];
    isInRange?: boolean;
}
export interface ISetQueryFormulaDependencyResultMutation {
    result: IFormulaDependencyTreeJson[];
}
export interface ISetQueryFormulaDependencyAllMutation {
    unitRanges: IUnitRange[];
}
export interface ISetQueryFormulaDependencyAllResultMutation {
    result: IFormulaDependentsAndInRangeResults;
}
/**
 * TODO: @DR-Univer
 * Trigger the calculation of the formula and stop the formula
 */
export declare const SetFormulaCalculationStartMutation: IMutation<ISetFormulaCalculationStartMutation>;
export declare const SetTriggerFormulaCalculationStartMutation: IMutation<ISetFormulaCalculationStartMutation>;
export declare const SetFormulaStringBatchCalculationMutation: IMutation<ISetFormulaStringBatchCalculationMutation>;
export declare const SetFormulaStringBatchCalculationResultMutation: IMutation<ISetFormulaStringBatchCalculationResultMutation>;
export interface ISetFormulaCalculationStopMutation {
}
export declare const SetFormulaCalculationStopMutation: IMutation<ISetFormulaCalculationStopMutation>;
export interface ISetFormulaCalculationNotificationMutation {
    functionsExecutedState?: FormulaExecutedStateType;
    stageInfo?: IExecutionInProgressParams;
}
export declare const SetFormulaCalculationNotificationMutation: IMutation<ISetFormulaCalculationNotificationMutation>;
export interface ISetFormulaCalculationResultMutation {
    unitData: IRuntimeUnitDataPrimitiveType;
    unitOtherData: IRuntimeOtherUnitDataType;
}
export declare const SetFormulaCalculationResultMutation: IMutation<ISetFormulaCalculationResultMutation>;
export declare const SetFormulaDependencyCalculationMutation: IMutation<{}>;
export declare const SetFormulaDependencyCalculationResultMutation: IMutation<ISetFormulaDependencyCalculationResultMutation>;
export declare const SetCellFormulaDependencyCalculationMutation: IMutation<ISetFormulaDependencyCalculationMutation>;
export declare const SetCellFormulaDependencyCalculationResultMutation: IMutation<ISetCellFormulaDependencyCalculationResultMutation>;
export declare const SetQueryFormulaDependencyMutation: IMutation<ISetQueryFormulaDependencyMutation>;
export declare const SetQueryFormulaDependencyResultMutation: IMutation<ISetQueryFormulaDependencyResultMutation>;
export declare const SetQueryFormulaDependencyAllMutation: IMutation<ISetQueryFormulaDependencyAllMutation>;
export declare const SetQueryFormulaDependencyAllResultMutation: IMutation<ISetQueryFormulaDependencyAllResultMutation>;
