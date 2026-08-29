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
import type { IMenuItem, IMenuSelectorItem } from '@univerjs/ui';
import type { Observable } from 'rxjs';
import { MenuItemType } from '@univerjs/ui';
export declare const SHEET_TABLE_CONTEXT_INSERT_MENU_ID = "sheet.table.context-insert_menu-id";
export declare const SHEET_TABLE_CONTEXT_REMOVE_MENU_ID = "sheet.table.context-remove_menu-id";
export declare function sheetTableToolbarInsertMenuFactory(accessor: IAccessor): IMenuItem;
export declare function SheetTableInsertContextMenuFactory(accessor: IAccessor): IMenuSelectorItem<string>;
export declare function SheetTableRemoveContextMenuFactory(accessor: IAccessor): IMenuSelectorItem<string>;
export declare function SheetTableInsertRowMenuFactory(accessor: IAccessor): {
    id: string;
    type: MenuItemType;
    title: string;
    hidden$: Observable<boolean>;
};
export declare function SheetTableInsertColMenuFactory(accessor: IAccessor): {
    id: string;
    title: string;
    type: MenuItemType;
};
export declare function SheetTableRemoveRowMenuFactory(accessor: IAccessor): {
    id: string;
    type: MenuItemType;
    title: string;
    hidden$: Observable<boolean>;
};
export declare function SheetTableRemoveColMenuFactory(accessor: IAccessor): {
    id: string;
    title: string;
    type: MenuItemType;
};
export declare function getSheetTableRowColOperationHidden$(accessor: IAccessor): Observable<boolean>;
export declare function getSheetTableHeaderOperationHidden$(accessor: IAccessor): Observable<boolean>;
