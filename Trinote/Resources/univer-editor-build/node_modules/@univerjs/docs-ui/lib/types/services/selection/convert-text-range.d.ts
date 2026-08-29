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
import type { IPosition, ITextRange, Nullable } from '@univerjs/core';
import type { DocumentSkeleton, IDocumentOffsetConfig, INodePosition, IPoint } from '@univerjs/engine-render';
export declare enum NodePositionStateType {
    NORMAL = 0,
    START = 1,
    END = 2
}
export declare enum NodePositionType {
    page = 0,
    section = 1,
    column = 2,
    line = 3,
    divide = 4,
    glyph = 5
}
export interface ICurrentNodePositionState {
    page: NodePositionStateType;
    section: NodePositionStateType;
    column: NodePositionStateType;
    line: NodePositionStateType;
    divide: NodePositionStateType;
    glyph: NodePositionStateType;
}
export declare const NodePositionMap: {
    page: number;
    section: number;
    column: number;
    line: number;
    divide: number;
    glyph: number;
};
export declare function compareNodePositionLogic(pos1: INodePosition, pos2: INodePosition): boolean;
export declare function compareNodePosition(pos1: INodePosition, pos2: INodePosition): {
    start: INodePosition;
    end: INodePosition;
};
export declare function getOneTextSelectionRange(rangeList: ITextRange[]): Nullable<ITextRange>;
export declare function pushToPoints(position: IPosition): {
    x: number;
    y: number;
}[];
export declare class NodePositionConvertToCursor {
    private _documentOffsetConfig;
    private _docSkeleton;
    private _liquid;
    private _horizontalClip;
    private _currentStartState;
    private _currentEndState;
    constructor(_documentOffsetConfig: IDocumentOffsetConfig, _docSkeleton: DocumentSkeleton);
    getRangePointData(startOrigin: Nullable<INodePosition>, endOrigin: Nullable<INodePosition>): {
        borderBoxPointGroup: IPoint[][];
        contentBoxPointGroup: IPoint[][];
        cursorList: ITextRange[];
    };
    private _isValidPosition;
    private _resetCurrentNodePositionState;
    private _setNodePositionState;
    private _checkPreviousNodePositionState;
    private _getSelectionRuler;
    private _selectionIterator;
}
