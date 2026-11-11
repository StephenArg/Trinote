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
import type { Injector, IParagraph, IParagraphStyle } from '@univerjs/core';
import type { FDocument } from './f-document';
import type { IFDocumentTextRange } from './utils';
import { ICommandService, IPermissionService } from '@univerjs/core';
import { FBaseInitialable } from '@univerjs/core/facade';
import { FDocumentObjectPermission } from './f-document-permission';
import { FDocumentTextRange } from './f-document-text-range';
/**
 * Resolved paragraph metadata in the the document body.
 */
export interface IFDocumentParagraphInfo {
    /** The underlying paragraph snapshot object. */
    paragraph: IParagraph;
    /** The current paragraph index in the body paragraph list. */
    paragraphIndex: number;
    /** The inclusive start offset of the paragraph text. */
    startOffset: number;
    /** The exclusive end offset of the paragraph text, before the paragraph break. */
    endOffset: number;
}
/**
 * Options for locating text inside a document paragraph.
 */
export interface IFDocumentFindTextOptions {
    /**
     * Whether matching is case-sensitive.
     * @default true
     */
    matchCase?: boolean;
    /**
     * Zero-based occurrence to return from {@link FDocumentParagraph.findText}.
     * @default 0
     */
    occurrence?: number;
}
/**
 * A paragraph facade wrapper.
 *
 * Paragraph identity is backed by the persisted `paragraphId`. The id is
 * re-resolved before each method call, so insertions before this paragraph do
 * not break the wrapper.
 *
 * @hideconstructor
 */
