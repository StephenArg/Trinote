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
import type { ICustomRange, IParagraph, IPosition, Nullable } from '@univerjs/core';
import type { IBoundRectNoAngle, IDocumentSkeletonDrawing, IMouseEvent, IPointerEvent } from '@univerjs/engine-render';
import type { ISheetLocation, ISheetLocationBase } from '@univerjs/sheets';
import { Disposable, IUniverInstanceService } from '@univerjs/core';
import { IRenderManagerService } from '@univerjs/engine-render';
export interface IHoverCellPosition {
    position: IPosition;
    /**
     * location of cell
     */
    location: ISheetLocationBase;
}
export interface ICellWithEvent extends IHoverCellPosition {
    event: IMouseEvent | IPointerEvent;
}
export interface ICellPosWithEvent extends ISheetLocationBase {
    event: IMouseEvent | IPointerEvent;
}
export interface IHoverRichTextInfo extends IHoverCellPosition {
    /**
     * active custom range in cell, if cell is rich-text
     */
    customRange?: Nullable<ICustomRange>;
    /**
     * active bullet in cell, if cell is rich-text
     */
    bullet?: Nullable<IParagraph>;
    /**
     * rect of custom-range or bullet
     */
    rect?: Nullable<IBoundRectNoAngle>;
    drawing?: Nullable<{
        drawingId: string;
        rect: IBoundRectNoAngle;
        drawing: IDocumentSkeletonDrawing;
    }>;
}
export interface IHoverRichTextPosition extends ISheetLocationBase {
    /**
     * active custom range in cell, if cell is rich-text
     */
    customRange?: Nullable<ICustomRange>;
    /**
     * active bullet in cell, if cell is rich-text
     */
    bullet?: Nullable<IParagraph>;
    /**
     * rect of custom-range or bullet
     */
    rect?: Nullable<IBoundRectNoAngle>;
    drawing?: Nullable<{
        drawingId: string;
        rect: IBoundRectNoAngle;
        drawing: IDocumentSkeletonDrawing;
    }>;
    event?: IMouseEvent | IPointerEvent;
}
export interface IHoverHeaderPosition {
    unitId: string;
    subUnitId: string;
    index: number;
}
export declare function getLocationBase(location: ISheetLocation): {
    unitId: string;
    subUnitId: string;
    row: number;
    col: number;
};
export declare class HoverManagerService extends Disposable {
    private readonly _univerInstanceService;
    private readonly _renderManagerService;
    private _currentCell$;
    private _currentRichText$;
    private _currentClickedCell$;
    private _currentDbClickedCell$;
    private _currentCellWithEvent$;
    private _currentPointerDownCell$;
    private _currentPointerUpCell$;
    private _currentHoveredRowHeader$;
    private _currentHoveredColHeader$;
    private _currentRowHeaderClick$;
    private _currentColHeaderClick$;
    private _currentRowHeaderDbClick$;
    private _currentColHeaderDbClick$;
    private _currentRowHeaderPointerDown$;
    private _currentColHeaderPointerDown$;
    private _currentRowHeaderPointerUp$;
    private _currentColHeaderPointerUp$;
    currentCell$: import("rxjs").Observable<Nullable<IHoverCellPosition>>;
    currentRichTextNoDistinct$: import("rxjs").Observable<void | IHoverRichTextPosition | null | undefined>;
    currentRichText$: import("rxjs").Observable<void | IHoverRichTextPosition | null | undefined>;
    /**
     * Nearly same as currentRichText$, but with event
     */
    currentCellPosWithEvent$: import("rxjs").Observable<void | ICellPosWithEvent | null | undefined>;
    currentPosition$: import("rxjs").Observable<Nullable<IHoverCellPosition>>;
    currentClickedCell$: import("rxjs").Observable<IHoverRichTextInfo>;
    currentDbClickedCell$: import("rxjs").Observable<IHoverRichTextInfo>;
    currentPointerDownCell$: import("rxjs").Observable<ICellPosWithEvent>;
    currentPointerUpCell$: import("rxjs").Observable<ICellPosWithEvent>;
    currentHoveredRowHeader$: import("rxjs").Observable<Nullable<IHoverHeaderPosition>>;
    currentHoveredColHeader$: import("rxjs").Observable<Nullable<IHoverHeaderPosition>>;
    currentRowHeaderClick$: import("rxjs").Observable<IHoverHeaderPosition>;
    currentColHeaderClick$: import("rxjs").Observable<IHoverHeaderPosition>;
    currentRowHeaderDbClick$: import("rxjs").Observable<IHoverHeaderPosition>;
    currentColHeaderDbClick$: import("rxjs").Observable<IHoverHeaderPosition>;
    currentRowHeaderPointerDown$: import("rxjs").Observable<IHoverHeaderPosition>;
    currentColHeaderPointerDown$: import("rxjs").Observable<IHoverHeaderPosition>;
    currentRowHeaderPointerUp$: import("rxjs").Observable<IHoverHeaderPosition>;
    currentColHeaderPointerUp$: import("rxjs").Observable<IHoverHeaderPosition>;
    constructor(_univerInstanceService: IUniverInstanceService, _renderManagerService: IRenderManagerService);
    dispose(): void;
    private _initCellDisposableListener;
    private _getCalcDeps;
    private _calcActiveCell;
    private _calcActiveRowHeader;
    private _calcActiveColHeader;
    triggerPointerDown(unitId: string, event: IPointerEvent | IMouseEvent): void;
    triggerPointerUp(unitId: string, event: IPointerEvent | IMouseEvent): void;
    triggerMouseMove(unitId: string, event: IPointerEvent | IMouseEvent): void;
    /**
     * Trigger by pointerup.
     * @param unitId
     * @param offsetX
     * @param offsetY
     */
    triggerClick(unitId: string, offsetX: number, offsetY: number): void;
    triggerDbClick(unitId: string, offsetX: number, offsetY: number): void;
    triggerScroll(): void;
    triggerRowHeaderClick(unitId: string, offsetX: number, offsetY: number): void;
    triggerColHeaderClick(unitId: string, offsetX: number, offsetY: number): void;
    triggerRowHeaderDbClick(unitId: string, offsetX: number, offsetY: number): void;
    triggerColHeaderDbClick(unitId: string, offsetX: number, offsetY: number): void;
    triggerRowHeaderMouseMove(unitId: string, offsetX: number, offsetY: number): void;
    triggerColHeaderMouseMove(unitId: string, offsetX: number, offsetY: number): void;
    triggerRowHeaderPoniterDown(unitId: string, offsetX: number, offsetY: number): void;
    triggerColHeaderPoniterDown(unitId: string, offsetX: number, offsetY: number): void;
    triggerRowHeaderPoniterUp(unitId: string, offsetX: number, offsetY: number): void;
    triggerColHeaderPoniterUp(unitId: string, offsetX: number, offsetY: number): void;
}
