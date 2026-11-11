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
import { FDocument } from '@univerjs/docs/facade';
interface IFDocumentUIMixin {
    setSelection(startOffset: number, endOffset: number): void;
}
export declare class FDocumentUIMixin extends FDocument implements IFDocumentUIMixin {
    /**
     * Sets the selection to a specified text range in the document.
     * A computed offscreen target is selected after its render data is loaded.
     * A newer pointer/selection action or changed text supersedes that request.
     * @param startOffset - The starting offset of the selection in the document.
     * @param endOffset - The ending offset of the selection in the document.
     * @example
     * ```typescript
     * const fDocument = univerAPI.getActiveDocument();
     * fDocument.setSelection(10, 20);
     * ```
     */
    setSelection(startOffset: number, endOffset: number): void;
}
declare module '@univerjs/docs/facade' {
    interface FDocument extends IFDocumentUIMixin {
    }
}
export {};
