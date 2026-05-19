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
import type { DocumentSkeleton, IDocumentOffsetConfig, INodePosition, IPoint } from '@univerjs/engine-render';
export declare function isValidRectRange(anchorNodePosition: INodePosition, focusNodePosition: INodePosition): boolean;
export declare function isInSameTableCell(anchorNodePosition: INodePosition, focusNodePosition: INodePosition): boolean;
export declare function isInSameTableCellData(skeleton: DocumentSkeleton, anchorNodePosition: INodePosition, focusNodePosition: INodePosition): boolean;
export declare function compareNodePositionInTable(a: INodePosition, b: INodePosition): boolean;
interface IRectRangeNodePositions {
    anchor: INodePosition;
    focus: INodePosition;
}
export declare class NodePositionConvertToRectRange {
    private _documentOffsetConfig;
    private _docSkeleton;
    private _liquid;
    constructor(_documentOffsetConfig: IDocumentOffsetConfig, _docSkeleton: DocumentSkeleton);
    getRangePointData(startNodePosition: INodePosition, endNodePosition: INodePosition): {
        pointGroup: IPoint[][];
        startRow: number;
        startColumn: number;
        endRow: number;
        endColumn: number;
        tableId: string;
    } | undefined;
    getNodePositionGroup(anchorNodePosition: INodePosition, focusNodePosition: INodePosition): Nullable<IRectRangeNodePositions[]>;
    private _getTableRectRangeInfo;
}
export {};
