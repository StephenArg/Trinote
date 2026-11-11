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
import type { ICommandInfo, IDisposable, IMutationInfo } from '@univerjs/core';
import type { SpreadsheetSkeleton } from '@univerjs/engine-render';
import type { ISheetDrawing } from './sheet-drawing.service';
export interface ISheetDrawingTransformPlan {
    command: ICommandInfo;
    mode: 'command' | 'refresh';
    unitId: string;
    subUnitId: string;
    skeleton: SpreadsheetSkeleton;
    originals: ReadonlyMap<string, ISheetDrawing>;
    updates: Map<string, ISheetDrawing>;
    deletes: Set<string>;
}
export interface ISheetDrawingTransformExtensionResult {
    preRedos?: IMutationInfo[];
    redos?: IMutationInfo[];
    preUndos?: IMutationInfo[];
    undos?: IMutationInfo[];
}
export interface ISheetDrawingTransformExtension {
    priority?: number;
    transform(plan: ISheetDrawingTransformPlan): ISheetDrawingTransformExtensionResult | void;
}
export declare class SheetDrawingTransformPlanService {
    private readonly _extensions;
    register(extension: ISheetDrawingTransformExtension): IDisposable;
    transform(plan: ISheetDrawingTransformPlan): Required<ISheetDrawingTransformExtensionResult>;
}
