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
import { ArrangeTypeEnum } from '@univerjs/core';
export interface IDrawingArrangeOperationParams {
    arrangeType: ArrangeTypeEnum;
    drawings?: IDrawingParam[];
}
/**
 * Set the layer of the drawing, including forward, backward, front, and back
 */
export declare const SetDrawingArrangeOperation: IOperation<IDrawingArrangeOperationParams>;
export declare const SetDrawingArrangeFrontOperation: IOperation;
export declare const SetDrawingArrangeForwardOperation: IOperation;
export declare const SetDrawingArrangeBackOperation: IOperation;
export declare const SetDrawingArrangeBackwardOperation: IOperation;
