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
import type { IRange, IScale, ISelectionCellWithMergeInfo } from '@univerjs/core';
import type { IDrawInfo, SpreadsheetSkeleton, UniverRenderingContext } from '@univerjs/engine-render';
import { SheetExtension } from '@univerjs/engine-render';
type IGraphicsRenderer = (ctx: UniverRenderingContext, skeleton: SpreadsheetSkeleton, coordInfo: ISelectionCellWithMergeInfo) => void;
export declare class Graphics extends SheetExtension {
    uKey: string;
    protected Z_INDEX: number;
    private _graphicsRenderMap;
    registerRenderer(key: string, renderer: IGraphicsRenderer): void;
    draw(ctx: UniverRenderingContext, _parentScale: IScale, skeleton: SpreadsheetSkeleton, diffBounds: IRange[], { viewRanges }: IDrawInfo): void;
    dispose(): void;
    copy(): Graphics;
}
export {};
