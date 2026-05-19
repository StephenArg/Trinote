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
import type { CSSProperties, PropsWithChildren, ReactNode } from 'react';
export interface IFormLayoutProps {
    label?: ReactNode;
    desc?: ReactNode;
    children?: ReactNode;
    style?: CSSProperties;
    className?: string;
    contentStyle?: CSSProperties;
    error?: string;
    collapsable?: boolean;
    defaultCollapsed?: boolean;
}
export declare const FormLayout: (props: IFormLayoutProps) => import("react/jsx-runtime").JSX.Element;
export type IFormDualColumnLayoutProps = PropsWithChildren;
/**
 * A dual columns layout component for the form.
 * @param props props of the component
 */
export declare const FormDualColumnLayout: (props: IFormDualColumnLayoutProps) => import("react/jsx-runtime").JSX.Element;
