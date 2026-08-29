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
import type { ICellData, Nullable } from '@univerjs/core';
import type { ICommonComparableCellValue } from './sheets-sort.controller';
import { SortType } from '../services/interface';
export declare enum ORDER {
    POSITIVE = 1,
    NEGATIVE = -1,
    ZERO = 0
}
export declare const compareNull: (a1: ICommonComparableCellValue, a2: ICommonComparableCellValue) => ORDER | null;
export declare const compareNumber: (a1: ICommonComparableCellValue, a2: ICommonComparableCellValue, type: SortType) => ORDER | null;
export declare const compareString: (a1: ICommonComparableCellValue, a2: ICommonComparableCellValue, type: SortType) => ORDER | null;
export declare const isNullValue: (cell: Nullable<ICellData>) => boolean;
