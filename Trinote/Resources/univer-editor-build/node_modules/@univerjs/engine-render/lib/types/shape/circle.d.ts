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
import type { UniverRenderingContext } from '../context';
import type { IShapeProps } from './shape';
import { ObjectType } from '../base-object';
import { Shape } from './shape';
export interface ICircleProps extends IShapeProps {
    radius: number;
}
export declare const CIRCLE_OBJECT_ARRAY: string[];
export declare class Circle extends Shape<ICircleProps> {
    private _radius;
    objectType: ObjectType;
    constructor(key?: string, props?: ICircleProps);
    get radius(): number;
    static drawWith(ctx: UniverRenderingContext, props: ICircleProps | Circle): void;
    toJson(): {
        [x: string]: any;
    };
    protected _draw(ctx: UniverRenderingContext): void;
    private _setFixBoundingBox;
}
