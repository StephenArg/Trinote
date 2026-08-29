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
import type { FormulaExecutedStateType, IExecutionInProgressParams, ISetFormulaCalculationResultMutation } from '@univerjs/engine-formula';
import { Disposable } from '@univerjs/core';
export interface IFormulaCalculationSessionState {
    id: number;
    initialized: boolean;
    started: boolean;
    progress: IExecutionInProgressParams | null;
    stopped: boolean;
    completed: boolean;
    resultEmitted: boolean;
    resultApplied: boolean;
}
export declare class FormulaCalculationSessionService extends Disposable {
    private readonly _state$;
    private readonly _resultApplied$;
    private _currentResult;
    private _hasEmittedCurrentResultApplied;
    readonly state$: import("rxjs").Observable<IFormulaCalculationSessionState>;
    readonly resultApplied$: import("rxjs").Observable<ISetFormulaCalculationResultMutation>;
    get state(): IFormulaCalculationSessionState;
    dispose(): void;
    initialize(): void;
    start(): void;
    updateProgress(progress: IExecutionInProgressParams): void;
    markStopped(): void;
    markCompleted(state: FormulaExecutedStateType): void;
    markResultEmitted(result: ISetFormulaCalculationResultMutation, hasResultToApply: boolean): void;
    markResultApplied(): void;
    waitForLatestApplied(timeout?: number, startWatchdog?: number): Promise<void>;
    private _emit;
    private _emitResultApplied;
    private _isAppliedTerminalState;
}
