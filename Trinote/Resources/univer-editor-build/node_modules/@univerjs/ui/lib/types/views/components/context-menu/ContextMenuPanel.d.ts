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
import type { IValueOption } from '../../../services/menu/menu';
import type { IMenuSchema } from '../../../services/menu/menu-manager.service';
import { ILayoutService } from '../../../services/layout/layout.service';
import { IMenuManagerService } from '../../../services/menu/menu-manager.service';
type ContextMenuSizeVariant = 'default' | 'paragraph-t';
type ContextMenuAutoFocusTarget = 'first-item' | 'container';
interface IContextMenuPanelProps {
    menuType: string;
    menuManagerService?: IMenuManagerService;
    layoutService?: ILayoutService;
    menuSessionVersion?: number;
    className?: string;
    activeItemIds?: string[];
    hiddenItemIds?: string[];
    flowQuickGroups?: boolean;
    sizeVariant?: ContextMenuSizeVariant;
    autoFocus?: boolean;
    autoFocusTarget?: ContextMenuAutoFocusTarget;
    suppressHoverUntilPointerMove?: boolean;
    onCancel?: () => void;
    onMenuPointerEnter?: () => void;
    onMenuPointerLeave?: () => void;
    onOptionSelect?: (option: IValueOption) => void;
}
interface IContextMenuSchemaRenderGroup {
    startIndex: number;
    endIndex: number;
    menuSchemas: IMenuSchema[];
}
export declare const CONTEXT_MENU_SUBMENU_CLOSE_DELAY = 500;
export declare const CONTEXT_MENU_SUBMENU_PORTAL_ATTR = "data-u-context-menu-submenu";
export declare function hasRenderableContextMenuSchema(menuSchema: IMenuSchema): boolean;
export declare function shouldShowContextMenuGroupSeparator(visibleSchemas: IMenuSchema[], index: number): boolean;
export declare function getContextMenuQuickGroupColumns(menuSchema: IMenuSchema): number | undefined;
export declare function getNextMenuButtonByDirection(buttons: HTMLButtonElement[], activeIndex: number, key: string): HTMLButtonElement;
export declare function getContextMenuSchemaRenderGroups(visibleSchemas: IMenuSchema[], flowQuickGroups?: boolean): IContextMenuSchemaRenderGroup[];
export declare function ContextMenuPanel(props: IContextMenuPanelProps): import("react").JSX.Element | null;
export {};
