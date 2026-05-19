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
import type { IRange, Nullable } from '@univerjs/core';
import type { IOtherFormulaResult } from './formula-common';
import { Disposable, ICommandService, LifecycleService } from '@univerjs/core';
import { BehaviorSubject } from 'rxjs';
import { IActiveDirtyManagerService } from './active-dirty-manager.service';
export declare enum OtherFormulaBizType {
    DEFAULT = "default",
    DATA_VALIDATION = "dv",
    DATA_VALIDATION_CUSTOM = "dv-custom",
    CONDITIONAL_FORMATTING = "cf",
    DOC = "doc",
    SLIDE = "slide"
}
export declare class RegisterOtherFormulaService extends Disposable {
    private readonly _commandService;
    private _activeDirtyManagerService;
    private readonly _lifecycleService;
    private _formulaCacheMap;
    private _formulaChangeWithRange$;
    formulaChangeWithRange$: import("rxjs").Observable<{
        unitId: string;
        subUnitId: string;
        formulaText: string;
        formulaId: string;
        ranges: IRange[];
    }>;
    private _formulaResult$;
    formulaResult$: import("rxjs").Observable<Record<string, Record<string, IOtherFormulaResult[]>>>;
    calculateStarted$: BehaviorSubject<boolean>;
    constructor(_commandService: ICommandService, _activeDirtyManagerService: IActiveDirtyManagerService, _lifecycleService: LifecycleService);
    dispose(): void;
    private _ensureCacheMap;
    private _createFormulaId;
    private _initFormulaRegister;
    private _initFormulaCalculationResultChange;
    registerFormulaWithRange(unitId: string, subUnitId: string, formulaText: string, ranges?: IRange[], extra?: Record<string, any>, bizType?: OtherFormulaBizType, bizId?: string): string;
    deleteFormula(unitId: string, subUnitId: string, formulaIdList: string[]): void;
    getFormulaValue(unitId: string, subUnitId: string, formulaId: string): Promise<Nullable<IOtherFormulaResult>>;
    getFormulaValueSync(unitId: string, subUnitId: string, formulaId: string): Nullable<IOtherFormulaResult>;
    markFormulaDirty(unitId: string, subUnitId: string, formulaId: string): void;
}
