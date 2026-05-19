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
export interface ICheckboxProps {
    children?: ReactNode;
    /**
     * The class name of the checkbox group
     */
    className?: string;
    /**
     * The style of the checkbox group
     */
    style?: CSSProperties;
    /**
     * Used for setting the currently selected value
     * @default false
     */
    checked?: boolean;
    /**
     * Used for setting the checkbox to indeterminate
     * @default false
     */
    indeterminate?: boolean;
    /**
     * Used for setting the currently selected value
     * Only used when the checkbox is in a group
     */
    value?: string | number | boolean;
    /**
     * Specifies whether the checkbox is disabled
     * @default false
     */
    disabled?: boolean;
    /**
     * Set the handler to handle `click` event
     */
    onChange?: (value: string | number | boolean) => void;
    contentClassName?: string;
}
/**
 * Checkbox Component
 */
export declare function Checkbox(props: ICheckboxProps): import("react/jsx-runtime").JSX.Element;
