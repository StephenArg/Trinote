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
import type { IViewportInfo, Vector2 } from '../../basics/vector2';
import type { UniverRenderingContext } from '../../context';
import type { IRowsHeaderCfgParam, RowHeaderLayout } from './extensions/row-header-layout';
import type { SpreadsheetSkeleton } from './sheet.render-skeleton';
import { SpreadsheetHeader } from './sheet-component';
export declare class SpreadsheetRowHeader extends SpreadsheetHeader {
    getDocuments(): void;
    getNoMergeCellPositionByIndex(rowIndex: number, columnIndex: number): Nullable<{
        startY: number;
        startX: number;
        endX: number;
        endY: number;
    }>;
    getSelectionBounding(startRow: number, startColumn: number, endRow: number, endColumn: number): Nullable<{
        startRow: number;
        startColumn: number;
        endRow: number;
        endColumn: number;
    }>;
    private _rowHeaderLayoutExtension;
    constructor(oKey: string, spreadsheetSkeleton?: SpreadsheetSkeleton);
    get rowHeaderLayoutExtension(): RowHeaderLayout;
    draw(ctx: UniverRenderingContext, bounds?: IViewportInfo): void;
    isHit(coord: Vector2): boolean;
    private _initialDefaultExtension;
    setCustomHeader(cfg: IRowsHeaderCfgParam, sheetId?: string): void;
}
