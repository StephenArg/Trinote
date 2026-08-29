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
import type { ICommand, IDocDrawingBase, IDocDrawingPosition, IObjectPositionH, IObjectPositionV, ISize } from '@univerjs/core';
import type { IDocumentSkeletonDrawing, IDocumentSkeletonHeaderFooter, IDocumentSkeletonPage } from '@univerjs/engine-render';
export declare enum TextWrappingStyle {
    INLINE = "inline",
    BEHIND_TEXT = "behindText",
    IN_FRONT_OF_TEXT = "inFrontOfText",
    WRAP_SQUARE = "wrapSquare",
    WRAP_TOP_AND_BOTTOM = "wrapTopAndBottom"
}
interface IDrawingAnchorInPage {
    skeDrawing: IDocumentSkeletonDrawing;
    pageMarginTop: number;
    pageMarginLeft: number;
}
export declare function findDrawingAnchorInPage(page: IDocumentSkeletonPage | IDocumentSkeletonHeaderFooter, drawingId: string, pageMarginTop: number, pageMarginLeft: number): IDrawingAnchorInPage | null;
/**
 * The command to update drawing wrapping style.
 */
export declare const UpdateDocDrawingWrappingStyleCommand: ICommand;
/**
 * The command to update drawing wrap text.
 */
export declare const UpdateDocDrawingDistanceCommand: ICommand;
/**
 * The command to update drawing wrap text.
 */
export declare const UpdateDocDrawingWrapTextCommand: ICommand;
export interface IDrawingDocTransform {
    drawingId: string;
    key: 'size' | 'angle' | 'positionH' | 'positionV';
    value: ISize | number | IObjectPositionH | IObjectPositionV;
}
export interface IUpdateDrawingDocTransformParams {
    unitId: string;
    subUnitId: string;
    drawings: IDrawingDocTransform[];
}
/**
 * The command to update drawing position.
 */
export declare const UpdateDrawingDocTransformCommand: ICommand;
export interface IMoveInlineDrawingParams {
    unitId: string;
    subUnitId: string;
    drawing: IDocDrawingBase;
    offset: number;
    segmentId: string;
    segmentPage: number;
    needRefreshDrawings?: boolean;
}
/**
 * The command to move inline drawing.
 */
export declare const IMoveInlineDrawingCommand: ICommand;
export interface ITransformNonInlineDrawingParams {
    unitId: string;
    subUnitId: string;
    drawing: IDocDrawingBase;
    offset: number;
    docTransform: IDocDrawingPosition;
    segmentId: string;
    segmentPage: number;
}
/**
 * The command to transform non-inline drawing.
 */
export declare const ITransformNonInlineDrawingCommand: ICommand;
export {};
