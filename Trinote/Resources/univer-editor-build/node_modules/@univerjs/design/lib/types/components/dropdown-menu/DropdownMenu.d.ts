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
import type { ComponentProps, ReactNode } from 'react';
import { DropdownMenuContent } from './DropdownMenuPrimitive';
interface IDropdownMenuNormalItem {
    type: 'item';
    className?: string;
    children: ReactNode;
    disabled?: boolean;
    onSelect?: (item: DropdownMenuType) => void;
}
interface IDropdownMenuNormalSubItem {
    type: 'subItem';
    className?: string;
    children: ReactNode;
    options?: DropdownMenuType[];
    disabled?: boolean;
    onSelect?: (item: DropdownMenuType) => void;
}
interface IDropdownMenuSeparatorItem {
    type: 'separator';
    className?: string;
}
interface IDropdownMenuOption {
    label?: ReactNode;
    value?: string;
    disabled?: boolean;
}
interface IDropdownMenuRadioItem {
    type: 'radio';
    className?: string;
    value: string;
    hideIndicator?: boolean;
    options: (IDropdownMenuOption | IDropdownMenuSeparatorItem)[];
    onSelect?: (item: string) => void;
}
interface IDropdownMenuCheckItem {
    type: 'checkbox';
    className?: string;
    label?: ReactNode;
    value: string;
    disabled?: boolean;
    checked?: boolean;
    onSelect?: (item: string) => void;
}
type DropdownMenuType = IDropdownMenuNormalItem | IDropdownMenuNormalSubItem | IDropdownMenuSeparatorItem | IDropdownMenuRadioItem | IDropdownMenuCheckItem;
export interface IDropdownMenuProps extends ComponentProps<typeof DropdownMenuContent> {
    children: ReactNode;
    items: DropdownMenuType[];
    disabled?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}
export declare function DropdownMenu(props: IDropdownMenuProps): import("react/jsx-runtime").JSX.Element;
export {};
