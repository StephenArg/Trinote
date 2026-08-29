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
import type { IViewportInfo } from '../../basics/vector2';
import type { UniverRenderingContext } from '../../context';
import type { IDocumentsConfig } from './doc-component';
import type { DocumentSkeleton } from './layout/doc-skeleton';
import { DocComponent } from './doc-component';
export declare class DocBackground extends DocComponent {
    private _drawLiquid;
    private _backgroundFillColor?;
    private _pageFillColor?;
    private _pageStrokeColor?;
    private _marginStrokeColor?;
    constructor(oKey: string, documentSkeleton?: DocumentSkeleton, config?: IDocumentsConfig);
    static create(oKey: string, documentSkeleton?: DocumentSkeleton, config?: IDocumentsConfig): DocBackground;
    setFillColors(backgroundFillColor?: string, pageFillColor?: string, pageStrokeColor?: string, marginStrokeColor?: string): void;
    draw(ctx: UniverRenderingContext, bounds?: IViewportInfo): void;
    private _drawWorkspaceBackground;
    changeSkeleton(newSkeleton: DocumentSkeleton): this;
    protected _draw(ctx: UniverRenderingContext, bounds?: IViewportInfo): void;
}
