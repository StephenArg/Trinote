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
import type { IDocumentBody } from '@univerjs/core';
import type { IThreadCommentMention } from '@univerjs/thread-comment';
interface IThreadCommentEditorFocusService {
    focus: (editorId: string) => void;
}
interface IFocusableThreadCommentEditor {
    focus: () => void;
}
export type TextNode = {
    type: 'text';
    content: string;
} | {
    type: 'mention';
    content: IThreadCommentMention;
};
export declare const transformDocument2TextNodes: (doc: IDocumentBody) => TextNode[][];
export declare const transformTextNodes2Document: (nodes: TextNode[]) => IDocumentBody;
export declare function focusThreadCommentEditor(editorService: IThreadCommentEditorFocusService, editorId: string, editor?: IFocusableThreadCommentEditor | null): void;
export {};
