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
import type { ICommand, IDocumentBody, IDocumentData, ITextRange } from '@univerjs/core';
import type { ITextRangeWithStyle } from '@univerjs/engine-render';
export interface IReplaceSnapshotCommandParams {
    unitId: string;
    snapshot: IDocumentData;
    textRanges: ITextRangeWithStyle[];
    segmentId?: string;
    options: {
        [key: string]: boolean;
    };
}
export declare const ReplaceSnapshotCommand: ICommand<IReplaceSnapshotCommandParams>;
interface IReplaceContentCommandParams {
    unitId: string;
    body: IDocumentBody;
    textRanges: ITextRangeWithStyle[];
    segmentId?: string;
    options: {
        [key: string]: boolean;
    };
}
/**
 * @deprecated please use ReplaceSnapshotCommand instead.
 */
export declare const ReplaceContentCommand: ICommand<IReplaceContentCommandParams>;
interface ICoverContentCommandParams {
    unitId: string;
    body: IDocumentBody;
    segmentId?: string;
    textRanges?: ITextRangeWithStyle[];
}
export declare const CoverContentCommand: ICommand<ICoverContentCommandParams>;
export interface IReplaceSelectionCommandParams {
    unitId: string;
    selection?: ITextRange;
    body: IDocumentBody;
    textRanges?: ITextRangeWithStyle[];
}
export declare const ReplaceSelectionCommand: ICommand<IReplaceSelectionCommandParams>;
export declare const ReplaceTextRunsCommand: ICommand<IReplaceContentCommandParams>;
export {};
