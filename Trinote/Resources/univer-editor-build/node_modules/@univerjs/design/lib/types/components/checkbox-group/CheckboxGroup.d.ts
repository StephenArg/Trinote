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
import type { CSSProperties, ReactNode } from 'react';
export interface ICheckboxGroupProps {
    children: ReactNode[];
    /**
     * The class name of the checkbox group
     */
    className?: string;
    /**
     * The style of the checkbox group
     */
    style?: CSSProperties;
    /**
     * Define which checkbox is selected
     */
    value: Array<string | number | boolean>;
    /**
     * Whether the checkbox is disabled
     * @default false
     */
    disabled?: boolean;
    /**
     * Direction of the radio group
     * @default 'horizontal'
     */
    direction?: 'horizontal' | 'vertical';
    /**
     * The callback function triggered when switching options
     */
    onChange: (value: Array<string | number | boolean>) => void;
}
/**
 * CheckboxGroup Component
 */
export declare function CheckboxGroup(props: ICheckboxGroupProps): import("react/jsx-runtime").JSX.Element;
