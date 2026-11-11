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
import type { IAccessor } from '@univerjs/core';
import type { IMenuItem } from '@univerjs/ui';
import type { LocaleKey } from '../locale/types';
export declare const SHEETS_SORT_MENU_ID = "sheet.menu.sheets-sort";
export declare const SHEETS_SORT_CTX_MENU_ID = "sheet.menu.sheets-sort-ctx";
export declare function sortRangeMenuFactory(accessor: IAccessor): IMenuItem<LocaleKey>;
export declare function sortRangeAscMenuFactory(accessor: IAccessor): IMenuItem<LocaleKey>;
export declare function sortRangeAscExtMenuFactory(): IMenuItem<LocaleKey>;
export declare function sortRangeDescMenuFactory(): IMenuItem<LocaleKey>;
export declare function sortRangeDescExtMenuFactory(): IMenuItem<LocaleKey>;
export declare function sortRangeCustomMenuFactory(): IMenuItem<LocaleKey>;
export declare function sortRangeCtxMenuFactory(accessor: IAccessor): IMenuItem<LocaleKey>;
export declare function sortRangeAscCtxMenuFactory(accessor: IAccessor): IMenuItem<LocaleKey>;
export declare function sortRangeAscExtCtxMenuFactory(accessor: IAccessor): IMenuItem<LocaleKey>;
export declare function sortRangeDescCtxMenuFactory(accessor: IAccessor): IMenuItem<LocaleKey>;
export declare function sortRangeDescExtCtxMenuFactory(accessor: IAccessor): IMenuItem<LocaleKey>;
export declare function sortRangeCustomCtxMenuFactory(accessor: IAccessor): IMenuItem<LocaleKey>;
