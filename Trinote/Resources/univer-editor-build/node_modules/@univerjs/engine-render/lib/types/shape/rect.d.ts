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
import type { UniverRenderingContext } from '../context';
import type { IShapeProps } from './shape';
import { ObjectType } from '../base-object';
import { Shape } from './shape';
export interface IRectProps extends IShapeProps {
    radius?: number;
    visualHeight?: number;
    visualWidth?: number;
}
export declare const RECT_OBJECT_ARRAY: string[];
export declare class Rect<T extends IRectProps = IRectProps> extends Shape<T> {
    objectType: ObjectType;
    private _radius;
    private _opacity;
    /**
     * For rendering, in many case object size is bigger than visual size for better user interaction.
     */
    private _visualHeight;
    private _visualWidth;
    constructor(key?: string, props?: T);
    get visualHeight(): Nullable<number>;
    get visualWidth(): Nullable<number>;
    get radius(): number;
    get opacity(): number;
    setObjectType(type: ObjectType): void;
    setOpacity(opacity: number): void;
    static drawWith(ctx: UniverRenderingContext, props: IRectProps): void;
    toJson(): {
        [x: string]: any;
    };
    protected _draw(ctx: UniverRenderingContext): void;
}
