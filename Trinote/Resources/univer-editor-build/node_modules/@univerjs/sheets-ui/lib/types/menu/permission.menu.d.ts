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
import type { IMenuButtonItem, IMenuItem, IMenuSelectorItem } from '@univerjs/ui';
import type { LocaleKey } from '../locale/types';
export declare const SHEET_PERMISSION_CONTEXT_MENU_ID = "sheet.contextMenu.permission";
export declare function sheetPermissionToolbarMenuFactory(accessor: IAccessor): IMenuItem<LocaleKey>;
export declare function sheetPermissionContextMenuFactory(accessor: IAccessor): IMenuSelectorItem<LocaleKey>;
export declare function sheetPermissionAddProtectContextMenuFactory(accessor: IAccessor): IMenuButtonItem<LocaleKey>;
export declare function sheetPermissionEditProtectContextMenuFactory(accessor: IAccessor): IMenuButtonItem<LocaleKey>;
export declare function sheetPermissionRemoveProtectContextMenuFactory(accessor: IAccessor): IMenuButtonItem<LocaleKey>;
export declare function sheetPermissionViewAllProtectRuleContextMenuFactory(accessor: IAccessor): IMenuButtonItem<LocaleKey>;
export declare function sheetPermissionProtectSheetInSheetBarMenuFactory(accessor: IAccessor): IMenuButtonItem<LocaleKey>;
export declare function sheetPermissionRemoveProtectionSheetBarMenuFactory(accessor: IAccessor): IMenuButtonItem<LocaleKey>;
export declare function sheetPermissionChangeSheetPermissionSheetBarMenuFactory(accessor: IAccessor): IMenuButtonItem<LocaleKey>;
export declare function sheetPermissionViewAllProtectRuleSheetBarMenuFactory(accessor: IAccessor): IMenuButtonItem<LocaleKey>;
