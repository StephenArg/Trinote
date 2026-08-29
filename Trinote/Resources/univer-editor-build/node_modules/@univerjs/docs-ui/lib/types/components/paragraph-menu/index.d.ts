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
import type { ITextRangeWithStyle } from '@univerjs/engine-render';
import type { IPopup, IValueOption } from '@univerjs/ui';
import type { IMutiPageParagraphBound } from '../../services/doc-event-manager.service';
import type { IDocBlockMenuTarget } from '../../services/doc-paragraph-menu.service';
import { NamedStyleType } from '@univerjs/core';
export declare function getParagraphMenuIconSizeClass(iconKey: string): string;
export declare function getParagraphMenuPopupDirection(anchorLeft: number, menuWidth?: number, viewportPadding?: number): 'left' | 'right';
export declare const PARAGRAPH_MENU_HOVER_OPEN_DELAY = 260;
export declare function createParagraphMenuHoverOpenScheduler(openMenu: () => void, delay?: number): {
    schedule(): void;
    cancel: () => void;
    openNow(): void;
};
export declare function isEmptyParagraphMenuTarget(dataStream: string, paragraph?: IMutiPageParagraphBound | null | void): boolean;
export declare function getParagraphMenuTargetRange(paragraph?: IMutiPageParagraphBound | null | void): ITextRangeWithStyle | null;
export declare function getParagraphMenuActiveHeadingCommandId(namedStyleType?: NamedStyleType): string;
export declare function getParagraphMenuHiddenHeadingCommandIds(namedStyleType?: NamedStyleType): string[];
export declare function getParagraphMenuCommand(params: IValueOption, targetRange?: ITextRangeWithStyle | null): {
    commandId?: string;
    params?: object;
};
export declare function shouldShowParagraphSettingMenu(target: IDocBlockMenuTarget | null | undefined): boolean;
export declare const ParagraphMenu: ({ popup }: {
    popup: IPopup;
}) => import("react/jsx-runtime").JSX.Element;
export declare function shouldUseInsertBelowRange(commandId: string, params: IValueOption): boolean;
