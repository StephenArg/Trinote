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
import { Command as CommandPrimitive } from 'cmdk';
export declare function Command({ className, ...props }: ComponentProps<typeof CommandPrimitive>): import("react").JSX.Element;
export declare function CommandInput({ className, ...props }: ComponentProps<typeof CommandPrimitive.Input>): import("react").JSX.Element;
export declare function CommandList({ className, ...props }: ComponentProps<typeof CommandPrimitive.List>): import("react").JSX.Element;
export declare function CommandEmpty({ className, ...props }: ComponentProps<typeof CommandPrimitive.Empty>): import("react").JSX.Element;
export declare function CommandGroup({ className, ...props }: ComponentProps<typeof CommandPrimitive.Group>): import("react").JSX.Element;
export declare function CommandItem({ className, ...props }: ComponentProps<typeof CommandPrimitive.Item>): import("react").JSX.Element;
export declare function CommandSeparator({ className, ...props }: ComponentProps<typeof CommandPrimitive.Separator>): import("react").JSX.Element;
export declare function CommandShortcut({ className, ...props }: ComponentProps<'span'>): import("react").JSX.Element;
