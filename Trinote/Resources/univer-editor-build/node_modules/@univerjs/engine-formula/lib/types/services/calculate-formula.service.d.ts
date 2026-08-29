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
import type { IUnitRange } from '@univerjs/core';
import type { Observable } from 'rxjs';
import type { IArrayFormulaRangeType, IFeatureDirtyRangeType, IFormulaDatasetConfig, IFormulaExecuteResultMap, IFormulaStringMap, IRuntimeUnitDataType, IUnitExcludedCell, IUnitRowData } from '../basics/common';
import type { IFormulaDependencyTreeFullJson, IFormulaDependencyTreeJson, IFormulaDependentsAndInRangeResults } from '../engine/dependency/dependency-tree';
import type { FunctionVariantType } from '../engine/reference-object/base-reference-object';
import type { IAllRuntimeData, IExecutionInProgressParams } from './runtime.service';
import { AsyncLock, Disposable, IConfigService } from '@univerjs/core';
import { Subject } from 'rxjs';
import { Lexer } from '../engine/analysis/lexer';
import { AstTreeBuilder } from '../engine/analysis/parser';
import { IFormulaDependencyGenerator } from '../engine/dependency/formula-dependency';
import { Interpreter } from '../engine/interpreter/interpreter';
import { IFormulaCurrentConfigService } from './current-data.service';
import { IFormulaRuntimeService } from './runtime.service';
export declare const DEFAULT_INTERVAL_COUNT = 500;
export declare const CYCLE_REFERENCE_COUNT = "cycleReferenceCount";
export declare const EVERY_N_FUNCTION_EXECUTION_PAUSE = 100;
export interface ICalculateFormulaService {
    readonly executionInProgressListener$: Observable<IExecutionInProgressParams>;
    readonly executionCompleteListener$: Observable<IAllRuntimeData>;
    setRuntimeFeatureCellData(featureId: string, featureData: IRuntimeUnitDataType): void;
    setRuntimeFeatureRange(featureId: string, featureRange: IFeatureDirtyRangeType): void;
    execute(formulaDatasetConfig: IFormulaDatasetConfig): Promise<void>;
    stopFormulaExecution(): void;
    calculate(formulaString: string, transformSuffix?: boolean): void;
    executeFormulas(formulas: IFormulaStringMap, rowData?: IUnitRowData): Promise<IFormulaExecuteResultMap>;
    getAllDependencyJson(rowData?: IUnitRowData): Promise<IFormulaDependencyTreeJson[]>;
    getCellDependencyJson(unitId: string, sheetId: string, row: number, column: number, rowData?: IUnitRowData): Promise<IFormulaDependencyTreeFullJson | undefined>;
    getRangeDependents(unitRanges: IUnitRange[]): Promise<IFormulaDependencyTreeJson[]>;
    getInRangeFormulas(unitRanges: IUnitRange[]): Promise<IFormulaDependencyTreeJson[]>;
    getDependentsAndInRangeFormulas(unitRanges: IUnitRange[]): Promise<IFormulaDependentsAndInRangeResults>;
}
export declare const ICalculateFormulaService: import("@wendellhu/redi").IdentifierDecorator<ICalculateFormulaService>;
export declare class CalculateFormulaService extends Disposable implements ICalculateFormulaService {
    protected readonly _configService: IConfigService;
    protected readonly _lexer: Lexer;
    protected readonly _currentConfigService: IFormulaCurrentConfigService;
    protected readonly _runtimeService: IFormulaRuntimeService;
    protected readonly _formulaDependencyGenerator: IFormulaDependencyGenerator;
    protected readonly _interpreter: Interpreter;
    protected readonly _astTreeBuilder: AstTreeBuilder;
    protected readonly _executionInProgressListener$: Subject<IExecutionInProgressParams>;
    readonly executionInProgressListener$: Observable<IExecutionInProgressParams>;
    protected readonly _executionCompleteListener$: Subject<IAllRuntimeData>;
    readonly executionCompleteListener$: Observable<IAllRuntimeData>;
    protected _executeLock: AsyncLock;
    protected _isCalculateTreeModel: boolean;
    constructor(_configService: IConfigService, _lexer: Lexer, _currentConfigService: IFormulaCurrentConfigService, _runtimeService: IFormulaRuntimeService, _formulaDependencyGenerator: IFormulaDependencyGenerator, _interpreter: Interpreter, _astTreeBuilder: AstTreeBuilder);
    dispose(): void;
    /**
     * Stop the execution of the formula.
     */
    stopFormulaExecution(): void;
    /**
     * When the feature is loading,
     * the pre-calculated content needs to be input to the formula engine in advance,
     * so that the formula can read the correct values.
     * @param featureId
     * @param featureData
     */
    setRuntimeFeatureCellData(featureId: string, featureData: IRuntimeUnitDataType): void;
    setRuntimeFeatureRange(featureId: string, featureRange: IFeatureDirtyRangeType): void;
    execute(formulaDatasetConfig: IFormulaDatasetConfig): Promise<void>;
    protected _executeStep(): Promise<true | undefined>;
    protected _getArrayFormulaDirtyRangeAndExcludedRange(arrayFormulaRange: IArrayFormulaRangeType, runtimeFeatureRange: {
        [featureId: string]: IFeatureDirtyRangeType;
    }): {
        dirtyRanges: IUnitRange[];
        excludedCell: IUnitExcludedCell;
    };
    protected _apply(isArrayFormulaState?: boolean): Promise<IAllRuntimeData | undefined>;
    executeFormulas(formulas: IFormulaStringMap, rowData?: IUnitRowData): Promise<IFormulaExecuteResultMap>;
    calculate(formulaString: string): Promise<FunctionVariantType | undefined>;
    getAllDependencyJson(): Promise<IFormulaDependencyTreeJson[]>;
    getCellDependencyJson(unitId: string, sheetId: string, row: number, column: number): Promise<IFormulaDependencyTreeFullJson | undefined>;
    getRangeDependents(unitRanges: IUnitRange[]): Promise<IFormulaDependencyTreeJson[]>;
    getInRangeFormulas(unitRanges: IUnitRange[]): Promise<IFormulaDependencyTreeJson[]>;
    getDependentsAndInRangeFormulas(unitRanges: IUnitRange[]): Promise<IFormulaDependentsAndInRangeResults>;
}
