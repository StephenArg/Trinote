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
import type { IUniverInstanceService, Nullable } from '@univerjs/core';
import type { Engine, IRenderContext, IRenderManagerService, Rect, Scene, Spreadsheet, SpreadsheetColumnHeader, SpreadsheetHeader, SpreadsheetSkeleton, Viewport } from '@univerjs/engine-render';
import { Workbook } from '@univerjs/core';
export interface ISheetObjectParam {
    spreadsheet: Spreadsheet;
    spreadsheetRowHeader: SpreadsheetHeader;
    spreadsheetColumnHeader: SpreadsheetColumnHeader;
    /**
     * sheet corner: a rect which placed on the intersection of rowHeader & columnHeader
     */
    spreadsheetLeftTopPlaceholder: Rect;
    scene: Scene;
    engine: Engine;
}
/**
 * Get render objects of a spreadsheet.
 */
export declare function getSheetObject(univerInstanceService: IUniverInstanceService | Workbook, renderManagerService: IRenderManagerService | IRenderContext): Nullable<ISheetObjectParam>;
export declare function getCoordByCell(row: number, col: number, scene: Scene, skeleton: SpreadsheetSkeleton): {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
};
export declare function getCoordByOffset(evtOffsetX: number, evtOffsetY: number, scene: Scene, skeleton: SpreadsheetSkeleton, viewport?: Viewport, closeFirst?: boolean): {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    row: number;
    column: number;
};
export declare function getTransformCoord(evtOffsetX: number, evtOffsetY: number, scene: Scene, skeleton: SpreadsheetSkeleton): {
    x: number;
    y: number;
};
