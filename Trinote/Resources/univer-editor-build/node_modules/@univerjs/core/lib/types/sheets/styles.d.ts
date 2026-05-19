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
import type { Nullable } from '../shared';
import type { IStyleData } from '../types/interfaces';
import type { ICellDataForSheetInterceptor } from './typedef';
/**
 * Styles in a workbook, cells locate styles based on style IDs
 *
 */
export declare class Styles {
    private _styles;
    private _cacheMap;
    constructor(styles?: Record<string, Nullable<IStyleData>>);
    each(callback: (value: [string, Nullable<IStyleData>], index: number, array: Array<[string, Nullable<IStyleData>]>) => void): this;
    search(data: IStyleData, styleObject: string): string;
    get(id: string | Nullable<IStyleData>): Nullable<IStyleData>;
    add(data: IStyleData, styleObject: string): string;
    setValue(data: Nullable<IStyleData>): Nullable<string>;
    addCustomStyle(id: string, data: Nullable<IStyleData>): void;
    remove(id: string): void;
    toJSON(): Record<string, Nullable<IStyleData>>;
    getStyleByCell(cell: Nullable<ICellDataForSheetInterceptor>): Nullable<IStyleData>;
    private _generateCacheMap;
    private _getExistingStyleId;
}
