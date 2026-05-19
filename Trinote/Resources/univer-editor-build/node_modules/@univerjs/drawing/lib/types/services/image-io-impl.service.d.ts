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
import type { Observable } from 'rxjs';
import type { IImageIoService, IImageIoServiceParam } from './image-io.service';
import { ImageSourceType } from './image-io.service';
export declare class ImageIoService implements IImageIoService {
    private _waitCount;
    private _change$;
    change$: Observable<number>;
    setWaitCount(count: number): void;
    private _imageSourceCache;
    getImageSourceCache(source: string, imageSourceType: ImageSourceType): HTMLImageElement | undefined;
    addImageSourceCache(source: string, imageSourceType: ImageSourceType, imageSource: Nullable<HTMLImageElement>): void;
    getImage(imageId: string): Promise<string>;
    saveImage(imageFile: File): Promise<Nullable<IImageIoServiceParam>>;
    private _decreaseWaiting;
}
