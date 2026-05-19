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
import type { ReactNode } from 'react';
interface IOption {
    label?: string | ReactNode;
    value?: string;
    disabled?: boolean;
}
export interface IMultipleSelectProps {
    className?: string;
    /**
     * The value of select
     */
    value: string[];
    /**
     * Whether the select is disabled
     * @default false
     */
    disabled?: boolean;
    /**
     * The options of select
     * @default []
     */
    options?: IOption[];
    /**
     * The style of select
     * @default false
     */
    borderless?: boolean;
    /**
     * The callback function that is triggered when the value is changed
     */
    onChange: (values: string[]) => void;
}
export declare function MultipleSelect(props: IMultipleSelectProps): import("react/jsx-runtime").JSX.Element;
export {};
