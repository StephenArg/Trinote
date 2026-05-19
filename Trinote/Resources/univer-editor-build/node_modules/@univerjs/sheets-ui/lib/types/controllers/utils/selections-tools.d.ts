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
import type { IAccessor, Nullable } from '@univerjs/core';
import type { ISelectionWithStyle } from '@univerjs/sheets';
import { RANGE_TYPE } from '@univerjs/core';
export declare function getSheetSelectionsDisabled$(accessor: IAccessor): import("rxjs").Observable<boolean>;
/**
 * Detect if this row is selected
 * @param selections
 * @param rowIndex
 * @returns boolean
 */
export declare function isThisRowSelected(selections: Readonly<ISelectionWithStyle[]>, rowIndex: number): boolean;
/**
 * Detect if this col is selected
 * @param selections
 * @param colIndex
 * @returns boolean
 */
export declare function isThisColSelected(selections: Readonly<ISelectionWithStyle[]>, colIndex: number): boolean;
/**
 * Detect this row/col is in selections.
 * @param selections
 * @param indexOfRowCol
 * @param rowOrCol
 * @returns boolean
 */
export declare function matchedSelectionByRowColIndex(selections: Readonly<ISelectionWithStyle[]>, indexOfRowCol: number, rowOrCol: RANGE_TYPE.ROW | RANGE_TYPE.COLUMN): Nullable<ISelectionWithStyle>;
