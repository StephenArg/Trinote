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
import type { IPosition, IRange } from '@univerjs/core';
import type { IBoundRectNoAngle, IViewportInfo, Vector2 } from '../../basics/vector2';
import type { Canvas } from '../../canvas';
import type { UniverRenderingContext2D } from '../../context';
import type { Scene } from '../../scene';
import type { Background } from './extensions/background';
import type { Border } from './extensions/border';
import type { Font } from './extensions/font';
import type { IPaintForRefresh, IPaintForScrolling } from './interfaces';
import type { SpreadsheetSkeleton } from './sheet.render-skeleton';
import { Documents } from '../docs/document';
import { SheetComponent } from './sheet-component';
export declare class Spreadsheet extends SheetComponent {
    private _allowCache;
    private _backgroundExtension;
    private _borderExtension;
    private _fontExtension;
    private _refreshIncrementalState;
    private _dirtyBounds;
    private _forceDisableGridlines;
    private _documents;
    isPrinting: boolean;
    constructor(oKey: string, spreadsheetSkeleton?: SpreadsheetSkeleton, _allowCache?: boolean);
    get backgroundExtension(): Background;
    get borderExtension(): Border;
    get fontExtension(): Font;
    getDocuments(): Documents;
    get allowCache(): boolean;
    get forceDisableGridlines(): boolean;
    dispose(): void;
    /**
     * draw by viewport
     * @param ctx
     * @param viewportInfo
     */
    draw(ctx: UniverRenderingContext2D, viewportInfo: IViewportInfo): void;
    addRenderFrameTimeMetricToScene(timeKey: string, val: number, scene: Scene): void;
    addRenderTagToScene(renderKey: string, val: any, scene?: Scene): void;
    /**
     * override for return type as Scene.
     * @returns Scene
     */
    getScene(): Scene;
    isHit(coord: Vector2): boolean;
    getNoMergeCellPositionByIndex(rowIndex: number, columnIndex: number): IPosition;
    getScrollXYByRelativeCoords(coord: Vector2): {
        x: number;
        y: number;
    };
    isForceDirty(): boolean;
    /**
     * canvas resize & zoom would call forceDirty
     * @param state
     */
    makeForceDirty(state?: boolean): void;
    setForceDisableGridlines(disabled: boolean): void;
    getSelectionBounding(startRow: number, startColumn: number, endRow: number, endColumn: number): IRange | undefined;
    /**
     * Since multiple controllers, not just the sheet-render.controller, invoke spreadsheet.makeDirty() — for instance, the cf.render-controller — it's essential to also call viewport.markDirty() whenever spreadsheet.makeDirty() is triggered.
     * @param state
     */
    makeDirty(state?: boolean): this;
    setDirtyArea(dirtyBounds: IBoundRectNoAngle[]): void;
    renderByViewports(mainCtx: UniverRenderingContext2D, viewportInfo: IViewportInfo, spreadsheetSkeleton: SpreadsheetSkeleton): void;
    paintNewAreaForScrolling(viewportInfo: IViewportInfo, param: IPaintForScrolling): void;
    /**
     * Redraw the entire viewport.
     */
    refreshCacheCanvas(viewportInfo: IViewportInfo, param: IPaintForRefresh): void;
    render(mainCtx: UniverRenderingContext2D, viewportInfo: IViewportInfo): this | undefined;
    /**
     * applyCache from cache canvas
     * @param cacheCanvas Source Image
     * @param ctx MainCtx
     * @param sx
     * @param sy
     * @param sw
     * @param sh
     * @param dx
     * @param dy
     * @param dw
     * @param dh
     */
    protected _applyCache(cacheCanvas: Canvas, ctx: UniverRenderingContext2D, sx?: number, sy?: number, sw?: number, sh?: number, dx?: number, dy?: number, dw?: number, dh?: number): void;
    protected _draw(ctx: UniverRenderingContext2D, bounds?: IViewportInfo): void;
    private _getAncestorSize;
    private _getAncestorParent;
    private _initialDefaultExtension;
    /**
     * draw gridlines
     * @param ctx
     */
    private _drawAuxiliary;
    /**
     * Clear the guide lines within a range in the table, to make room for merged cells and overflow.
     */
    private _clearRectangle;
    /**
     * Draw gap areas for row and column gaps.
     * Clears gridlines in gap regions and fills with gap style.
     */
    private _drawGapAreas;
    /**
     * Render a single gap rectangle: clear gridlines, fill background, draw diagonal stripes.
     */
    private _drawSingleGapRect;
    testShowRuler(cacheCtx: UniverRenderingContext2D, viewportInfo: IViewportInfo): void;
    testGetRandomLightColor(): string;
}
