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
import type { Documents, DocumentSkeleton, INodePosition, ITextSelectionStyle, Scene } from '@univerjs/engine-render';
import type { IDocRange } from './range-interface';
import { DOC_RANGE_TYPE, RANGE_DIRECTION } from '@univerjs/core';
export declare function convertPositionsToRectRanges(scene: Scene, document: Documents, docSkeleton: DocumentSkeleton, anchorNodePosition: INodePosition, focusNodePosition: INodePosition, style?: ITextSelectionStyle, segmentId?: string, segmentPage?: number): RectRange[];
export declare class RectRange implements IDocRange {
    private _scene;
    private _document;
    private _docSkeleton;
    anchorNodePosition: INodePosition;
    focusNodePosition: INodePosition;
    style: ITextSelectionStyle;
    private _segmentId;
    private _segmentPage;
    rangeType: DOC_RANGE_TYPE;
    private _rangeShape;
    private _current;
    private _startRow;
    private _startCol;
    private _endRow;
    private _endCol;
    private _tableId;
    constructor(_scene: Scene, _document: Documents, _docSkeleton: DocumentSkeleton, anchorNodePosition: INodePosition, focusNodePosition: INodePosition, style?: ITextSelectionStyle, _segmentId?: string, _segmentPage?: number);
    get startOffset(): Nullable<number>;
    get endOffset(): Nullable<number>;
    get collapsed(): boolean;
    get startRow(): number;
    get startColumn(): number;
    get endRow(): number;
    get endColumn(): number;
    get tableId(): string;
    get segmentId(): string;
    get segmentPage(): number;
    get spanEntireRow(): boolean;
    get spanEntireColumn(): boolean;
    get spanEntireTable(): boolean;
    get startNodePosition(): INodePosition;
    get endNodePosition(): INodePosition;
    get direction(): RANGE_DIRECTION;
    isActive(): boolean;
    activate(): void;
    deactivate(): void;
    dispose(): void;
    isIntersection(compareRange: RectRange): boolean;
    refresh(): void;
    private _updateTableInfo;
    private _createOrUpdateRange;
}
