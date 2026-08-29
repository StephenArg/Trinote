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
import { Disposable, ICommandService, IUniverInstanceService } from '@univerjs/core';
import { IDrawingManagerService } from '@univerjs/drawing';
import { IRenderManagerService } from '@univerjs/engine-render';
export declare class DrawingUpdateController extends Disposable {
    private readonly _currentUniverService;
    private readonly _commandService;
    private readonly _renderManagerService;
    private readonly _drawingManagerService;
    constructor(_currentUniverService: IUniverInstanceService, _commandService: ICommandService, _renderManagerService: IRenderManagerService, _drawingManagerService: IDrawingManagerService);
    dispose(): void;
    private _initialize;
    private _recoveryImages;
    private _commandExecutedListener;
    private _drawingGroupListener;
    private _getSceneAndTransformerByDrawingSearch;
    private _groupDrawings;
    private _groupDrawing;
    private _ungroupDrawings;
    private _ungroupDrawing;
    private _drawingAlign;
    private _applyAlignType;
    private _sortDrawingTransform;
    private _drawingArrangeListener;
    private _drawingArrange;
    private _sceneListenerOnDrawingMap;
    private _drawingAddListener;
    private _insertDrawing;
    private _drawingRemoveListener;
    private _drawingUpdateListener;
    private _drawingRefreshListener;
    private _drawingVisibleListener;
    private _filterUpdateParams;
    private _addListenerOnDrawing;
}
