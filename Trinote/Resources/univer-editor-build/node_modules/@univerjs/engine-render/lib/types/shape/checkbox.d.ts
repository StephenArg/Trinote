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
import { Shape } from './shape';
export interface ICheckboxShapeProps extends IShapeProps {
    checked?: boolean;
}
export declare const CHECK_OBJECT_ARRAY: string[];
export declare class CheckboxShape extends Shape<ICheckboxShapeProps> {
    _checked: boolean;
    constructor(key: string, props: ICheckboxShapeProps);
    get checked(): boolean;
    static drawWith(ctx: UniverRenderingContext, props: ICheckboxShapeProps): void;
    protected _draw(ctx: UniverRenderingContext): void;
    toJson(): {
        [x: string]: any;
    };
}