export declare class FDocumentParagraph extends FBaseInitialable {
    protected readonly _document: FDocument;
    protected readonly _paragraphId: string;
    protected readonly _segmentId: string;
    protected readonly _injector: Injector;
    private readonly _commandService;
    private readonly _permissionService;
    constructor(_document: FDocument, _paragraphId: string, _segmentId: string | undefined, _injector: Injector, _commandService: ICommandService, _permissionService: IPermissionService);
    /**
     * Get the persisted paragraph id.
     * @returns {string} The paragraph id.
     * @example
     * ```ts
     * const fDocument = univerAPI.getActiveDocument();
     * const paragraph = fDocument.getParagraphs()[0];
     * console.log(paragraph?.getId());
     * ```
     */
    getId(): string;
    /**
     * Get the segment id of this paragraph.
     * The main body paragraphs have an empty string segment id.
     * The header and footer paragraphs have a non-empty string segment id.
     * @returns {string} The segment id.
     * @example
     * ```ts
     * const fDocument = univerAPI.getActiveDocument();
     * const paragraph = fDocument.getParagraphs()[0];
     * console.log(paragraph?.getSegmentId());
     * ```
     */
    getSegmentId(): string;
    /**
     * Returns this Paragraph's permission facade.
     * @returns {FDocumentObjectPermission} Permission facade combining Document, Section, and Paragraph Edit points.
     * @example
     * ```ts
     * const paragraph = univerAPI.getActiveDocument()?.getParagraphs()[0];
     * if (!paragraph) throw new Error('Paragraph not found.');
     * await paragraph.getPermission().setReadOnly();
     * ```
     */
    getPermission(): FDocumentObjectPermission;
    /**
     * Get this paragraph's metadata.
     * @returns {IFDocumentParagraphInfo} The paragraph info.
     * @example
     * ```ts
     * const fDocument = univerAPI.getActiveDocument();
     * const paragraph = fDocument.getParagraphs()[0];
     * console.log(paragraph?.getInfo());
     * ```
     */
    getInfo(): IFDocumentParagraphInfo;
    /**
     * Get the current text range occupied by this paragraph.
     * @returns {IFDocumentTextRange} The paragraph text range, excluding the trailing paragraph break.
     * @example
     * ```ts
     * const fDocument = univerAPI.getActiveDocument();
     * const paragraph = fDocument.getParagraphs()[0];
     * console.log(paragraph?.getRange());
     * ```
     */
    getRange(): IFDocumentTextRange;
    /**
     * Returns an agent-friendly facade for reading and styling this paragraph's text.
     * @returns {FDocumentTextRange} The paragraph text range, excluding the trailing paragraph break.
     * @example
     * ```ts
     * const fDocument = univerAPI.getActiveDocument();
     * const paragraph = fDocument?.findParagraphByText('Launch');
     * const range = paragraph?.getTextRange();
     * console.log(range?.describe());
     * ```
     */
    getTextRange(): FDocumentTextRange;
    /**
     * Finds one literal text occurrence inside this paragraph.
     *
     * The returned text range is fixed when it is created. Resolve a new range
     * after edits that insert or remove content before the match.
     *
     * @param {string} text Literal text to find. It must not be empty.
     * @param {IFDocumentFindTextOptions} [options] Case sensitivity and zero-based occurrence.
     * @returns {FDocumentTextRange | null} The matching fixed text range, or `null` when no such occurrence exists.
     * @example
     * ```ts
     * const univerAPI = FUniver.newAPI(univer);
     * const document = univerAPI.getActiveDocument();
     * if (!document) throw new Error('No active document');
     *
     * const paragraph = document.findParagraphByText('Launch formula');
     * if (!paragraph) throw new Error('Target paragraph not found');
     *
     * const range = paragraph.findText('formula');
     * if (!range) throw new Error('Target text not found');
     *
     * console.log(range.describe());
     * ```
     */
    findText(text: string, options?: IFDocumentFindTextOptions): FDocumentTextRange | null;
    /**
     * Finds every non-overlapping literal text occurrence inside this paragraph.
     *
     * Results are ordered from the start of the paragraph. The returned ranges
     * are fixed when created; use them immediately and resolve new ranges after
     * edits that change earlier document content.
     *
     * @param {string} text Literal text to find. It must not be empty.
     * @param {Omit<IFDocumentFindTextOptions, 'occurrence'>} [options] Case-sensitivity option.
     * @returns {FDocumentTextRange[]} All matching fixed text ranges, or an empty array when no matches exist.
     * @example
     * ```ts
     * const univerAPI = FUniver.newAPI(univer);
     * const document = univerAPI.getActiveDocument();
     * if (!document) throw new Error('No active document');
     *
     * const paragraph = document.findParagraphByText('x plus x');
     * if (!paragraph) throw new Error('Target paragraph not found');
     *
     * const matches = paragraph.findAllText('x');
     * console.log(matches.map((range) => range.describe()));
     * ```
     */
    findAllText(text: string, options?: Omit<IFDocumentFindTextOptions, 'occurrence'>): FDocumentTextRange[];
    /**
     * Get this paragraph's plain text.
     * @returns {string} The paragraph text without the trailing paragraph break.
     * @example
     * ```ts
     * const fDocument = univerAPI.getActiveDocument();
     * const paragraph = fDocument.getParagraphs()[0];
     * console.log(paragraph?.getText());
     * ```
     */
    getText(): string;
    /**
     * Replace this paragraph's plain text.
     * @param {string} text The replacement text. Do not include the paragraph break.
     * @returns {boolean} `true` if the paragraph text was replaced.
     * @example
     * ```ts
     * const fDocument = univerAPI.getActiveDocument();
     * const paragraph = fDocument.getParagraphs()[0];
     * paragraph?.setText('New text');
     * console.log(paragraph?.getText());
     * ```
     */
    setText(text: string): boolean;
    /**
     * Append plain text before this paragraph's trailing paragraph break.
     * @param {string} text The plain text to append.
     * @returns {boolean} `true` if the text was appended.
     * @example
     * ```ts
     * const fDocument = univerAPI.getActiveDocument();
     * const paragraph = fDocument.getParagraphs()[0];
     * paragraph?.appendText(' Appended text');
     * console.log(paragraph?.getText());
     * ```
     */
    appendText(text: string): boolean;
    /**
     * Applies a paragraph and optional text-style patch through one document command.
     *
     * Pagination values use `BooleanNumber.TRUE` or `BooleanNumber.FALSE`; explicit
     * false is preserved and overrides inherited true. The paragraph and text-style
     * changes share one undo/redo item. A stale paragraph handle returns `false`
     * without applying a partial update.
     *
     * The Traditional renderer applies these Word-compatible pagination rules:
     * use `pageBreakBefore` for a hard chapter-page boundary, `keepLines` for a
     * short paragraph that should stay intact, `keepNext` for a heading or caption
     * that should accompany the next paragraph, and `widowControl` for natural
     * multi-line body text. Do not enable every rule on every paragraph. Modern
     * and Unspecified Docs preserve the values in the model but do not apply them
     * to physical pages.
     *
     * `style.textStyle.fs` is a font size in points (pt), not CSS pixels.
     * @param {IParagraphStyle} style The Univer paragraph style patch.
     * @returns {boolean} `true` when the complete patch was applied; otherwise `false`.
     * @example
     * ```ts
     * const document = univerAPI.getActiveDocument();
     * if (!document) {
     *   throw new Error('No active document');
     * }
     * if (!document.isTraditional()) {
     *   throw new Error('Traditional document pagination is required');
     * }
     * const heading = document.findParagraphByText('Appendix');
     * const following = document.findParagraphByText('Supporting details');
     * if (!heading || !following) {
     *   throw new Error('Expected paragraphs were not found');
     * }
     *
     * const headingUpdated = heading.setStyle({
     *   pageBreakBefore: univerAPI.Enum.BooleanNumber.TRUE,
     *   keepLines: univerAPI.Enum.BooleanNumber.TRUE,
     *   keepNext: univerAPI.Enum.BooleanNumber.TRUE,
     * });
     * const followingUpdated = following.setStyle({
     *   // Explicit FALSE terminates this authored keepNext chain even if a named
     *   // style or document default enables it.
     *   keepNext: univerAPI.Enum.BooleanNumber.FALSE,
     *   widowControl: univerAPI.Enum.BooleanNumber.TRUE,
     * });
     * if (!headingUpdated || !followingUpdated) {
     *   throw new Error('Failed to update paragraph pagination');
     * }
     * ```
     */
    setStyle(style: IParagraphStyle): boolean;
    /**
     * Check whether this paragraph is a bullet, ordered, or checklist item.
     * @returns {boolean} `true` if the paragraph has list metadata.
     * @example
     * ```ts
     * const fDocument = univerAPI.getActiveDocument();
     * const paragraph = fDocument.getParagraphs()[0];
     * console.log(paragraph?.isListItem());
     * ```
     */
    isListItem(): boolean;
    /**
     * Check whether this paragraph is a task/checklist item.
     * @returns {boolean} `true` if this paragraph is an unchecked or checked task item.
     * @example
     * ```ts
     * const fDocument = univerAPI.getActiveDocument();
     * const paragraph = fDocument.getParagraphs()[0];
     * console.log(paragraph?.isTask());
     * ```
     */
    isTask(): boolean;
    /**
     * Set the checked state of this task/checklist paragraph.
     * @param {boolean} checked Whether the task item should be checked.
     * @returns {boolean} `true` if the task state was updated, or `false` if this paragraph is not a task item.
     * @example
     * ```ts
     * const fDocument = univerAPI.getActiveDocument();
     * const paragraph = fDocument.getParagraphs()[0];
     *
     * if (paragraph.isTask()) {
     *   const success = paragraph.setTaskChecked(true);
     *   console.log(success ? 'Task checked' : 'Failed to check task');
     * }
     * ```
     */
    setTaskChecked(checked: boolean): boolean;
    /**
     * Remove this paragraph.
     * @returns {boolean} `true` if the paragraph was removed.
     * @example
     * ```ts
     * const fDocument = univerAPI.getActiveDocument();
     * const paragraph = fDocument.getParagraphs()[0];
     * const success = paragraph?.remove();
     * console.log(success ? 'Paragraph removed' : 'Failed to remove paragraph');
     * ```
     */
    remove(): boolean;
    private _preserveExplicitParagraphIds;
}
export declare function isParagraphFacade(value: unknown): value is FDocumentParagraph;
