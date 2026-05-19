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
import type { IMutation } from '@univerjs/core';
import type { IFeatureCalculationManagerParam } from '../../services/feature-calculation-manager.service';
export interface ISetFeatureCalculationMutation {
    featureId: string;
    calculationParam: IFeatureCalculationManagerParam;
}
/**
 * In the formula engine, the mutation is solely responsible for communication between the worker and the main thread.
 * It requires setting local to true during execution.
 */
export declare const SetFeatureCalculationMutation: IMutation<ISetFeatureCalculationMutation>;
export interface IRemoveFeatureCalculationMutationParam {
    featureIds: string[];
    unitId: string;
    subUnitId: string;
}
export declare const RemoveFeatureCalculationMutation: IMutation<IRemoveFeatureCalculationMutationParam>;
