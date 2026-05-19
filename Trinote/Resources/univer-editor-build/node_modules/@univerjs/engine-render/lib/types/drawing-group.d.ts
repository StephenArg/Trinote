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
import type { IGroupBaseBound } from '@univerjs/core';
import type { BaseObject } from './base-object';
import type { IViewportInfo, Vector2 } from './basics';
import type { UniverRenderingContext } from './context';
import { Transform } from './basics';
import { Group } from './group';
export declare class DrawingGroupObject extends Group {
    protected _selfSizeMode: boolean;
    /**
     * Corresponds to chOff (child offset) and chExt (child extent) in OOXML.
     * Describes the coordinate space of children within this group.
     * Children store their absolute positions in this coordinate space.
     * When rendering, positions are mapped from baseBound space to the group's current transform.
     */
    private _baseBound;
    /**
     * Set the baseBound (chOff/chExt in OOXML) for this group.
     * This defines the coordinate space of children within the group.
     * When set, the group automatically enters selfSizeMode so its dimensions
     * are tracked independently of children.
     */
    setBaseBound(bound: IGroupBaseBound): void;
    /**
     * Get the baseBound (chOff/chExt in OOXML) for this group.
     */
    getBaseBound(): IGroupBaseBound;
    /**
     * Override ancestorTransform to use the same render transform as render(),
     * which uses [m[0], m[1], m[2], m[3], centerX, centerY] from realBound
     * instead of the standard transform translation.
     * This ensures children (e.g., Image.isHit) that compose with
     * parent.ancestorTransform get the correct coordinate space.
     */
    get ancestorTransform(): Transform;
    render(ctx: UniverRenderingContext, bounds: IViewportInfo): void;
    addObjects(...objects: BaseObject[]): void;
    isHit(coord: Vector2): boolean;
    dispose(): void;
}
