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
import type { IDocDrawingBase, IMutationInfo, JSONXActions } from '@univerjs/core';
import type { IRichTextEditingMutationParams } from './commands/mutations/core-editing.mutation';
import { UniverInstanceType } from '@univerjs/core';
export interface IDocsCustomBlockMutationParams {
    unitId: string;
    blockId: string;
    startIndex: number;
    segmentId?: string;
    drawingOrderIndex?: number;
    embedId?: string;
    childUnitId?: string;
    childType?: UniverInstanceType;
    componentKey?: string;
    interactionMode?: EmbedDocsCustomBlockInteractionMode;
}
export declare const EMBED_DOCS_CUSTOM_BLOCK_DEFAULT_COMPONENT_KEY = "UniverEmbedDocsCustomBlock";
export type EmbedDocsCustomBlockInteractionMode = 'block' | 'inline';
export interface IEmbedDocsCustomBlockData {
    version: 1;
    embedId: string;
    hostUnitId?: string;
    hostAnchorId: string;
    childUnitId?: string;
    childType?: UniverInstanceType;
    interactionMode?: EmbedDocsCustomBlockInteractionMode;
}
export declare function createDocsCustomBlockInsertMutation(params: IDocsCustomBlockMutationParams): IMutationInfo<IRichTextEditingMutationParams>;
export declare function createDocsCustomBlockRemoveMutation(params: IDocsCustomBlockMutationParams): IMutationInfo<IRichTextEditingMutationParams>;
export declare function createInsertCustomBlockActions(params: IDocsCustomBlockMutationParams): JSONXActions;
export declare function createRemoveCustomBlockActions(params: IDocsCustomBlockMutationParams): JSONXActions;
export declare function createDocsCustomBlockDrawing(params: IDocsCustomBlockMutationParams): IDocDrawingBase;
export declare function resolveDocsCustomBlockSize(childType?: UniverInstanceType): {
    width: number;
    height: number;
};
export declare function isSheetLikeDocsCustomBlockChildType(childType?: UniverInstanceType): boolean;
export declare function createEmbedDocsCustomBlockData(params: {
    blockId: string;
    embedId?: string;
    unitId?: string;
    childUnitId?: string;
    childType?: UniverInstanceType;
    interactionMode?: EmbedDocsCustomBlockInteractionMode;
}): IEmbedDocsCustomBlockData;
export declare function isEmbedDocsCustomBlockData(data: unknown): data is IEmbedDocsCustomBlockData;
export declare function shouldUseInlineTextSelectionForDocsCustomBlockDrawing(drawing: unknown): boolean;
