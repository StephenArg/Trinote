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
import type { IPosition } from '@univerjs/core';
import type { Vector2 } from '../basics/vector2';
import type { UniverRenderingContext } from '../context';
import type { IShapeProps } from './shape';
import { Shape } from './shape';
export interface ILineProps extends Omit<IShapeProps, 'left' | 'top' | 'width' | 'height'>, IPosition {
}
/**
 * A line segment defined by two endpoints in its parent's coordinate system.
 *
 * The BaseObject bounds are derived internally so callers only describe line geometry.
 */
export declare class Line extends Shape<ILineProps> {
    private _startX;
    private _startY;
    private _endX;
    private _endY;
    constructor(key?: string, props?: ILineProps);
    get startX(): number;
    get startY(): number;
    get endX(): number;
    get endY(): number;
    static drawWith(ctx: UniverRenderingContext, props: ILineProps): void;
    setPoints(position: IPosition): this;
    setProps(props?: Partial<ILineProps>): this;
    isHit(coord: Vector2): boolean;
    toJson(): {
        startX: number;
        startY: number;
        endX: number;
        endY: number;
    };
    protected _draw(ctx: UniverRenderingContext): void;
    private static _drawSegment;
}
