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
export interface IHeaderMenuShapeProps extends IShapeProps {
    size?: number;
    mode?: HEADER_MENU_SHAPE_TYPE;
    iconRatio?: number;
}
export declare enum HEADER_MENU_SHAPE_TYPE {
    NORMAL = 0,
    HIGHLIGHT = 1
}
export declare const HEADER_MENU_SHAPE_CIRCLE_FILL = "rgba(0, 0, 0, 0.15)";
export declare const HEADER_MENU_SHAPE_TRIANGLE_FILL = "rgb(0, 0, 0)";
export declare const HEADER_MENU_BACKGROUND_COLOR = "rgb(255, 255, 255, 1)";
export declare class HeaderMenuShape<T extends IHeaderMenuShapeProps = IHeaderMenuShapeProps> extends Shape<T> {
    private _size;
    private _iconRatio;
    private _mode;
    constructor(key?: string, props?: T);
    setShapeProps(props?: T): void;
    protected _draw(ctx: UniverRenderingContext): void;
}
