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
import type { IDisposable, IMutationInfo } from '@univerjs/core';
import type { IDocDrawing } from './doc-drawing.service';
export interface IDocDrawingRemoveMutationInfoParams {
    unitId: string;
    subUnitId: string;
    drawing: IDocDrawing;
    removeDrawings: readonly IDocDrawing[];
}
export interface IDocDrawingEditCommandInfoParams {
    unitId: string;
    subUnitId: string;
    drawing: IDocDrawing;
}
export interface IDocDrawingMutationInfos {
    redoMutations: IMutationInfo[];
    undoMutations: IMutationInfo[];
}
export interface IDocDrawingEditCommandInfo {
    label?: string;
    commandId: string;
    commandParams?: unknown;
    disable?: boolean;
}
export interface IDocDrawingAdapter {
    getRemoveDrawingMutationInfos?: (params: IDocDrawingRemoveMutationInfoParams) => IDocDrawingMutationInfos | null | undefined;
    getEditDrawingCommandInfo?: (params: IDocDrawingEditCommandInfoParams) => IDocDrawingEditCommandInfo | null | undefined;
}
export interface IDocDrawingAdapterService {
    registerAdapter(adapter: IDocDrawingAdapter): IDisposable;
    getRemoveDrawingMutationInfos(params: IDocDrawingRemoveMutationInfoParams): IDocDrawingMutationInfos;
    getEditDrawingCommandInfo(params: IDocDrawingEditCommandInfoParams): IDocDrawingEditCommandInfo | null;
}
export declare const IDocDrawingAdapterService: import("@wendellhu/redi").IdentifierDecorator<IDocDrawingAdapterService>;
export declare class DocDrawingAdapterService implements IDocDrawingAdapterService {
    private readonly _adapters;
    registerAdapter(adapter: IDocDrawingAdapter): IDisposable;
    getRemoveDrawingMutationInfos(params: IDocDrawingRemoveMutationInfoParams): IDocDrawingMutationInfos;
    getEditDrawingCommandInfo(params: IDocDrawingEditCommandInfoParams): IDocDrawingEditCommandInfo | null;
}
