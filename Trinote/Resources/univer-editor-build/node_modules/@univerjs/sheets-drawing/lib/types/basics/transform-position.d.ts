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
import type { ITransformState, Nullable } from '@univerjs/core';
import type { SpreadsheetSkeleton } from '@univerjs/engine-render';
import type { ISheetSkeletonManagerParam } from '@univerjs/sheets';
import type { ISheetDrawingPosition } from '../services/sheet-drawing.service';
export declare function drawingPositionToTransform(position: ISheetDrawingPosition, sheetSkeletonParam: Nullable<ISheetSkeletonManagerParam>): Nullable<ITransformState>;
export declare function transformToDrawingPosition(transform: ITransformState, skeleton: SpreadsheetSkeleton): ISheetDrawingPosition;
/**
 * In excel, the basic drawing with rotate bound use major axis switch, axis-aligned bound will bu used.That means the position bound of drawing element will save as nearly axis-aligned rectangle.
 * Here is the rule to convert transform to axis-aligned position:
 * [-45°, 45°):  use the original bound
 * [45°, 135°): rotate the bound 90° clockwise,and the left, top, bottom,right will use the rotated bound.
 * [135°, 225°): use the original bound
 * [225°, 315°): rotate the bound 90° counterclockwise, and the left, top, bottom, right will use the rotated bound.
 * @return The axis-aligned position of the drawing element.
 */
export declare function transformToAxisAlignPosition(transform: ITransformState, skeleton: SpreadsheetSkeleton): ISheetDrawingPosition;
