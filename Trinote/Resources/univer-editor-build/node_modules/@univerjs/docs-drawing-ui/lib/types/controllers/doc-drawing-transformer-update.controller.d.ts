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
import type { IDocumentSkeletonPage, IDocumentSkeletonRow, IDocumentSkeletonTable } from '@univerjs/engine-render';
import { Disposable, ICommandService, IUniverInstanceService } from '@univerjs/core';
import { IDrawingManagerService } from '@univerjs/drawing';
import { IRenderManagerService } from '@univerjs/engine-render';
export interface IDocsTableCellAnchorContext {
    cell: IDocumentSkeletonPage;
    hostPage: IDocumentSkeletonPage;
    offset: {
        left: number;
        top: number;
    };
    row: IDocumentSkeletonRow;
    table: IDocumentSkeletonTable;
}
export declare function getDocsTableCellAnchorContext(unitId: string, cell: IDocumentSkeletonPage): Nullable<IDocsTableCellAnchorContext>;
export declare class DocDrawingTransformerController extends Disposable {
    private readonly _commandService;
    private readonly _univerInstanceService;
    private readonly _drawingManagerService;
    private readonly _renderManagerService;
    private _liquid;
    private _listenerOnImageMap;
    private _transformerCache;
    private _anchorShape;
    constructor(_commandService: ICommandService, _univerInstanceService: IUniverInstanceService, _drawingManagerService: IDrawingManagerService, _renderManagerService: IRenderManagerService);
    private _init;
    private _listenDrawingFocus;
    private _listenTransformerChange;
    private _updateMultipleDrawingDocTransform;
    private _updateDrawingAnchor;
    private _updateInlineDrawingAnchor;
    private _getInlineDrawingAnchor;
    private _getDrawingAnchor;
    private _updateDrawingSize;
    private _moveInlineDrawing;
    private _limitDrawingInPage;
    private _nonInlineDrawingTransform;
    private _getSceneAndTransformerByDrawingSearch;
    private _getTransformCoordForDocumentOffset;
    private _createOrUpdateInlineAnchor;
    private _getDocObject;
    private _getPageContentSize;
}
