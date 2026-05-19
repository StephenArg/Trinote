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
import type { ComponentProps } from 'react';
import { CheckboxItem, Content, Group, Item, Label, Portal, RadioGroup, RadioItem, Root, Separator, Sub, SubContent, SubTrigger, Trigger } from '@radix-ui/react-dropdown-menu';
declare function DropdownMenuPrimitive({ ...props }: ComponentProps<typeof Root>): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuPortal({ ...props }: ComponentProps<typeof Portal>): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuTrigger({ ...props }: ComponentProps<typeof Trigger>): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuGroup({ ...props }: ComponentProps<typeof Group>): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuSub({ ...props }: ComponentProps<typeof Sub>): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuRadioGroup({ ...props }: ComponentProps<typeof RadioGroup>): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuSubTrigger({ className, inset, children, ...props }: ComponentProps<typeof SubTrigger> & {
    inset?: boolean;
}): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuSubContent({ className, ...props }: ComponentProps<typeof SubContent>): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuContent({ className, sideOffset, ...props }: ComponentProps<typeof Content>): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuItem({ className, inset, variant, ...props }: ComponentProps<typeof Item> & {
    inset?: boolean;
    variant?: 'default' | 'destructive';
}): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuCheckboxItem({ className, children, hideIndicator, checked, ...props }: ComponentProps<typeof CheckboxItem> & {
    hideIndicator?: boolean;
}): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuRadioItem({ className, children, hideIndicator, ...props }: ComponentProps<typeof RadioItem> & {
    hideIndicator?: boolean;
}): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuLabel({ className, inset, ...props }: ComponentProps<typeof Label> & {
    inset?: boolean;
}): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuSeparator({ className, ...props }: ComponentProps<typeof Separator>): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuShortcut({ className, ...props }: ComponentProps<'span'>): import("react/jsx-runtime").JSX.Element;
export { DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuPrimitive, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, };
