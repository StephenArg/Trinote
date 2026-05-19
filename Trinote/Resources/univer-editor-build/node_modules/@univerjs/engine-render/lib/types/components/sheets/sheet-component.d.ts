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
import type { IRange, Nullable } from '@univerjs/core';
import type { IViewportInfo, Vector2 } from '../../basics/vector2';
import type { UniverRenderingContext } from '../../context';
import type { SHEET_EXTENSION_TYPE } from './extensions/sheet-extension';
import type { SpreadsheetSkeleton } from './sheet.render-skeleton';
import { RenderComponent } from '../component';
export declare abstract class SheetComponent extends RenderComponent<SpreadsheetSkeleton, SHEET_EXTENSION_TYPE, IRange[]> {
    private _skeleton?;
    constructor(oKey: string, _skeleton?: SpreadsheetSkeleton | undefined);
    getSkeleton(): SpreadsheetSkeleton | undefined;
    updateSkeleton(spreadsheetSkeleton: SpreadsheetSkeleton): void;
    render(mainCtx: UniverRenderingContext, bounds?: IViewportInfo): this | undefined;
    getParentScale(): {
        scaleX: number;
        scaleY: number;
    };
    abstract getDocuments(): any;
    abstract getNoMergeCellPositionByIndex(rowIndex: number, columnIndex: number): Nullable<{
        startY: number;
        startX: number;
        endX: number;
        endY: number;
    }>;
    getScrollXYByRelativeCoords(coord: Vector2): {
        x: number;
        y: number;
    };
    abstract getSelectionBounding(startRow: number, startColumn: number, endRow: number, endColumn: number): Nullable<{
        startRow: number;
        startColumn: number;
        endRow: number;
        endColumn: number;
    }>;
    protected abstract _draw(ctx: UniverRenderingContext, bounds?: IViewportInfo): void;
    /**
     * TODO: DR-Univer, fix as unknown as
     */
    dispose(): void;
}
export declare abstract class SpreadsheetHeader extends SheetComponent {
    protected _draw(ctx: UniverRenderingContext, bounds?: IViewportInfo): void;
}
