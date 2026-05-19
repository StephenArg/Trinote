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
import type { ISrcRect, Nullable } from '@univerjs/core';
import type { IObjectFullState, IViewportInfo } from '../basics';
import type { UniverRenderingContext } from '../context';
import type { IShapeProps } from './shape';
import { ObjectType } from '../base-object';
import { RENDER_CLASS_TYPE, Transform, Vector2 } from '../basics';
import { Shape } from './shape';
export interface IShapeClipBounds {
    left: number;
    top: number;
    width: number;
    height: number;
}
export interface IImageShapeClipService {
    /**
     * Build the shape outline path and clip the canvas context.
     * Assumes the coordinate system has (0,0) at the top-left of the shape area.
     * The method calls ctx.beginPath(), builds the shape path, and calls ctx.clip().
     * @returns The actual bounding rect of the clip region, or false if no clip was built.
     *          For multi-path shapes the bounds may extend beyond (0, 0, width, height).
     */
    applyShapeClip(ctx: UniverRenderingContext, prstGeom: string, width: number, height: number, adjustValues?: Nullable<Record<string, number>>): IShapeClipBounds | false;
}
export interface IImageProps extends IShapeProps {
    image?: HTMLImageElement;
    url?: string;
    success?: () => void;
    fail?: () => void;
    /**
     * 20.1.8.55 srcRect (Source Rectangle)
     */
    srcRect?: Nullable<ISrcRect>;
    /**
     * 20.1.9.18 prstGeom (Preset geometry)
     */
    prstGeom?: Nullable<string>;
    /**
     * Adjust values for the preset geometry (e.g. corner radius for roundRect).
     * Keys are adjust handle names, values are numeric values.
     */
    adjustValues?: Nullable<Record<string, number>>;
    opacity?: number;
}
export declare class Image extends Shape<IImageProps> {
    protected _props: IImageProps;
    protected _native: Nullable<HTMLImageElement>;
    private _renderByCropper;
    private _transformCalculateSrcRect;
    private _clipService;
    objectType: ObjectType;
    isDrawingObject: boolean;
    constructor(id: string, config: IImageProps);
    get srcRect(): Nullable<ISrcRect>;
    get prstGeom(): Nullable<string>;
    get opacity(): number;
    setOpacity(opacity: number): void;
    setClipService(clipService: Nullable<IImageShapeClipService>): void;
    getClipService(): Nullable<IImageShapeClipService>;
    get classType(): RENDER_CLASS_TYPE;
    transformByStateCloseCropper(option: IObjectFullState): void;
    changeSource(url: string): void;
    resetSize(): void;
    setPrstGeom(prstGeom?: Nullable<string>): void;
    setPrstGeomAdjValues(adjValues?: Nullable<Record<string, number>>): void;
    get prstGeomAdjValues(): Nullable<Record<string, number>>;
    setSrcRect(srcRect?: Nullable<ISrcRect>): void;
    getProps(): IImageProps;
    getNative(): Nullable<HTMLImageElement>;
    getNativeSize(): {
        width: number;
        height: number;
    };
    closeRenderByCropper(): void;
    openRenderByCropper(): void;
    calculateTransformWithSrcRect(): {
        left: number;
        top: number;
        width: number;
        height: number;
        angle: number;
    };
    private _transformBySrcRect;
    render(mainCtx: UniverRenderingContext, bounds?: IViewportInfo): this;
    protected _draw(ctx: UniverRenderingContext, _bounds?: IViewportInfo, renderWidth?: number, renderHeight?: number): void;
    private _init;
    private _updateSrcRectByTransform;
    set transform(trans: Transform);
    get transform(): Transform;
    isHit(coord: Vector2): boolean;
}
