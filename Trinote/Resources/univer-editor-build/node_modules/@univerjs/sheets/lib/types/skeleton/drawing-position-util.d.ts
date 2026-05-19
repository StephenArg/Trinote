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
import type { SpreadsheetSkeleton } from '@univerjs/engine-render';
import type { ICellOverGridPosition, ISheetOverGridPosition } from '../basics';
export declare function convertPositionSheetOverGridToAbsolute(unitId: string, subUnitId: string, sheetOverGridPosition: ISheetOverGridPosition, skeleton: SpreadsheetSkeleton): {
    unitId: string;
    subUnitId: string;
    left: number;
    top: number;
    width: number;
    height: number;
};
export declare function convertPositionCellToSheetOverGrid(unitId: string, subUnitId: string, cellOverGridPosition: ICellOverGridPosition, width: number, height: number, skeleton: SpreadsheetSkeleton): {
    unitId: string;
    subUnitId: string;
    sheetTransform: {
        from: {
            column: number;
            columnOffset: number;
            row: number;
            rowOffset: number;
        };
        to: {
            row: number;
            rowOffset: number;
            column: number;
            columnOffset: number;
        };
    };
    transform: {
        left: number;
        top: number;
        width: number;
        height: number;
    };
};
