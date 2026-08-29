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
import type { ComponentType } from 'react';
import { NamedStyleType } from '@univerjs/core';
export declare const HEADING_ICON_MAP: Record<NamedStyleType, {
    key: string;
    component: ComponentType<{
        className: string;
    }>;
}>;
export declare function shouldShowParagraphHeadingOption(headingType: NamedStyleType, currentType?: NamedStyleType): boolean;
export declare const H1HeadingMenuItemFactory: (accessor: IAccessor) => IMenuItem;
export declare const H2HeadingMenuItemFactory: (accessor: IAccessor) => IMenuItem;
export declare const H3HeadingMenuItemFactory: (accessor: IAccessor) => IMenuItem;
export declare const H4HeadingMenuItemFactory: (accessor: IAccessor) => IMenuItem;
export declare const H5HeadingMenuItemFactory: (accessor: IAccessor) => IMenuItem;
export declare const NormalTextHeadingMenuItemFactory: (accessor: IAccessor) => IMenuItem;
export declare const TitleHeadingMenuItemFactory: (accessor: IAccessor) => IMenuItem;
export declare const SubtitleHeadingMenuItemFactory: (accessor: IAccessor) => IMenuItem;
export declare const EMPTY_PARAGRAPH_MENU_ID = "doc.menu.empty-paragraph";
export declare const EmptyParagraphH1MenuItemFactory: (accessor: IAccessor) => IMenuButtonItem;
export declare const EmptyParagraphH2MenuItemFactory: (accessor: IAccessor) => IMenuButtonItem;
export declare const EmptyParagraphH3MenuItemFactory: (accessor: IAccessor) => IMenuButtonItem;
export declare const EmptyParagraphH4MenuItemFactory: (accessor: IAccessor) => IMenuButtonItem;
export declare const EmptyParagraphH5MenuItemFactory: (accessor: IAccessor) => IMenuButtonItem;
export declare const EmptyParagraphNormalTextMenuItemFactory: (accessor: IAccessor) => IMenuButtonItem;
export declare const EmptyParagraphOrderListMenuItemFactory: (accessor: IAccessor) => IMenuButtonItem;
export declare const EmptyParagraphBulletListMenuItemFactory: (accessor: IAccessor) => IMenuButtonItem;
export declare const EmptyParagraphCheckListMenuItemFactory: (accessor: IAccessor) => IMenuButtonItem;
export declare const EmptyParagraphHorizontalLineMenuItemFactory: (accessor: IAccessor) => IMenuButtonItem;
export declare const CopyCurrentParagraphMenuItemFactory: (accessor: IAccessor) => IMenuItem;
export declare const CutCurrentParagraphMenuItemFactory: (accessor: IAccessor) => IMenuItem;
export declare const DeleteCurrentParagraphMenuItemFactory: (accessor: IAccessor) => IMenuItem;
export declare const InsertBulletListBellowMenuItemFactory: (accessor: IAccessor) => IMenuItem;
export declare const InsertOrderListBellowMenuItemFactory: (accessor: IAccessor) => IMenuItem;
export declare const InsertCheckListBellowMenuItemFactory: (accessor: IAccessor) => IMenuItem;
export declare const InsertHorizontalLineBellowMenuItemFactory: (accessor: IAccessor) => IMenuItem;
export declare const INSERT_BELLOW_MENU_ID = "doc.menu.insert-bellow";
export declare const DOC_CONTENT_INSERT_MENU_ID = "doc.menu.content-insert";
export declare const DOC_TABLE_BLOCK_MENU_ID = "doc.menu.table-block";
export declare function getDocBlockRangeMenuId(blockType: string): string;
export declare const TableBlockCopyMenuItemFactory: (accessor: IAccessor) => IMenuItem;
export declare const TableBlockPasteMenuItemFactory: (accessor: IAccessor) => IMenuItem;
export declare const TableBlockDeleteMenuItemFactory: (accessor: IAccessor) => IMenuItem;
export declare function DocInsertBellowMenuItemFactory(accessor: IAccessor): IMenuSelectorItem<string>;
