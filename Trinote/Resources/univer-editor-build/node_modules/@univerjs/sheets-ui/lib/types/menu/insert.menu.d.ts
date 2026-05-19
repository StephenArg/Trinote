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
export declare const COL_INSERT_MENU_ID = "sheet.menu.col-insert";
export declare function ColInsertMenuItemFactory(accessor: IAccessor): IMenuSelectorItem<string>;
export declare const ROW_INSERT_MENU_ID = "sheet.menu.row-insert";
export declare function RowInsertMenuItemFactory(accessor: IAccessor): IMenuSelectorItem<string>;
export declare const CELL_INSERT_MENU_ID = "sheet.menu.cell-insert";
export declare function CellInsertMenuItemFactory(accessor: IAccessor): IMenuSelectorItem<string>;
/**
 * context menu when right click cell
 * @param accessor
 * @returns
 */
export declare function InsertRowBeforeMenuItemFactory(accessor: IAccessor): IMenuButtonItem;
/**
 * context menu when right click cell
 * @param accessor
 * @returns
 */
export declare function InsertRowBeforeCellMenuItemFactory(accessor: IAccessor): IMenuButtonItem<number>;
export declare function InsertRowAfterMenuItemFactory(accessor: IAccessor): IMenuButtonItem;
/**
 * context menu when right click cell
 * @param accessor
 */
export declare function InsertColLeftCellMenuItemFactory(accessor: IAccessor): IMenuButtonItem<number>;
export declare function InsertColBeforeMenuItemFactory(accessor: IAccessor): IMenuButtonItem;
export declare function InsertColAfterMenuItemFactory(accessor: IAccessor): IMenuButtonItem;
export declare function InsertRangeMoveRightMenuItemFactory(accessor: IAccessor): IMenuButtonItem;
/**
 * For insert range in cell context menu
 * @param accessor
 */
export declare function InsertRangeMoveDownMenuItemFactory(accessor: IAccessor): IMenuButtonItem;
/**
 * Context menu in rowheader.
 * @param accessor
 */
export declare function InsertMultiRowsAfterHeaderMenuItemFactory(accessor: IAccessor): IMenuButtonItem<number>;
/**
 * Context menu in rowheader.
 * @param accessor
 */
export declare function InsertMultiRowsAboveHeaderMenuItemFactory(accessor: IAccessor): IMenuButtonItem<number>;
/**
 * Context menu in rowheader.
 * @param accessor
 */
export declare function InsertMultiColsLeftHeaderMenuItemFactory(accessor: IAccessor): IMenuButtonItem<number>;
/**
 * Context menu in rowheader.
 * @param accessor
 */
export declare function InsertMultiColsRightHeaderMenuItemFactory(accessor: IAccessor): IMenuButtonItem<number>;
