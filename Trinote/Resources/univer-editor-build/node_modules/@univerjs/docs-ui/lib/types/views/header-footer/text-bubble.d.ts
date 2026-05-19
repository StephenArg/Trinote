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
import type { IShapeProps, UniverRenderingContext } from '@univerjs/engine-render';
import { Shape } from '@univerjs/engine-render';
export declare const COLLAB_CURSOR_LABEL_HEIGHT = 18;
export declare const COLLAB_CURSOR_LABEL_MAX_WIDTH = 200;
export declare const COLLAB_CURSOR_LABEL_TEXT_PADDING_LR = 6;
export declare const COLLAB_CURSOR_LABEL_TEXT_PADDING_TB = 4;
export interface ITextBubbleShapeProps extends IShapeProps {
    color: string;
    text: string;
}
/**
 * Render a single collaborated cursor on the canvas.
 */
export declare class TextBubbleShape<T extends ITextBubbleShapeProps = ITextBubbleShapeProps> extends Shape<T> {
    color: string;
    text: string;
    constructor(key: string, props: T);
    static drawWith(ctx: CanvasRenderingContext2D, props: ITextBubbleShapeProps): void;
    protected _draw(ctx: UniverRenderingContext): void;
}
