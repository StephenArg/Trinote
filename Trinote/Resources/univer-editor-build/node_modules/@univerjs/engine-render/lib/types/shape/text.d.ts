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
import type { Nullable } from '@univerjs/core';
import type { UniverRenderingContext } from '../context';
import type { IShapeProps } from './shape';
import { CellValueType, HorizontalAlign, TextDecoration, VerticalAlign } from '@univerjs/core';
import { DocSimpleSkeleton } from '../components/docs/layout/doc-simple-skeleton';
import { Shape } from './shape';
export interface ITextProps extends IShapeProps {
    width: number;
    height: number;
    text: string;
    fontStyle: string;
    warp?: boolean;
    hAlign?: HorizontalAlign;
    vAlign?: VerticalAlign;
    color?: Nullable<string>;
    strokeLine?: boolean;
    underline?: boolean;
    underlineType?: TextDecoration;
    cellValueType?: Nullable<CellValueType>;
}
export declare const TEXT_OBJECT_ARRAY: string[];
export declare class Text extends Shape<ITextProps> {
    text: string;
    fontStyle: string;
    warp: boolean;
    hAlign: HorizontalAlign;
    vAlign: VerticalAlign;
    skeleton: DocSimpleSkeleton;
    constructor(key: string, props: ITextProps);
    static drawWith(ctx: UniverRenderingContext, props: ITextProps, _skeleton?: DocSimpleSkeleton): number;
    /**
     * Draw text decoration lines (underline, strikethrough, etc.)
     */
    private static _drawTextDecoration;
    private static _drawLine;
    private static _setLineType;
    private static _isWave;
    private static _isDouble;
    protected _draw(ctx: UniverRenderingContext): void;
    makeDirty(state?: boolean): this | undefined;
    toJson(): {
        [x: string]: any;
    };
}
