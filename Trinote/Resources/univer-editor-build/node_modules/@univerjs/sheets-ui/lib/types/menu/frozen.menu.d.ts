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
import type { IMenuButtonItem, IMenuSelectorItem } from '@univerjs/ui';
export declare const SHEET_FROZEN_MENU_ID = "sheet.menu.sheet-frozen";
export declare function SheetFrozenMenuItemFactory(accessor: IAccessor): IMenuSelectorItem<string>;
export declare const SHEET_FROZEN_COLUMN_HEADER_MENU_ID = "sheet.column-header-menu.sheet-frozen";
export declare function SheetFrozenColumnHeaderMenuItemFactory(accessor: IAccessor): IMenuSelectorItem<string>;
export declare const SHEET_FROZEN_ROW_HEADER_MENU_ID = "sheet.row-header-menu.sheet-frozen";
export declare function SheetFrozenRowHeaderMenuItemFactory(accessor: IAccessor): IMenuSelectorItem<string>;
export declare function FrozenMenuItemFactory(accessor: IAccessor): IMenuButtonItem;
export declare function FrozenRowMenuItemFactory(accessor: IAccessor): IMenuButtonItem;
export declare function FrozenColMenuItemFactory(accessor: IAccessor): IMenuButtonItem;
export declare function FrozenFirstRowMenuItemFactory(accessor: IAccessor): IMenuButtonItem;
export declare function FrozenFirstColMenuItemFactory(accessor: IAccessor): IMenuButtonItem;
export declare function CancelFrozenMenuItemFactory(accessor: IAccessor): IMenuButtonItem;
