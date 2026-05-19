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
import type { ButtonHTMLAttributes } from 'react';
export declare const buttonVariants: (props?: ({
    variant?: "link" | "text" | "default" | "primary" | "danger" | "ghost" | null | undefined;
    size?: "small" | "middle" | "large" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}
export declare const Button: import("react").ForwardRefExoticComponent<IButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
