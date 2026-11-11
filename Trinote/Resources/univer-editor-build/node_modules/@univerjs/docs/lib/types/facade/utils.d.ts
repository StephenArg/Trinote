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
import type { DocumentDataModel, IDocumentBody, Injector, IParagraphStyle, UpdateDocsAttributeType } from '@univerjs/core';
import { ICommandService } from '@univerjs/core';
export interface IBuildPlainTextInsertBodyOptions {
    paragraphStyle?: IParagraphStyle;
    removeLeadingParagraphBreak?: boolean;
}
/**
 * A text range in a document segment. Offsets are zero-based positions in the segment data stream.
 */
export interface IFDocumentTextRange {
    /** The inclusive start offset of the range. */
    startOffset: number;
    /** The exclusive end offset of the range. */
    endOffset: number;
    /** The header/footer segment id. Omit or use an empty string for the main body. */
    segmentId?: string;
}
export declare function getRemovedLeadingParagraphBreakLength(dataStream: string, removeLeadingParagraphBreak?: boolean): number;
export declare function getNormalizedPlainTextCursorOffset(dataStream: string, cursorOffset: number, removeLeadingParagraphBreak?: boolean): number;
export declare function getParagraphStyleAtOffset(body: IDocumentBody, offset: number): IParagraphStyle | undefined;
export declare function buildPlainTextInsertBody(dataStream: string, options?: IBuildPlainTextInsertBodyOptions): IDocumentBody;
export declare function replaceBodyRange(range: IFDocumentTextRange, insertBody: IDocumentBody, docDataModel: DocumentDataModel, commandService: ICommandService): boolean;
export declare function retainBodyRange(range: IFDocumentTextRange, updateBody: IDocumentBody, coverType: UpdateDocsAttributeType, docDataModel: DocumentDataModel, injector: Injector): boolean;
export declare function stripBlockTokens(text: string): string;
