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
import type { ButtonHTMLAttributes, ReactNode } from 'react';
export interface IMobileActionRowProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'title' | 'value'> {
    title: ReactNode;
    icon?: ReactNode;
    value?: string;
    valueType?: 'color' | 'text';
    trailing?: ReactNode;
    bordered?: boolean;
    variant?: 'surface' | 'subtle';
}
export declare function MobileActionRow(props: IMobileActionRowProps): import("react").JSX.Element;
