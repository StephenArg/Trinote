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
import type { ICustomRange, IDisposable, IDocumentBlockRange, IDocumentBody, IDocumentData, IDrawingParam, IMutationInfo } from '@univerjs/core';
export interface IDocClipboardPasteCustomBlockMapping {
    sourceBlockId: string;
    targetBlockId: string;
    sourceDrawing: IDrawingParam;
    targetDrawing: IDrawingParam;
}
export interface IDocClipboardPasteBlockRangeMapping {
    sourceBlockRange: IDocumentBlockRange;
    targetBlockRange: IDocumentBlockRange;
}
export interface IDocClipboardPasteCustomRangeMapping {
    sourceRange: ICustomRange;
    targetRange: ICustomRange;
}
export interface IDocClipboardPasteMutationInfoParams {
    unitId: string;
    segmentId: string;
    doc: Partial<IDocumentData>;
    sourceBody: IDocumentBody;
    targetBody: IDocumentBody;
    blockRangeMappings: IDocClipboardPasteBlockRangeMapping[];
    customRangeMappings?: IDocClipboardPasteCustomRangeMapping[];
    customBlockMappings: IDocClipboardPasteCustomBlockMapping[];
}
export interface IDocClipboardPasteMutationInfos {
    redoMutations: IMutationInfo[];
    undoMutations: IMutationInfo[];
}
export interface IDocClipboardPasteAdapter {
    getPasteMutationInfos?: (params: IDocClipboardPasteMutationInfoParams) => IDocClipboardPasteMutationInfos | null | undefined;
}
export interface IDocClipboardPasteAdapterService {
    registerAdapter(adapter: IDocClipboardPasteAdapter): IDisposable;
    getPasteMutationInfos(params: IDocClipboardPasteMutationInfoParams): IDocClipboardPasteMutationInfos;
}
export declare const IDocClipboardPasteAdapterService: import("@wendellhu/redi").IdentifierDecorator<IDocClipboardPasteAdapterService>;
export declare class DocClipboardPasteAdapterService implements IDocClipboardPasteAdapterService {
    private readonly _adapters;
    registerAdapter(adapter: IDocClipboardPasteAdapter): IDisposable;
    getPasteMutationInfos(params: IDocClipboardPasteMutationInfoParams): IDocClipboardPasteMutationInfos;
}
