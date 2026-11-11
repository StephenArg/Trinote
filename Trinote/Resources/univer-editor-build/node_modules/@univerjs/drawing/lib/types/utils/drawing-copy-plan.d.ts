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
import type { IDrawingParam } from '@univerjs/core';
/**
 * A command-scoped cache key shared by sheet-copy interceptors so every drawing model
 * resolves against the same copied drawing IDs.
 */
export declare const DRAWING_COPY_CONTEXT_KEY = "univer.drawing.copy-plan";
export interface ICreateDrawingCopyPlanOptions {
    unitId: string;
    sourceSubUnitId: string;
    targetSubUnitId: string;
    generateId?: () => string;
}
export interface IDrawingCopyPlan<T extends IDrawingParam = IDrawingParam> {
    idMap: Map<string, string>;
    drawings: T[];
}
export declare function createDrawingCopyPlan<T extends IDrawingParam>(drawings: readonly T[], options: ICreateDrawingCopyPlanOptions): IDrawingCopyPlan<T>;
export declare function getOrCreateDrawingCopyPlan<T extends IDrawingParam>(copyContext: Map<string, unknown> | undefined, drawings: readonly T[], options: ICreateDrawingCopyPlanOptions): IDrawingCopyPlan<T>;
