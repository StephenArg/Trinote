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
import type { IDrawingParam, IOperation } from '@univerjs/core';
import { DrawingTypeEnum } from '@univerjs/core';
/**
 * Now only support grouping images, shapes, and groups.
 */
export declare const DRAWING_GROUP_TYPES: DrawingTypeEnum[];
export interface IDrawingGroupOperationParams {
    drawings?: IDrawingParam[];
}
/**
 * Group the selected drawings into a new group. The selected drawings must be of type image, shape, or group, and there must be at least 2 drawings selected.
 */
export declare const SetDrawingGroupOperation: IOperation<IDrawingGroupOperationParams>;
export interface ICancelDrawingGroupOperationParams {
    drawings?: IDrawingParam[];
}
/**
 * Ungroup the selected groups. The selected drawings must be at least 1 group selected.
 */
export declare const CancelDrawingGroupOperation: IOperation<ICancelDrawingGroupOperationParams>;
