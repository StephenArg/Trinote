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
import type { DocumentDataModel, Nullable } from '@univerjs/core';
import type { IRichTextEditingMutationParams } from '@univerjs/docs';
import type { IRenderContext, IRenderModule, ITextRangeWithStyle } from '@univerjs/engine-render';
import { RxDisposable } from '@univerjs/core';
interface ICacheParams {
    undoCache: IRichTextEditingMutationParams[];
    redoCache: IRichTextEditingMutationParams[];
}
export declare class DocIMEInputManagerService extends RxDisposable implements IRenderModule {
    private readonly _context;
    private _previousActiveRange;
    private _undoMutationParamsCache;
    private _redoMutationParamsCache;
    constructor(_context: IRenderContext<DocumentDataModel>);
    clearUndoRedoMutationParamsCache(): void;
    getUndoRedoMutationParamsCache(): {
        undoCache: IRichTextEditingMutationParams[];
        redoCache: IRichTextEditingMutationParams[];
    };
    setUndoRedoMutationParamsCache({ undoCache, redoCache }: ICacheParams): void;
    getActiveRange(): Nullable<ITextRangeWithStyle>;
    setActiveRange(range: Nullable<ITextRangeWithStyle>): void;
    pushUndoRedoMutationParams(undoParams: IRichTextEditingMutationParams, redoParams: IRichTextEditingMutationParams): void;
    fetchComposedUndoRedoMutationParams(): {
        redoMutationParams: IRichTextEditingMutationParams;
        undoMutationParams: IRichTextEditingMutationParams;
        previousActiveRange: ITextRangeWithStyle;
    } | null;
    dispose(): void;
}
export {};
