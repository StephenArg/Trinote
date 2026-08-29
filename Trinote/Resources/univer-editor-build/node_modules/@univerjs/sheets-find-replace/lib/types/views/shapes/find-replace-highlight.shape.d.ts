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
import type { IRgbColor, Nullable } from '@univerjs/core';
import type { IShapeProps } from '@univerjs/engine-render';
import { Shape } from '@univerjs/engine-render';
export interface ISheetFindReplaceHighlightShapeProps extends IShapeProps {
    inHiddenRange: boolean;
    color: IRgbColor;
    activated?: boolean;
}
export declare class SheetFindReplaceHighlightShape extends Shape<ISheetFindReplaceHighlightShapeProps> {
    protected _activated: boolean;
    protected _inHiddenRange: boolean;
    protected _color: Nullable<IRgbColor>;
    constructor(key?: string, props?: ISheetFindReplaceHighlightShapeProps);
    setShapeProps(props: Partial<ISheetFindReplaceHighlightShapeProps>): void;
    protected _draw(ctx: CanvasRenderingContext2D): void;
}
