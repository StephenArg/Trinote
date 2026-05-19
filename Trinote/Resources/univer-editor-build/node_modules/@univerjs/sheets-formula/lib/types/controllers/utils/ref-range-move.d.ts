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
import type { IRange, IUnitRange, Nullable } from '@univerjs/core';
import type { IFormulaReferenceMoveParam } from './ref-range-formula';
export interface IUnitRangeWithOffset extends IUnitRange {
    refOffsetX: number;
    refOffsetY: number;
    sheetName: string;
}
export declare enum OriginRangeEdgeType {
    UP = 0,
    DOWN = 1,
    LEFT = 2,
    RIGHT = 3,
    ALL = 4
}
export declare function getNewRangeByMoveParam(unitRangeWidthOffset: IUnitRangeWithOffset, formulaReferenceMoveParam: IFormulaReferenceMoveParam, currentFormulaUnitId: string, currentFormulaSheetId: string, options?: {
    preserveSheetQualifier?: boolean;
    inCrossSheetCutRange?: boolean;
}): string | undefined;
/**
 * Determine the range of the moving selection,
 * and check if it is at the edge of the reference range of the formula.
 * @param originRange
 * @param fromRange
 */
export declare function checkMoveEdge(originRange: IRange, fromRange: IRange): Nullable<OriginRangeEdgeType>;
