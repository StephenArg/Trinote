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
import type { Nullable } from '@univerjs/core';
import type { Documents, DocumentSkeleton, Engine, IDocumentSkeletonGlyph, INodePosition, IRectRangeWithStyle, ITextRangeWithStyle, ITextSelectionStyle, Scene } from '@univerjs/engine-render';
import type { IDocRange } from './range-interface';
import { RectRange } from './rect-range';
import { TextRange } from './text-range';
interface IDocRangeList {
    textRanges: TextRange[];
    rectRanges: RectRange[];
}
export declare function getTextRangeFromCharIndex(startOffset: number, endOffset: number, scene: Scene, document: Documents, skeleton: DocumentSkeleton, style: ITextSelectionStyle, segmentId: string, segmentPage: number, startIsBack?: boolean, endIsBack?: boolean): Nullable<TextRange>;
export declare function getRectRangeFromCharIndex(startOffset: number, endOffset: number, scene: Scene, document: Documents, skeleton: DocumentSkeleton, style: ITextSelectionStyle, segmentId: string, segmentPage: number): Nullable<RectRange>;
export declare function getRangeListFromCharIndex(startOffset: number, endOffset: number, scene: Scene, document: Documents, skeleton: DocumentSkeleton, style: ITextSelectionStyle, segmentId: string, segmentPage: number): Nullable<IDocRangeList>;
export declare function getRangeListFromSelection(anchorPosition: INodePosition, focusPosition: INodePosition, scene: Scene, document: Documents, skeleton: DocumentSkeleton, style: ITextSelectionStyle, segmentId: string, segmentPage: number): Nullable<IDocRangeList>;
export declare function getCanvasOffsetByEngine(engine: Nullable<Engine>): {
    left: number;
    top: number;
};
export declare function getParagraphInfoByGlyph(node: IDocumentSkeletonGlyph): {
    st: number;
    ed: number;
    content: string;
    nodeIndex: number;
} | undefined;
export declare function serializeTextRange(textRange: IDocRange): ITextRangeWithStyle;
export declare function serializeRectRange(rectRange: RectRange): IRectRangeWithStyle;
export {};
