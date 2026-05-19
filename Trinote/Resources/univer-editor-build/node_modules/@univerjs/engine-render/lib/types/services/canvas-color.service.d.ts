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
import type { RGBColorType } from '@univerjs/core';
import { Disposable, ThemeService } from '@univerjs/core';
export declare const ICanvasColorService: import("@wendellhu/redi").IdentifierDecorator<ICanvasColorService>;
/**
 * This service maps a color or a theme-token to a color for rendering. Univer supports themes for rendering
 * and dark mode. This services is responsible for abstract this complexity for rendering components.
 */
export interface ICanvasColorService {
    getRenderColor(color: string): string;
}
export declare class DumbCanvasColorService implements ICanvasColorService {
    getRenderColor(color: string): string;
}
/**
 * This service inverts a color for dark mode. This service is exposed
 */
export declare class CanvasColorService extends Disposable implements ICanvasColorService {
    private readonly _themeService;
    private readonly _cache;
    private _invertAlgo;
    constructor(_themeService: ThemeService);
    getRenderColor(color: string): string;
}
export declare function hexToRgb(_hex: string): RGBColorType;
export declare function rgbToHex(rgbColor: RGBColorType): string;
