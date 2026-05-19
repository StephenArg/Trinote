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
import type { IPosition, IRange, Workbook, Worksheet } from '@univerjs/core';
import type { IBoundRectNoAngle, IRender, Scene, SpreadsheetSkeleton } from '@univerjs/engine-render';
import type { ICollaborator } from '@univerjs/protocol';
import type { ISheetLocation, ISheetSkeletonManagerParam } from '@univerjs/sheets';
export declare function getUserListEqual(userList1: ICollaborator[], userList2: ICollaborator[]): boolean;
export declare function checkCellContentInRanges(worksheet: Worksheet, ranges: IRange[]): boolean;
export declare function checkCellContentInRange(worksheet: Worksheet, range: IRange): boolean;
export declare function getCellIndexByOffsetWithMerge(offsetX: number, offsetY: number, scene: Scene, skeleton: SpreadsheetSkeleton): {
    actualRow: number;
    actualCol: number;
    mergeCell: import("@univerjs/core").Nullable<IRange>;
    row: number;
    col: number;
} | undefined;
export declare function getViewportByCell(row: number, column: number, scene: Scene, worksheet: Worksheet): import("@univerjs/engine-render").Viewport | undefined;
export declare function transformBound2OffsetBound(originBound: IBoundRectNoAngle, scene: Scene, skeleton: SpreadsheetSkeleton, worksheet: Worksheet): IBoundRectNoAngle;
export declare function transformPosition2Offset(x: number, y: number, scene: Scene, skeleton: SpreadsheetSkeleton, worksheet: Worksheet): {
    x: number;
    y: number;
};
export declare function getCellRealRange(workbook: Workbook, worksheet: Worksheet, skeleton: SpreadsheetSkeleton, row: number, col: number): ISheetLocation;
export declare function getHoverCellPosition(currentRender: IRender, workbook: Workbook, worksheet: Worksheet, skeletonParam: ISheetSkeletonManagerParam, offsetX: number, offsetY: number): {
    position: IPosition;
    location: {
        unitId: string;
        subUnitId: string;
        workbook: Workbook;
        worksheet: Worksheet;
        row: number;
        col: number;
    };
    overflowLocation: ISheetLocation;
} | null | undefined;
