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
import type { IObjectFullState } from '../basics/interfaces';
import type { IPoint, Vector2 } from '../basics/vector2';
import type { UniverRenderingContext } from '../context';
import type { IShapeProps } from './shape';
import { Shape } from './shape';
export interface IRegularPolygonProps extends IShapeProps {
    pointsGroup: IPoint[][];
}
export declare const REGULAR_POLYGON_OBJECT_ARRAY: string[];
export declare class RegularPolygon extends Shape<IRegularPolygonProps> {
    private _pointsGroup;
    constructor(key?: string, props?: IRegularPolygonProps);
    get pointsGroup(): IPoint[][];
    static drawWith(ctx: UniverRenderingContext, props: IRegularPolygonProps | RegularPolygon): void;
    isHit(coord: Vector2): boolean;
    private _contains;
    private _isOnLine;
    updatePointGroup(pointGroup: IPoint[][]): void;
    resizePolygon(preValue: IObjectFullState): void;
    toJson(): {
        [x: string]: any;
    };
    getState(): {
        left: number;
        top: number;
        width: number;
        height: number;
        scaleX: number;
        scaleY: number;
        angle: number;
        skewX: number;
        skewY: number;
        flipX: boolean;
        flipY: boolean;
    };
    getRect(): {
        left: number;
        top: number;
        width: number;
        height: number;
    };
    protected _draw(ctx: UniverRenderingContext): void;
    private _setFixBoundingBox;
    private _getSelfRect;
}
