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
import { IDrawingManagerService, IImageIoService } from '@univerjs/drawing';
import { IRenderManagerService } from '@univerjs/engine-render';
import { IDialogService } from '@univerjs/ui';
import { DrawingRenderService } from '../services/drawing-render.service';
export declare class ImageUpdateController extends Disposable {
    private readonly _commandService;
    private readonly _renderManagerService;
    private readonly _drawingManagerService;
    private readonly _dialogService;
    private readonly _imageIoService;
    private readonly _currentUniverService;
    private readonly _drawingRenderService;
    constructor(_commandService: ICommandService, _renderManagerService: IRenderManagerService, _drawingManagerService: IDrawingManagerService, _dialogService: IDialogService, _imageIoService: IImageIoService, _currentUniverService: IUniverInstanceService, _drawingRenderService: DrawingRenderService);
    dispose(): void;
    private _initialize;
    private _commandExecutedListener;
    private _getSceneAndTransformerByDrawingSearch;
    private _resetImageSize;
    private _drawingAddListener;
    private _insertImages;
    private _imageUpdateListener;
    private _addHoverForImage;
    private _addDialogForImage;
}
