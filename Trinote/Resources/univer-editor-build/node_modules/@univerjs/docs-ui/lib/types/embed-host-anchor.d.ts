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
import type { UniverInstanceType } from '@univerjs/core';
import { DocumentFlavor } from '@univerjs/core';
export interface IDocsCustomBlockRenderViewportParams {
    childType?: UniverInstanceType;
    contentHeight?: number;
    contentWidth?: number;
    docsLeft?: number;
    documentFlavor?: DocumentFlavor;
    fallbackHeight?: number;
    fallbackWidth?: number;
    pageMarginLeft?: number;
    pageMarginRight?: number;
    pageWidth?: number;
    scale?: number;
    visibleCanvasHeight?: number;
    visibleCanvasLeft?: number;
    visibleCanvasWidth?: number;
}
export interface IDocsCustomBlockLayoutViewport {
    bleedLeft?: number;
    bleedWidth?: number;
    contentHeight?: number;
    contentWidth?: number;
    height: number;
    layoutWidth?: number;
    offsetLeft?: number;
    pageContentWidth?: number;
    viewScale?: number;
    visibleCanvasHeight?: number;
    viewportHeight?: number;
    width: number;
}
export declare function resolveDocsCustomBlockRenderViewport(params: IDocsCustomBlockRenderViewportParams): IDocsCustomBlockLayoutViewport;
