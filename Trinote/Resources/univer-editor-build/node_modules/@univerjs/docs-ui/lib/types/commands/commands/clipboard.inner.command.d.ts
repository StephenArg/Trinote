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
import type { DocumentDataModel, ICommand, IDocumentBody, IDocumentData, ITextRange, JSONXActions, Nullable } from '@univerjs/core';
import type { DocumentViewModel, IRectRangeWithStyle, ITextRangeWithStyle } from '@univerjs/engine-render';
export declare function getCustomBlockIdsInSelections(body: IDocumentBody, selections: ITextRange[]): string[];
export interface IInnerPasteCommandParams {
    segmentId: string;
    doc: Partial<IDocumentData>;
    textRanges: ITextRangeWithStyle[];
}
export declare const InnerPasteCommand: ICommand<IInnerPasteCommandParams>;
export declare function getCutActionsFromDocRanges(textRanges: Readonly<Nullable<ITextRangeWithStyle[]>>, rectRanges: Readonly<Nullable<IRectRangeWithStyle[]>>, docDataModel: DocumentDataModel, viewModel: DocumentViewModel, segmentId: string): JSONXActions;
export interface IInnerCutCommandParams {
    segmentId: string;
    textRanges: ITextRangeWithStyle[];
    selections?: ITextRange[];
    rectRanges?: IRectRangeWithStyle[];
}
export declare const CutContentCommand: ICommand<IInnerCutCommandParams>;
