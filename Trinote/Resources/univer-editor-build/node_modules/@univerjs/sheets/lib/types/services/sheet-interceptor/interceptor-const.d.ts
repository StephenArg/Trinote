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
import type { ICellData, ICellDataForSheetInterceptor, ICellInterceptor, Nullable } from '@univerjs/core';
import type { ISheetLocation, ISheetRowLocation } from './utils/interceptor';
export declare const INTERCEPTOR_POINT: {
    CELL_CONTENT: ICellInterceptor<ICellDataForSheetInterceptor, ISheetLocation & {
        rawData: Nullable<ICellData>;
    }>;
    ROW_FILTERED: import("@univerjs/core").IInterceptor<boolean, ISheetRowLocation>;
};
export declare enum InterceptCellContentPriority {
    DATA_VALIDATION = 9,
    NUMFMT = 10,
    CELL_IMAGE = 11
}
export declare const RangeThemeInterceptorId = "sheet.interceptor.range-theme-id";
export declare const IgnoreRangeThemeInterceptorKey = "sheet.interceptor.ignore-range-theme";
