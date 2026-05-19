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
import type { VariantProps } from 'class-variance-authority';
import type { InputHTMLAttributes } from 'react';
type InputProps = InputHTMLAttributes<HTMLInputElement>;
export declare const inputVariants: (props?: ({
    size?: "small" | "middle" | "large" | "mini" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface IInputProps extends Pick<InputProps, 'onFocus' | 'onBlur'>, VariantProps<typeof inputVariants> {
    autoFocus?: boolean;
    className?: string;
    style?: React.CSSProperties;
    type?: HTMLInputElement['type'];
    placeholder?: string;
    value?: string;
    allowClear?: boolean;
    disabled?: boolean;
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onChange?: (value: string) => void;
    inputClass?: string;
    inputStyle?: React.CSSProperties;
    slot?: React.ReactNode;
}
export declare const Input: import("react").ForwardRefExoticComponent<IInputProps & import("react").RefAttributes<HTMLInputElement>>;
export {};
