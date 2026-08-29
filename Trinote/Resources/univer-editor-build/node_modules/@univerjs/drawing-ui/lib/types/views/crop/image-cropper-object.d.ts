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
import type { ISrcRect, ITransformState, Nullable } from '@univerjs/core';
import type { IShapeProps, IViewportInfo, UniverRenderingContext, Vector2 } from '@univerjs/engine-render';
import { Shape } from '@univerjs/engine-render';
export interface IImageCropperObjectProps extends IShapeProps {
    /**
     * 20.1.8.55 srcRect (Source Rectangle)
     */
    srcRect?: Nullable<ISrcRect>;
    /**
     * 20.1.9.18 prstGeom (Preset geometry)
     */
    prstGeom?: Nullable<string>;
    applyTransform?: ITransformState;
    dragPadding?: number;
}
export declare class ImageCropperObject<T extends IImageCropperObjectProps = IImageCropperObjectProps> extends Shape<T> {
    private _srcRect;
    private _prstGeom;
    private _applyTransform;
    private _dragPadding;
    private _cacheCanvas;
    constructor(key?: string, props?: T);
    refreshSrcRect(value: Nullable<ISrcRect>, transform: Nullable<ITransformState>): void;
    get srcRect(): Nullable<ISrcRect>;
    dispose(): void;
    isHit(coord: Vector2): boolean;
    private _inSurround;
    render(mainCtx: UniverRenderingContext, bounds?: IViewportInfo): this;
    protected _draw(ctx: UniverRenderingContext): void;
    private _clipForApplyObject;
    private _applyProps;
    private _applyCache;
    private _initialCacheCanvas;
}
