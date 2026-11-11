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
import type { Attributes, ReactNode } from 'react';
import type { ICustomLabelProps } from '../../custom-label/CustomLabel';
type SidebarCustomLabelProps = ICustomLabelProps & Attributes;
export interface ISidebarMethodOptions {
    id?: string;
    header?: SidebarCustomLabelProps;
    children?: SidebarCustomLabelProps;
    footer?: SidebarCustomLabelProps;
    visible?: boolean;
    width?: number | string;
    onClose?: (id?: string) => void;
    onOpen?: () => void;
}
export interface IRenderedSidebarOptions extends Omit<ISidebarMethodOptions, 'children' | 'footer' | 'header'> {
    children?: ReactNode;
    footer?: ReactNode;
    header?: ReactNode;
}
export declare function renderSidebarOptions(options?: ISidebarMethodOptions): IRenderedSidebarOptions | null;
export declare function Sidebar(): import("react").JSX.Element;
export {};
