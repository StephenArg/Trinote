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
import type { IDrawingSearch } from '@univerjs/core';
import type { IDocFloatDomData, IImageData } from '@univerjs/drawing';
import type { IRectProps, Scene } from '@univerjs/engine-render';
import { IUniverInstanceService, IURLImageService } from '@univerjs/core';
import { IDrawingManagerService, IImageIoService } from '@univerjs/drawing';
import { Image, Rect } from '@univerjs/engine-render';
import { IGalleryService } from '@univerjs/ui';
import { DrawingImageClipService } from './drawing-image-clip.service';
export declare class DrawingRenderService {
    private readonly _drawingManagerService;
    private readonly _imageIoService;
    private readonly _galleryService;
    private readonly _urlImageService;
    private readonly _univerInstanceService;
    private readonly _drawingImageClipService;
    constructor(_drawingManagerService: IDrawingManagerService, _imageIoService: IImageIoService, _galleryService: IGalleryService, _urlImageService: IURLImageService, _univerInstanceService: IUniverInstanceService, _drawingImageClipService: DrawingImageClipService);
    renderImages(imageParam: IImageData, scene: Scene): Promise<Image[] | undefined>;
    private _getActiveSheetId;
    renderFloatDom(param: IDocFloatDomData, scene: Scene): Rect<IRectProps>[] | undefined;
    renderDrawing(param: IDrawingSearch, scene: Scene): Promise<Image[] | undefined> | undefined;
    previewImage(key: string, src: string, width: number, height: number): void;
    private _adjustImageSize;
}
