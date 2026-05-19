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
import type { BaseObject } from '../base-object';
import type { IBoundRect } from './vector2';
export declare function getOffsetRectForDom(ele: HTMLElement): {
    top: number;
    left: number;
};
export declare function transformBoundingCoord(object: BaseObject, bounds: IBoundRect): {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
};
