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
import type { Injector } from '@wendellhu/redi';
import { ImageSourceType } from '../../services/image-io/image-io.service';
export declare class ImageCacheMap {
    private _injector;
    private _imageCacheMap;
    constructor(_injector: Injector, maxSize?: number);
    private _getImageCacheKey;
    getImage(imageSourceType: ImageSourceType, source: string, onLoad?: () => void, onError?: () => void): HTMLImageElement | null;
}
