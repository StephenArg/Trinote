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
import type { Documents, DocumentSkeleton, INodePosition, IPoint, ISuccinctDocRangeParam, ITextSelectionStyle, Scene } from '@univerjs/engine-render';
import type { IDocRange } from './range-interface';
import { DOC_RANGE_TYPE, RANGE_DIRECTION } from '@univerjs/core';
import { Rect } from '@univerjs/engine-render';
export declare const TEXT_RANGE_LAYER_INDEX = 3;
export declare function cursorConvertToTextRange(scene: Scene, range: ISuccinctDocRangeParam, docSkeleton: DocumentSkeleton, document: Documents): Nullable<TextRange>;
export declare function getAnchorBounding(pointsGroup: IPoint[][]): {
    left: number;
    top: number;
    width: number;
    height: number;
};
export declare function getLineBounding(pointsGroup: IPoint[][]): {
    left: number;
    right: number;
    top: number;
    bottom: number;
}[];
export declare class TextRange implements IDocRange {
    private _scene;
    private _document;
    private _docSkeleton;
    anchorNodePosition?: Nullable<INodePosition>;
    focusNodePosition?: Nullable<INodePosition>;
    style: ITextSelectionStyle;
    private _segmentId;
    private _segmentPage;
    rangeType: DOC_RANGE_TYPE;
    private _current;
    private _rangeShape;
    private _anchorShape;
    private _cursorList;
    private _anchorBlinkTimer;
    constructor(_scene: Scene, _document: Documents, _docSkeleton: DocumentSkeleton, anchorNodePosition?: Nullable<INodePosition>, focusNodePosition?: Nullable<INodePosition>, style?: ITextSelectionStyle, _segmentId?: string, _segmentPage?: number);
    private _anchorBlink;
    get startOffset(): number | undefined;
    get endOffset(): number | undefined;
    get collapsed(): boolean;
    get startNodePosition(): INodePosition | null;
    get endNodePosition(): Nullable<INodePosition>;
    get direction(): RANGE_DIRECTION;
    get segmentId(): string;
    get segmentPage(): number;
    getAbsolutePosition(): {
        left: number;
        top: number;
        width: number;
        height: number;
    } | undefined;
    getAnchor(): Nullable<Rect<import("@univerjs/engine-render").IRectProps>>;
    activeStatic(): void;
    deactivateStatic(): void;
    isActive(): boolean;
    activate(): void;
    deactivate(): void;
    dispose(): void;
    isIntersection(compareRange: TextRange): boolean;
    refresh(): void;
    private _isEmpty;
    private _isCollapsed;
    private _createOrUpdateRange;
    private _createOrUpdateAnchor;
    private _setCursorList;
}
