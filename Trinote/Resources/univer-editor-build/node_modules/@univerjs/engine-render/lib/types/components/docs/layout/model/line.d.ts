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
import type { IParagraphConfig } from '../../../../basics';
import type { IDocumentSkeletonDivide, IDocumentSkeletonDrawingAnchor, IDocumentSkeletonLine, IDocumentSkeletonPage, LineType } from '../../../../basics/i-document-skeleton-cached';
import type { IFloatObject } from '../tools';
interface ILineBoundingBox {
    lineHeight: number;
    lineTop: number;
    contentHeight: number;
    paddingLeft?: number;
    paddingRight?: number;
    paddingTop?: number;
    paddingBottom?: number;
    marginTop?: number;
    spaceBelowApply?: number;
}
export declare function createSkeletonLine(paragraphIndex: number, lineType: LineType, lineBoundingBox: ILineBoundingBox, columnWidth: number, lineIndex: number | undefined, isParagraphStart: boolean | undefined, paragraphConfig: IParagraphConfig, page: IDocumentSkeletonPage, headerPage: Nullable<IDocumentSkeletonPage>, footerPage: Nullable<IDocumentSkeletonPage>): IDocumentSkeletonLine;
export declare function calculateLineTopByDrawings(lineHeight: number | undefined, lineTop: number | undefined, page: IDocumentSkeletonPage, headerPage: Nullable<IDocumentSkeletonPage>, footerPage: Nullable<IDocumentSkeletonPage>): number;
export declare function updateDivideInfo(divide: IDocumentSkeletonDivide, states: Partial<IDocumentSkeletonDivide>): void;
export declare function setLineMarginBottom(line: IDocumentSkeletonLine, marginBottom: number): void;
export declare function collisionDetection(floatObject: IFloatObject, lineHeight: number, lineTop: number, columnLeft: number, columnWidth: number): boolean;
export declare function getBoundingBox(angle: number, left: number, width: number, top: number, height: number): import("../../../..").IRect;
export declare function createAndUpdateBlockAnchor(paragraphIndex: number, line: IDocumentSkeletonLine, top: number, drawingAnchor?: Map<number, IDocumentSkeletonDrawingAnchor>): void;
export {};
