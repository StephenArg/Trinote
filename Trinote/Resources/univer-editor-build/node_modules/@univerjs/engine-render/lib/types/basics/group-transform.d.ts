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
import type { IGroupBaseBound, ITransformState, Nullable } from '@univerjs/core';
export declare function getGroupState(parentLeft: number, parentTop: number, objectStates: ITransformState[]): {
    left: number;
    top: number;
    width: number;
    height: number;
    angle: number;
    scaleX: number;
    scaleY: number;
};
export declare function getDrawingGroupState(parentLeft: number, parentTop: number, objectStates: ITransformState[]): {
    left: number;
    top: number;
    width: number;
    height: number;
    angle: number;
    scaleX: number;
    scaleY: number;
};
/**
 * Transform a child object out of a group, computing its absolute position, angle, and flip state.
 *
 * When a DrawingGroup has a baseBound (chOff/chExt in OOXML), children store their positions
 * in the baseBound coordinate space. This method first maps the child's position from baseBound
 * space to the actual parent bound space, then applies group flip mirroring and rotation.
 *
 * @param child - The child's transform state (position in baseBound space if baseBound is provided)
 * @param parent - The parent group's transform state (absolute position, angle, flip)
 * @param groupOriginWidth - The original width of the group (used to compute group center)
 * @param groupOriginHeight - The original height of the group (used to compute group center)
 * @param baseBound - Optional. The group's baseBound (chOff/chExt). If provided, child coordinates
 *                    are mapped from this space to the parent's actual bound space before transforming.
 *
 * @example
 * // in excel, the group off & ext is the real position and size of the group, and the child position is relative to the group chOff/chExt. For example:
 * ```xml
 *   <a:xfrm>
 *        <a:off x="1212850" y="889000"/>
 *        <a:ext cx="6813550" cy="4883150"/>
 *        <a:chOff x="1212850" y="889000"/>
 *        <a:chExt cx="6813550" cy="4883150"/>
 *    </a:xfrm>
 * ```
 */
export declare function transformObjectOutOfGroup(child: ITransformState, parent: ITransformState, groupOriginWidth: number, groupOriginHeight: number, baseBound: Nullable<IGroupBaseBound>): {
    left: number;
    top: number;
    width: number;
    height: number;
    angle: number;
    flipX: boolean;
    flipY: boolean;
};
/**
 * Get the rendered position and size of an object based on the group's baseBound and the parent's bound.
 * @param baseBound The group's baseBound defining the coordinate space for its children,In Excel, this corresponds to chOff (child offset) and chExt (child extent) in OOXML.
 * @param parentBound The bounding box of the parent context (e.g., the group or canvas) within which the object is rendered.
 * @param objectBound The original bounding box of the object in the group's coordinate space.
 * @returns {IGroupBaseBound} The transformed bound for rendering the object within the group context
 */
export declare function getRenderTransformBaseOnParentBound(baseBound: IGroupBaseBound, parentBound: IGroupBaseBound, objectBound: IGroupBaseBound): IGroupBaseBound;
/**
 * In Excel, a rotated shape's bounding box for group calculations uses major axis switching.
 * The axis-aligned bound depends on which 90° increment the rotation angle is closest to:
 *
 * [-45°, 45°)   → 0°   horizontal (original width/height)
 * [45°, 135°)   → 90°  vertical   (width/height swapped)
 * [135°, 225°)  → 180° horizontal (original width/height)
 * [225°, 315°)  → 270° vertical   (width/height swapped)
 *
 * @param bound - The original axis-aligned bound { left, top, width, height }
 * @param angle - The rotation angle in degrees
 */
export declare function getRotatedBoundInGroup(bound: IGroupBaseBound, angle: number): IGroupBaseBound;
