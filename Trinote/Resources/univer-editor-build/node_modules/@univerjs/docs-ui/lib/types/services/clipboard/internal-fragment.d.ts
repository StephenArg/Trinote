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
import type { IDocumentData } from '@univerjs/core';
export declare const DOC_INTERNAL_FRAGMENT_MIME = "application/x-doc-fragment+json";
export declare const DOC_INTERNAL_FRAGMENT_COMMENT_PREFIX = "univer-doc-fragment:";
export interface IDocInternalClipboardFragment {
    version: 1;
    kind: 'univer-doc-fragment';
    doc: Partial<IDocumentData>;
}
export declare function createInternalClipboardFragment(doc: Partial<IDocumentData>): string;
export declare function parseInternalClipboardFragment(value?: string): Partial<IDocumentData> | null;
export declare function createInternalClipboardDocData(doc: IDocumentData): Partial<IDocumentData>;
export declare function createInternalClipboardDocDataList(docs: IDocumentData[]): Partial<IDocumentData> | null;
export declare function embedInternalClipboardFragment(html: string, fragmentJson: string): string;
export declare function extractInternalClipboardFragmentFromHtml(html?: string): Partial<IDocumentData> | null;
export declare function wrapClipboardHtml(fragmentHtml: string): string;
