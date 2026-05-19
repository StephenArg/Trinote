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
import type { IViewportInfo, Vector2 } from '../basics/vector2';
import type { UniverRenderingContext } from '../context';
import { BaseObject } from '../base-object';
export declare class CustomObject extends BaseObject {
    private _render;
    private _isHitCustom?;
    constructor(key?: string, _render?: (mainCtx: UniverRenderingContext) => void, _isHitCustom?: ((coord: Vector2) => boolean) | undefined);
    toJson(): {
        [x: string]: any;
    };
    render(mainCtx: UniverRenderingContext, bounds?: IViewportInfo): this;
    isHit(coord: Vector2): boolean;
}
