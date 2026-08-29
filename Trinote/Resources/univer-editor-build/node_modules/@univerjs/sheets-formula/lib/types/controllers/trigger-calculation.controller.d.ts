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
import { Disposable, ICommandService, IConfigService, ILogService, IUniverInstanceService, LocaleService } from '@univerjs/core';
import { FormulaDataModel, IActiveDirtyManagerService, RegisterOtherFormulaService } from '@univerjs/engine-formula';
/**
 * This interface is for the progress bar to display the calculation progress.
 */
export interface ICalculationProgress {
    /** Task that already completed. */
    done: number;
    /** The total number of formulas need to calculate. */
    count: number;
    /** The label of the calculation progress. */
    label?: string;
}
export declare class TriggerCalculationController extends Disposable {
    private readonly _commandService;
    private readonly _univerInstanceService;
    private readonly _activeDirtyManagerService;
    private readonly _logService;
    private readonly _configService;
    private readonly _formulaDataModel;
    private readonly _localeService;
    private readonly _registerOtherFormulaService;
    private _waitingCommandQueue;
    private _executingDirtyData;
    private _setTimeoutKey;
    private _startExecutionTime;
    private _totalCalculationTaskCount;
    private _doneCalculationTaskCount;
    private _executionInProgressParams;
    private _restartCalculation;
    private readonly _progress$;
    readonly progress$: import("rxjs").Observable<ICalculationProgress>;
    private _emitProgress;
    private _startProgress;
    private _calculateProgress;
    private _completeProgress;
    clearProgress(): void;
    constructor(_commandService: ICommandService, _univerInstanceService: IUniverInstanceService, _activeDirtyManagerService: IActiveDirtyManagerService, _logService: ILogService, _configService: IConfigService, _formulaDataModel: FormulaDataModel, _localeService: LocaleService, _registerOtherFormulaService: RegisterOtherFormulaService);
    dispose(): void;
    private _getCalculationMode;
    private _commandExecutedListener;
    private _generateDirty;
    private _mergeDirty;
    /**
     * dirtyRanges may overlap with the ranges in allDirtyRanges and need to be deduplicated
     * @param allDirtyRanges
     * @param dirtyRanges
     */
    private _mergeDirtyRanges;
    private _mergeDirtyUnitStringMap;
    private _mergeDirtyUnitFeatureOrOtherFormulaMap;
    private _initialExecuteFormulaProcessListener;
    private _resetExecutingDirtyData;
    private _initialExecuteFormula;
    private _getDirtyDataByCalculationMode;
}
