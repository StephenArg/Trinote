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
import type { IContextMenuAnchorRect } from '@univerjs/ui';
import type { ReactElement } from 'react';
interface ISheetBarTabsContextMenuProps {
    children: ReactElement;
    anchorRect: IContextMenuAnchorRect | null;
    showContextMenu: boolean;
    visible: boolean;
    onCommandSelect: (commandId: string, value?: string | number) => void;
    onVisibleChange: (visible: boolean) => void;
}
export declare function SheetBarTabsContextMenu(props: ISheetBarTabsContextMenuProps): import("react/jsx-runtime").JSX.Element;
export {};
