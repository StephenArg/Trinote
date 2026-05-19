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
import type { IDocumentSkeletonGlyph } from './i-document-skeleton-cached';
export declare function hasListGlyph(glyph: Nullable<IDocumentSkeletonGlyph>): boolean;
export declare function isIndentByGlyph(glyph: Nullable<IDocumentSkeletonGlyph>, body?: IDocumentBody): boolean;
export declare function isLastGlyph(glyph: Nullable<IDocumentSkeletonGlyph>): boolean;
export declare function isFirstGlyph(glyph: Nullable<IDocumentSkeletonGlyph>): boolean;
export declare function getParagraphByGlyph(glyph: Nullable<IDocumentSkeletonGlyph>, body?: IDocumentBody): {
    paragraphStart: number;
    paragraphEnd: number;
    startIndex: number;
    paragraphStyle?: import("@univerjs/core").IParagraphStyle;
    bullet?: import("@univerjs/core").IBullet;
} | undefined;
export declare function isPlaceholderOrSpace(glyph: Nullable<IDocumentSkeletonGlyph>): boolean;
export declare function isSameLine(glyph1: Nullable<IDocumentSkeletonGlyph>, glyph2: Nullable<IDocumentSkeletonGlyph>): boolean;
