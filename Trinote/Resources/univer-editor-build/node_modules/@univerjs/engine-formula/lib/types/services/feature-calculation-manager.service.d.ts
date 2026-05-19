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
import type { IUnitRange, Nullable } from '@univerjs/core';
import type { Observable } from 'rxjs';
import type { IFeatureDirtyRangeType, IRuntimeUnitDataType } from '../basics/common';
import type { IRemoveFeatureCalculationMutationParam } from '../commands/mutations/set-feature-calculation.mutation';
import type { IFormulaDirtyData } from './current-data.service';
import type { IAllRuntimeData } from './runtime.service';
import { Disposable } from '@univerjs/core';
export interface IFeatureCalculationManagerParam {
    unitId: string;
    subUnitId: string;
    dependencyRanges: IUnitRange[];
    getDirtyData: (dirtyData: IFormulaDirtyData, runtimeData: IAllRuntimeData) => {
        runtimeCellData: IRuntimeUnitDataType;
        dirtyRanges: IFeatureDirtyRangeType;
    };
}
export interface IFeatureCalculationManagerService {
    dispose(): void;
    remove(unitId: string, subUnitId: string, featureIds: string[]): void;
    get(unitId: string, subUnitId: string, featureId: string): Nullable<IFeatureCalculationManagerParam>;
    has(unitId: string, subUnitId: string, featureId: string): boolean;
    register(unitId: string, subUnitId: string, featureId: string, referenceExecutor: IFeatureCalculationManagerParam): void;
    getReferenceExecutorMap(): Map<string, Map<string, Map<string, IFeatureCalculationManagerParam>>>;
    onChanged$: Observable<IRemoveFeatureCalculationMutationParam>;
}
/**
 * Passively marked as dirty, register the reference and execution actions of the feature plugin.
 * After execution, a dirty area and calculated data will be returned,
 * causing the formula to be marked dirty again,
 * thereby completing the calculation of the entire dependency tree.
 */
export declare class FeatureCalculationManagerService extends Disposable implements IFeatureCalculationManagerService {
    private _referenceExecutorMap;
    private _onChanged$;
    readonly onChanged$: Observable<IRemoveFeatureCalculationMutationParam>;
    dispose(): void;
    remove(unitId: string, subUnitId: string, featureIds: string[]): void;
    get(unitId: string, subUnitId: string, featureId: string): IFeatureCalculationManagerParam | undefined;
    has(unitId: string, subUnitId: string, featureId: string): boolean;
    register(unitId: string, subUnitId: string, featureId: string, referenceExecutor: IFeatureCalculationManagerParam): void;
    getReferenceExecutorMap(): Map<string, Map<string, Map<string, IFeatureCalculationManagerParam>>>;
}
export declare const IFeatureCalculationManagerService: import("@wendellhu/redi").IdentifierDecorator<IFeatureCalculationManagerService>;
