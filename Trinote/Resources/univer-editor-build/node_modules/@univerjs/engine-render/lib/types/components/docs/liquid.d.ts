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
import type { IDocumentSkeletonColumn, IDocumentSkeletonDivide, IDocumentSkeletonGlyph, IDocumentSkeletonLine, IDocumentSkeletonPage, IDocumentSkeletonSection } from '../../basics/i-document-skeleton-cached';
import { VerticalAlign } from '@univerjs/core';
import { PageLayoutType } from '../../basics/i-document-skeleton-cached';
export declare class Liquid {
    private _translateX;
    private _translateY;
    private _translateSaveList;
    get x(): number;
    get y(): number;
    reset(): void;
    translateBy(x?: number, y?: number): void;
    translate(x?: number, y?: number): void;
    translateSave(): void;
    translateRestore(): void;
    translatePagePadding(page: IDocumentSkeletonPage): void;
    restorePagePadding(page: IDocumentSkeletonPage): void;
    translatePage(page: IDocumentSkeletonPage, type?: PageLayoutType, left?: number, top?: number, _right?: number, _bottom?: number): {
        x: number;
        y: number;
    };
    translateSection(section: IDocumentSkeletonSection): {
        x: number;
        y: number;
    };
    translateColumn(column: IDocumentSkeletonColumn): {
        x: number;
        y: number;
    };
    translateLine(line: IDocumentSkeletonLine, includeMarginTop?: boolean, includePaddingTop?: boolean): {
        x: number;
        y: number;
    };
    translateDivide(divide: IDocumentSkeletonDivide, isVerticalAndWrap?: boolean, verticalAlign?: VerticalAlign, rotatedHeight?: number): {
        x: number;
        y: number;
    };
    translateGlyph(glyph: IDocumentSkeletonGlyph): {
        x: number;
        y: number;
    };
}
