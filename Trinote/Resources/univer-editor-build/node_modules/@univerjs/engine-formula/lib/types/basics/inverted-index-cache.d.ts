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
import type { NumericTuple } from '@flatten-js/interval-tree';
import type { ErrorType } from './error-type';
type ValueType = string | number | boolean;
type ValueTypeWithNullUndefined = ValueType | null | undefined;
type ValueTypeWithSymbol = ValueType | symbol;
export declare const DEFAULT_EMPTY_CELL_KEY: unique symbol;
export declare class InvertedIndexCache {
    /**
     * {
     *    unitId:{
     *       sheetId:{
     *          'columnIndex': {
     *              10:[1,3,4,5],
     *              5:[2,6,11,22]
     *          }
     *       }
     *    }
     * }
     */
    private _cache;
    private _continueBuildingCache;
    set(unitId: string, sheetId: string, column: number, value: ValueTypeWithNullUndefined, row: number, isForceUpdate?: boolean): void;
    getCellValuePositions(unitId: string, sheetId: string, column: number): Map<ValueTypeWithSymbol, Set<number>> | undefined;
    getCellPositions(unitId: string, sheetId: string, column: number, value: ValueTypeWithNullUndefined, rowsInCache: NumericTuple[]): {
        errorType: ErrorType | null;
        matchingRows: number[];
    } | undefined;
    setContinueBuildingCache(unitId: string, sheetId: string, column: number, startRow: number, endRow: number): void;
    shouldContinueBuildingCache(unitId: string, sheetId: string, column: number, row: number): boolean;
    canUseCache(unitId: string, sheetId: string, column: number, rangeStartRow: number, rangeEndRow: number): {
        rowsInCache: NumericTuple[];
        rowsNotInCache: NumericTuple[];
    };
    clear(): void;
    private _handleNewInterval;
}
export declare const CELL_INVERTED_INDEX_CACHE: InvertedIndexCache;
export {};
