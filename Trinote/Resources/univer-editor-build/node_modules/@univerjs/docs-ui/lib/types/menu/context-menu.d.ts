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
export declare const CopyMenuFactory: (accessor: IAccessor) => IMenuButtonItem;
export declare const ParagraphSettingMenuFactory: (accessor: IAccessor) => IMenuButtonItem;
export declare const CutMenuFactory: (accessor: IAccessor) => IMenuButtonItem;
export declare const PasteMenuFactory: (accessor: IAccessor) => IMenuButtonItem;
export declare const DeleteMenuFactory: (accessor: IAccessor) => IMenuButtonItem;
export declare const TABLE_INSERT_MENU_ID = "doc.menu.table-insert";
export declare function TableInsertMenuItemFactory(accessor: IAccessor): IMenuSelectorItem<string>;
export declare function InsertRowBeforeMenuItemFactory(accessor: IAccessor): IMenuButtonItem;
export declare function InsertRowAfterMenuItemFactory(accessor: IAccessor): IMenuButtonItem;
export declare function InsertColumnLeftMenuItemFactory(accessor: IAccessor): IMenuButtonItem;
export declare function InsertColumnRightMenuItemFactory(accessor: IAccessor): IMenuButtonItem;
export declare const TABLE_DELETE_MENU_ID = "doc.menu.table-delete";
export declare function TableDeleteMenuItemFactory(accessor: IAccessor): IMenuSelectorItem<string>;
export declare function DeleteRowsMenuItemFactory(accessor: IAccessor): IMenuButtonItem;
export declare function DeleteColumnsMenuItemFactory(accessor: IAccessor): IMenuButtonItem;
export declare function DeleteTableMenuItemFactory(accessor: IAccessor): IMenuButtonItem;
