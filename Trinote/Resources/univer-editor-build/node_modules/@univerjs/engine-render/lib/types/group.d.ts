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
import type { CURSOR_TYPE } from './basics/const';
import type { IViewportInfo } from './basics/vector2';
import type { UniverRenderingContext } from './context';
import { BaseObject } from './base-object';
import { RENDER_CLASS_TYPE } from './basics/const';
export declare class Group extends BaseObject {
    protected _objects: BaseObject[];
    protected _selfSizeMode: boolean;
    constructor(key?: string, ...objects: BaseObject[]);
    get classType(): RENDER_CLASS_TYPE;
    set cursor(val: CURSOR_TYPE);
    getState(): import("@univerjs/core").ITransformState | {
        left: number;
        top: number;
        width: number;
        height: number;
        angle: number;
        scaleX: number;
        scaleY: number;
    };
    get width(): number;
    get height(): number;
    set width(val: number);
    set height(val: number);
    get maxZIndex(): number;
    openSelfSizeMode(): void;
    closeSelfSizeMode(): void;
    reCalculateObjects(): void;
    addObjects(...objects: BaseObject[]): void;
    addObject(o: BaseObject | string): void;
    removeObject(object: BaseObject | string): void;
    removeSelfObjectAndTransform(oKey: string, width?: number, height?: number, isTransform?: boolean): void;
    private _transformObject;
    getObjectsByOrder(): BaseObject[];
    getObjects(): BaseObject[];
    render(ctx: UniverRenderingContext, bounds: IViewportInfo): void;
    private _clear;
    dispose(): void;
}
