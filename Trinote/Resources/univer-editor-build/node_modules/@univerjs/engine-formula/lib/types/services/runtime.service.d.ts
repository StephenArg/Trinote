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
import type { Nullable } from '@univerjs/core';
import type { IArrayFormulaEmbeddedMap, IArrayFormulaRangeType, IFeatureDirtyRangeType, IRuntimeImageFormulaDataType, IRuntimeOtherUnitDataType, IRuntimeUnitDataType } from '../basics/common';
import type { BaseAstNode } from '../engine/ast-node/base-ast-node';
import type { IFormulaDependencyTreeJson } from '../engine/dependency/dependency-tree';
import type { FunctionVariantType } from '../engine/reference-object/base-reference-object';
import { Disposable } from '@univerjs/core';
import { IFormulaCurrentConfigService } from './current-data.service';
import { IHyperlinkEngineFormulaService } from './hyperlink-engine-formula.service';
/**
 * The formula engine has a lot of stages. IDLE and CALCULATION_COMPLETED can be considered as
 * the computing has completed.
 */
export declare enum FormulaExecuteStageType {
    IDLE = 0,
    START = 1,
    START_DEPENDENCY = 2,
    START_CALCULATION = 3,
    CURRENTLY_CALCULATING = 4,
    START_DEPENDENCY_ARRAY_FORMULA = 5,
    START_CALCULATION_ARRAY_FORMULA = 6,
    CURRENTLY_CALCULATING_ARRAY_FORMULA = 7,
    CALCULATION_COMPLETED = 8
}
export declare enum FormulaExecutedStateType {
    INITIAL = 0,
    STOP_EXECUTION = 1,
    NOT_EXECUTED = 2,
    SUCCESS = 3
}
export interface IAllRuntimeData {
    unitData: IRuntimeUnitDataType;
    arrayFormulaRange: IArrayFormulaRangeType;
    arrayFormulaEmbedded: IArrayFormulaEmbeddedMap;
    unitOtherData: IRuntimeOtherUnitDataType;
    functionsExecutedState: FormulaExecutedStateType;
    arrayFormulaCellData: IRuntimeUnitDataType;
    clearArrayFormulaCellData: IRuntimeUnitDataType;
    imageFormulaData: IRuntimeImageFormulaDataType[];
    runtimeFeatureRange: {
        [featureId: string]: IFeatureDirtyRangeType;
    };
    runtimeFeatureCellData: {
        [featureId: string]: IRuntimeUnitDataType;
    };
    dependencyTreeModelData: IFormulaDependencyTreeJson[];
}
export interface IExecutionInProgressParams {
    totalFormulasToCalculate: number;
    completedFormulasCount: number;
    totalArrayFormulasToCalculate: number;
    completedArrayFormulasCount: number;
    formulaCycleIndex: number;
    stage: FormulaExecuteStageType;
}
export interface IFormulaRuntimeService {
    currentRow: number;
    currentColumn: number;
    currentSubUnitId: string;
    currentUnitId: string;
    dispose(): void;
    reset(): void;
    setCurrent(row: number, column: number, rowCount: number, columnCount: number, sheetId: string, unitId: string): void;
    registerFunctionDefinitionPrivacyVar(lambdaId: string, lambdaVar: Map<string, Nullable<BaseAstNode>>): void;
    getFunctionDefinitionPrivacyVar(lambdaId: string): Nullable<Map<string, Nullable<BaseAstNode>>>;
    setRuntimeData(functionVariant: FunctionVariantType): void;
    getUnitData(): IRuntimeUnitDataType;
    getUnitArrayFormula(): IArrayFormulaRangeType;
    stopExecution(): void;
    setFormulaExecuteStage(type: FormulaExecuteStageType): void;
    setFormulaCycleIndex(index: number): void;
    isStopExecution(): boolean;
    getFormulaExecuteStage(): FormulaExecuteStageType;
    setRuntimeOtherData(formulaId: string, x: number, y: number, functionVariant: FunctionVariantType): void;
    getRuntimeOtherData(): IRuntimeOtherUnitDataType;
    getAllRuntimeData(): IAllRuntimeData;
    markedAsSuccessfullyExecuted(): void;
    markedAsNoFunctionsExecuted(): void;
    markedAsStopFunctionsExecuted(): void;
    markedAsInitialFunctionsExecuted(): void;
    setTotalFormulasToCalculate(value: number): void;
    getTotalFormulasToCalculate(): number;
    setCompletedFormulasCount(value: number): void;
    getCompletedFormulasCount(): number;
    getRuntimeState(): IExecutionInProgressParams;
    setTotalArrayFormulasToCalculate(value: number): void;
    getTotalArrayFormulasToCalculate(): number;
    setCompletedArrayFormulasCount(value: number): void;
    getCompletedArrayFormulasCount(): number;
    enableCycleDependency(): void;
    disableCycleDependency(): void;
    isCycleDependency(): boolean;
    getRuntimeArrayFormulaCellData(): IRuntimeUnitDataType;
    getRuntimeFeatureRange(): {
        [featureId: string]: IFeatureDirtyRangeType;
    };
    getRuntimeFeatureCellData(): {
        [featureId: string]: IRuntimeUnitDataType;
    };
    setRuntimeFeatureCellData(featureId: string, featureData: IRuntimeUnitDataType): void;
    setRuntimeFeatureRange(featureId: string, featureRange: IFeatureDirtyRangeType): void;
    clearReferenceAndNumberformatCache(): void;
    getUnitArrayFormulaEmbeddedMap(): IArrayFormulaEmbeddedMap;
    setUnitArrayFormulaEmbeddedMap(): void;
    clearArrayObjectCache(): void;
    getRuntimeImageFormulaData(): IRuntimeImageFormulaDataType[];
    setDependencyTreeModelData(data: IFormulaDependencyTreeJson[]): void;
    getDependencyTreeModelData(): IFormulaDependencyTreeJson[];
}
export declare class FormulaRuntimeService extends Disposable implements IFormulaRuntimeService {
    private readonly _currentConfigService;
    private readonly _hyperlinkEngineFormulaService;
    private _formulaExecuteStage;
    private _stopState;
    private _currentRow;
    private _currentColumn;
    private _currentRowCount;
    private _currentColumnCount;
    private _currentSubUnitId;
    private _currentUnitId;
    private _runtimeData;
    private _runtimeOtherData;
    private _unitArrayFormulaRange;
    private _unitArrayFormulaEmbeddedMap;
    private _runtimeArrayFormulaCellData;
    private _runtimeClearArrayFormulaCellData;
    private _runtimeFeatureRange;
    private _runtimeFeatureCellData;
    private _runtimeImageFormulaData;
    private _functionsExecutedState;
    private _functionDefinitionPrivacyVar;
    private _totalFormulasToCalculate;
    private _completedFormulasCount;
    private _totalArrayFormulasToCalculate;
    private _completedArrayFormulasCount;
    private _formulaCycleIndex;
    private _isCycleDependency;
    private _dependencyTreeModelData;
    constructor(_currentConfigService: IFormulaCurrentConfigService, _hyperlinkEngineFormulaService: IHyperlinkEngineFormulaService);
    get currentRow(): number;
    get currentColumn(): number;
    get currentRowCount(): number;
    get currentColumnCount(): number;
    get currentSubUnitId(): string;
    get currentUnitId(): string;
    dispose(): void;
    enableCycleDependency(): void;
    disableCycleDependency(): void;
    isCycleDependency(): boolean;
    setFormulaCycleIndex(index: number): void;
    getFormulaCycleIndex(): number;
    setTotalArrayFormulasToCalculate(value: number): void;
    getTotalArrayFormulasToCalculate(): number;
    setCompletedArrayFormulasCount(value: number): void;
    getCompletedArrayFormulasCount(): number;
    setTotalFormulasToCalculate(value: number): void;
    getTotalFormulasToCalculate(): number;
    setCompletedFormulasCount(value: number): void;
    getCompletedFormulasCount(): number;
    markedAsSuccessfullyExecuted(): void;
    markedAsNoFunctionsExecuted(): void;
    markedAsStopFunctionsExecuted(): void;
    markedAsInitialFunctionsExecuted(): void;
    stopExecution(): void;
    isStopExecution(): boolean;
    setFormulaExecuteStage(type: FormulaExecuteStageType): void;
    getFormulaExecuteStage(): FormulaExecuteStageType;
    reset(): void;
    clearReferenceAndNumberformatCache(): void;
    setCurrent(row: number, column: number, rowCount: number, columnCount: number, sheetId: string, unitId: string): void;
    clearFunctionDefinitionPrivacyVar(): void;
    registerFunctionDefinitionPrivacyVar(lambdaId: string, lambdaVar: Map<string, Nullable<BaseAstNode>>): void;
    getFunctionDefinitionPrivacyVar(lambdaId: string): Nullable<Map<string, Nullable<BaseAstNode>>>;
    setRuntimeOtherData(formulaId: string, x: number, y: number, functionVariant: FunctionVariantType): void;
    setRuntimeData(functionVariant: FunctionVariantType): void;
    private _getValueObjectOfRuntimeData;
    getUnitData(): IRuntimeUnitDataType;
    getUnitArrayFormula(): IArrayFormulaRangeType;
    getUnitArrayFormulaEmbeddedMap(): IArrayFormulaEmbeddedMap;
    setUnitArrayFormulaEmbeddedMap(): void;
    getRuntimeOtherData(): IRuntimeOtherUnitDataType;
    getRuntimeArrayFormulaCellData(): IRuntimeUnitDataType;
    getRuntimeClearArrayFormulaCellData(): IRuntimeUnitDataType;
    getRuntimeFeatureRange(): {
        [featureId: string]: IFeatureDirtyRangeType;
    };
    setRuntimeFeatureRange(featureId: string, featureRange: IFeatureDirtyRangeType): void;
    getRuntimeFeatureCellData(): {
        [featureId: string]: IRuntimeUnitDataType;
    };
    setRuntimeFeatureCellData(featureId: string, featureData: IRuntimeUnitDataType): void;
    setDependencyTreeModelData(data: IFormulaDependencyTreeJson[]): void;
    getDependencyTreeModelData(): IFormulaDependencyTreeJson[];
    getRuntimeImageFormulaData(): IRuntimeImageFormulaDataType[];
    getAllRuntimeData(): IAllRuntimeData;
    getRuntimeState(): IExecutionInProgressParams;
    clearArrayObjectCache(): void;
    private _checkIfArrayFormulaRangeHasData;
    private _getRuntimeFeatureCellValue;
    private _arrayCellHasData;
    /**
     * If the current array formula in the extended area intersects with the existing array formula, a #SPILL! error will be reported. Note that if other array formulas are already #SPILL!, they will not conflict with the current array formula
     * @param formulaUnitId
     * @param formulaSheetId
     * @param formulaRow
     * @param formulaColumn
     * @param r
     * @param c
     * @returns
     */
    private _isInOtherArrayFormulaRange;
    private _isInArrayFormulaRange;
    private _isSameCellValue;
    private _checkIfArrayFormulaExceeded;
    private _isInDirtyRange;
}
export declare const IFormulaRuntimeService: import("@wendellhu/redi").IdentifierDecorator<IFormulaRuntimeService>;
