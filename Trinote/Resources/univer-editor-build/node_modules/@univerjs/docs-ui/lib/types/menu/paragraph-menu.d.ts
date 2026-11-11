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
export declare const TEXT_COLORS: string[];
export declare const TEXT_COLOR_SWATCH_ICONS: readonly ["DocParagraphTextColorSwatchIcon.0", "DocParagraphTextColorSwatchIcon.1", "DocParagraphTextColorSwatchIcon.2", "DocParagraphTextColorSwatchIcon.3", "DocParagraphTextColorSwatchIcon.4", "DocParagraphTextColorSwatchIcon.5", "DocParagraphTextColorSwatchIcon.6"];
export declare const BACKGROUND_COLOR_SWATCH_ICONS: readonly ["DocParagraphBackgroundColorSwatchIcon.0", "DocParagraphBackgroundColorSwatchIcon.1", "DocParagraphBackgroundColorSwatchIcon.2", "DocParagraphBackgroundColorSwatchIcon.3", "DocParagraphBackgroundColorSwatchIcon.4", "DocParagraphBackgroundColorSwatchIcon.5", "DocParagraphBackgroundColorSwatchIcon.6", "DocParagraphBackgroundColorSwatchIcon.7", "DocParagraphBackgroundColorSwatchIcon.8", "DocParagraphBackgroundColorSwatchIcon.9", "DocParagraphBackgroundColorSwatchIcon.10", "DocParagraphBackgroundColorSwatchIcon.11", "DocParagraphBackgroundColorSwatchIcon.12", "DocParagraphBackgroundColorSwatchIcon.13", "DocParagraphBackgroundColorSwatchIcon.14"];
export declare function H1HeadingMenuItemFactory(accessor: IAccessor): IMenuItem<LocaleKey>;
export declare function H2HeadingMenuItemFactory(accessor: IAccessor): IMenuItem<LocaleKey>;
export declare function H3HeadingMenuItemFactory(accessor: IAccessor): IMenuItem<LocaleKey>;
export declare function H4HeadingMenuItemFactory(accessor: IAccessor): IMenuItem<LocaleKey>;
export declare function H5HeadingMenuItemFactory(accessor: IAccessor): IMenuItem<LocaleKey>;
export declare function NormalTextHeadingMenuItemFactory(accessor: IAccessor): IMenuItem<LocaleKey>;
export declare function TitleHeadingMenuItemFactory(accessor: IAccessor): IMenuItem<LocaleKey>;
export declare function SubtitleHeadingMenuItemFactory(accessor: IAccessor): IMenuItem<LocaleKey>;
export declare const EMPTY_PARAGRAPH_MENU_ID = "doc.menu.empty-paragraph";
export declare function EmptyParagraphH1MenuItemFactory(): IMenuButtonItem<LocaleKey>;
export declare function EmptyParagraphH2MenuItemFactory(): IMenuButtonItem<LocaleKey>;
export declare function EmptyParagraphH3MenuItemFactory(): IMenuButtonItem<LocaleKey>;
export declare function EmptyParagraphH4MenuItemFactory(): IMenuButtonItem<LocaleKey>;
export declare function EmptyParagraphH5MenuItemFactory(): IMenuButtonItem<LocaleKey>;
export declare function EmptyParagraphNormalTextMenuItemFactory(): IMenuButtonItem<LocaleKey>;
export declare function EmptyParagraphOrderListMenuItemFactory(): IMenuButtonItem<LocaleKey>;
export declare function EmptyParagraphBulletListMenuItemFactory(): IMenuButtonItem<LocaleKey>;
export declare function EmptyParagraphCheckListMenuItemFactory(): IMenuButtonItem<LocaleKey>;
export declare function EmptyParagraphHorizontalLineMenuItemFactory(): IMenuButtonItem<LocaleKey>;
export declare function CopyCurrentParagraphMenuItemFactory(accessor: IAccessor): IMenuItem<LocaleKey>;
export declare function CutCurrentParagraphMenuItemFactory(accessor: IAccessor): IMenuItem<LocaleKey>;
export declare function DeleteCurrentParagraphMenuItemFactory(): IMenuItem<LocaleKey>;
export declare function InsertBulletListBellowMenuItemFactory(): IMenuItem<LocaleKey>;
export declare function InsertOrderListBellowMenuItemFactory(): IMenuItem<LocaleKey>;
export declare function InsertCheckListBellowMenuItemFactory(): IMenuItem<LocaleKey>;
export declare function InsertHorizontalLineBellowMenuItemFactory(): IMenuItem<LocaleKey>;
export declare const INSERT_BELLOW_MENU_ID = "doc.menu.insert-bellow";
export declare const DOC_CONTENT_INSERT_MENU_ID = "doc.menu.content-insert";
export declare const DOC_TABLE_BLOCK_MENU_ID = "doc.menu.table-block";
export declare const DOC_PARAGRAPH_T_INSERT_MENU_ID = "doc.menu.paragraph-t.insert";
export declare const DOC_PARAGRAPH_T_EDIT_MENU_ID = "doc.menu.paragraph-t.edit";
export declare const DOC_PARAGRAPH_T_DIVIDER_MENU_ID = "doc.menu.paragraph-t.divider";
export declare const DOC_PARAGRAPH_T_ALIGN_MENU_ID = "doc.menu.paragraph-t.align";
export declare const DOC_PARAGRAPH_T_COLORS_MENU_ID = "doc.menu.paragraph-t.colors";
export declare const DOC_PARAGRAPH_T_INSERT_BELOW_MENU_ID = "doc.menu.paragraph-t.insert-below";
export declare const DOC_PARAGRAPH_T_RESET_COLORS_ID = "doc.menu.paragraph-t.reset-colors";
export declare const DOC_PARAGRAPH_T_INDENT_INCREASE_ID = "doc.menu.paragraph-t.indent.increase";
export declare const DOC_PARAGRAPH_T_INDENT_DECREASE_ID = "doc.menu.paragraph-t.indent.decrease";
export declare const DOC_PARAGRAPH_T_INSERT_BELOW_COMMAND_ID = "doc.menu.paragraph-t.insert-below.command";
export declare function getDocBlockRangeMenuId(blockType: string): string;
export declare function TableBlockCopyMenuItemFactory(accessor: IAccessor): IMenuItem<LocaleKey>;
export declare function TableBlockPasteMenuItemFactory(): IMenuItem<LocaleKey>;
export declare function TableBlockDeleteMenuItemFactory(): IMenuItem<LocaleKey>;
export declare function DocInsertBellowMenuItemFactory(): IMenuSelectorItem<LocaleKey>;
export declare function ParagraphMenuAlignSubmenuItemFactory(accessor: IAccessor): IMenuSelectorItem<LocaleKey>;
export declare function ParagraphMenuColorsSubmenuItemFactory(accessor: IAccessor): IMenuSelectorItem<LocaleKey>;
export declare function ParagraphMenuTextColorHeaderActionMenuItemFactory(accessor: IAccessor): IMenuItem<LocaleKey>;
export declare function ParagraphMenuBackgroundColorHeaderActionMenuItemFactory(accessor: IAccessor): IMenuItem<LocaleKey>;
export declare function ParagraphMenuInsertBelowSubmenuItemFactory(accessor: IAccessor): IMenuSelectorItem<LocaleKey>;
export declare function ParagraphMenuInsertBelowHeadingH1MenuItemFactory(accessor: IAccessor): IMenuButtonItem<LocaleKey>;
export declare function ParagraphMenuInsertBelowHeadingH2MenuItemFactory(accessor: IAccessor): IMenuButtonItem<LocaleKey>;
export declare function ParagraphMenuInsertBelowHeadingH3MenuItemFactory(accessor: IAccessor): IMenuButtonItem<LocaleKey>;
export declare function ParagraphMenuInsertBelowHeadingH4MenuItemFactory(accessor: IAccessor): IMenuButtonItem<LocaleKey>;
export declare function ParagraphMenuInsertBelowHeadingH5MenuItemFactory(accessor: IAccessor): IMenuButtonItem<LocaleKey>;
export declare function ParagraphMenuInsertBelowTableMenuItemFactory(accessor: IAccessor): IMenuButtonItem<LocaleKey>;
export declare function ParagraphMenuIndentIncreaseMenuItemFactory(accessor: IAccessor): IMenuButtonItem<LocaleKey>;
export declare function ParagraphMenuIndentDecreaseMenuItemFactory(accessor: IAccessor): IMenuButtonItem<LocaleKey>;
export declare function ParagraphMenuDefaultTextColorMenuItemFactory(accessor: IAccessor): IMenuButtonItem<LocaleKey>;
export declare function ParagraphMenuNoBackgroundMenuItemFactory(accessor: IAccessor): IMenuButtonItem<LocaleKey>;
export declare function ParagraphMenuResetTextColorMenuItemFactory(accessor: IAccessor): IMenuButtonItem<LocaleKey>;
export declare function ParagraphMenuResetColorsMenuItemFactory(accessor: IAccessor): IMenuButtonItem<LocaleKey>;
export declare const ParagraphMenuTextColorSwatchMenuItemFactories: Record<string, {
    order: number;
    menuItemFactory: (accessor: IAccessor) => IMenuButtonItem<LocaleKey>;
}>;
export declare const ParagraphMenuBackgroundColorSwatchMenuItemFactories: Record<string, {
    order: number;
    menuItemFactory: (accessor: IAccessor) => IMenuButtonItem<LocaleKey>;
}>;
