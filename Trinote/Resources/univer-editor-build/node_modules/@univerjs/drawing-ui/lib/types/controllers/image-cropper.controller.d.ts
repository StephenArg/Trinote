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
import { Disposable, ICommandService, IUniverInstanceService, LocaleService } from '@univerjs/core';
import { IDrawingManagerService } from '@univerjs/drawing';
import { IRenderManagerService } from '@univerjs/engine-render';
import { IMessageService } from '@univerjs/ui';
export declare class ImageCropperController extends Disposable {
    private readonly _commandService;
    private readonly _drawingManagerService;
    private readonly _renderManagerService;
    private _univerInstanceService;
    private readonly _messageService;
    private readonly _localeService;
    private _sceneListenerOnImageMap;
    constructor(_commandService: ICommandService, _drawingManagerService: IDrawingManagerService, _renderManagerService: IRenderManagerService, _univerInstanceService: IUniverInstanceService, _messageService: IMessageService, _localeService: LocaleService);
    private _init;
    private _initAutoCrop;
    private _calculateSrcRectByRatio;
    private _updateCropperObject;
    private _initOpenCrop;
    private _searchCropObject;
    private _initCloseCrop;
    private _getApplyObjectByCropObject;
    private _addListenerOnImage;
    private _addHoverForImageCopper;
    private _endCropListener;
    private _getSrcRectByTransformState;
}
