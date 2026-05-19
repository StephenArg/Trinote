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
import type { InputHTMLAttributes, KeyboardEvent } from 'react';
export interface IInputNumberProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'defaultValue' | 'size'> {
    value?: number | null;
    defaultValue?: number;
    size?: 'mini' | 'small';
    min?: number;
    max?: number;
    step?: number;
    precision?: number;
    formatter?: (value: string | number | undefined) => string;
    parser?: (displayValue: string | undefined) => string;
    controls?: boolean;
    className?: string;
    inputClassName?: string;
    controlsClassName?: string;
    onChange?: (value: number | null) => void;
    onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
    onPressEnter?: (e: KeyboardEvent<HTMLInputElement>) => void;
    allowEmpty?: boolean;
}
export declare const InputNumber: import("react").ForwardRefExoticComponent<IInputNumberProps & import("react").RefAttributes<HTMLInputElement>>;
