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
import type { IDocumentBody, Nullable } from '@univerjs/core';
import { FRange } from '@univerjs/sheets/facade';
import { FTheadCommentBuilder, FThreadComment } from './f-thread-comment';
/**
 * @ignore
 */
export interface IFRangeSheetsThreadCommentMixin {
    /**
     * Get the comment of the start cell in the current range.
     * @returns {FThreadComment | null} The comment of the start cell in the current range. If the cell does not have a comment, return `null`.
     * @example
     * ```ts
     * const fWorksheet = univerAPI.getActiveWorkbook().getSheetByName('Sheet1');
     * if (!fWorksheet) return;
     * const range = fWorksheet.getActiveRange();
     * const comment = range.getComment();
     * ```
     */
    getComment(): Nullable<FThreadComment>;
    /**
     * Get the comments in the current range.
     * @returns {FThreadComment[]} The comments in the current range.
     * @example
     * ```ts
     * const fWorksheet = univerAPI.getActiveWorkbook().getSheetByName('Sheet1');
     * if (!fWorksheet) return;
     * const range = fWorksheet.getActiveRange();
     * const comments = range.getComments();
     * comments.forEach((comment) => {
     *   console.log(comment.getContent());
     * });
     * ```
     */
    getComments(): FThreadComment[];
    /**
     * @deprecated use `addCommentAsync` as instead.
     */
    addComment(content: IDocumentBody | FTheadCommentBuilder): Promise<boolean>;
    /**
     * Add a comment to the start cell in the current range.
     * @param content The content of the comment.
     * @returns Whether the comment is added successfully.
     * @example
     * ```ts
     * // Create a new comment
     * const richText = univerAPI.newRichText().insertText('hello univer');
     * const commentBuilder = univerAPI.newTheadComment()
     *   .setContent(richText);
     * console.log(commentBuilder.content.toPlainText());
     *
     * // Add the comment to the cell A1
     * const fWorkbook = univerAPI.getActiveWorkbook();
     * const fWorksheet = fWorkbook.getSheetByName('Sheet1');
     * if (!fWorksheet) return;
     * const cell = fWorksheet.getRange('A1');
     * const result = await cell.addCommentAsync(commentBuilder);
     * console.log(result);
     * ```
     */
    addCommentAsync(content: IDocumentBody | FTheadCommentBuilder): Promise<boolean>;
    /**
     * @deprecated use `clearCommentAsync` as instead.
     */
    clearComment(): Promise<boolean>;
    /**
     * Clear the comment of the start cell in the current range.
     * @returns Whether the comment is cleared successfully.
     */
    clearCommentAsync(): Promise<boolean>;
    /**
     * @deprecated use `clearCommentsAsync` as instead.
     */
    clearComments(): Promise<boolean>;
    /**
     * Clear all of the comments in the current range.
     * @returns Whether the comments are cleared successfully.
     * @example
     * ```ts
     * const fWorksheet = univerAPI.getActiveWorkbook().getSheetByName('Sheet1');
     * if (!fWorksheet) return;
     * const range = fWorksheet.getActiveRange();
     * const success = await range.clearCommentsAsync();
     * ```
     */
    clearCommentsAsync(): Promise<boolean>;
}
/**
 * @ignore
 */
export declare class FRangeSheetsThreadCommentMixin extends FRange implements IFRangeSheetsThreadCommentMixin {
    getComment(): Nullable<FThreadComment>;
    getComments(): FThreadComment[];
    addComment(content: IDocumentBody | FTheadCommentBuilder): Promise<boolean>;
    clearComment(): Promise<boolean>;
    clearComments(): Promise<boolean>;
    addCommentAsync(content: IDocumentBody | FTheadCommentBuilder): Promise<boolean>;
    clearCommentAsync(): Promise<boolean>;
    clearCommentsAsync(): Promise<boolean>;
}
declare module '@univerjs/sheets/facade' {
    interface FRange extends IFRangeSheetsThreadCommentMixin {
    }
}
