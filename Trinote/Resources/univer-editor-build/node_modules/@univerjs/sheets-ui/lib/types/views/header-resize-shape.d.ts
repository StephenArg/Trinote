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
import type { IShapeProps, UniverRenderingContext } from '@univerjs/engine-render';
import { Shape } from '@univerjs/engine-render';
export interface IHeaderMenuShapeResizeProps extends IShapeProps {
    size?: number;
    mode?: HEADER_RESIZE_SHAPE_TYPE;
    color?: string;
}
export declare enum HEADER_RESIZE_SHAPE_TYPE {
    VERTICAL = 0,
    HORIZONTAL = 1
}
export declare const HEADER_MENU_SHAPE_RECT_BACKGROUND_FILL = "rgba(120, 120, 120, 0.01)";
export declare const HEADER_MENU_SHAPE_RECT_FILL = "rgb(68, 71, 70)";
export declare const HEADER_MENU_SHAPE_SIZE = 12;
export declare const MAX_HEADER_MENU_SHAPE_SIZE = 44;
export declare const HEADER_MENU_SHAPE_THUMB_SIZE = 4;
export declare class HeaderMenuResizeShape<T extends IHeaderMenuShapeResizeProps = IHeaderMenuShapeResizeProps> extends Shape<T> {
    private _size;
    private _color;
    private _mode;
    constructor(key?: string, props?: T);
    get size(): number;
    get mode(): HEADER_RESIZE_SHAPE_TYPE;
    get color(): string;
    protected _draw(ctx: UniverRenderingContext): void;
    setShapeProps(props?: T): this;
}
