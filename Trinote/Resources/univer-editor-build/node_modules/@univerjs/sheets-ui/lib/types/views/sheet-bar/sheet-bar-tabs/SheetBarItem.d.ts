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
import type { BooleanNumber } from '@univerjs/core';
import type { CSSProperties, KeyboardEventHandler, ReactNode } from 'react';
export interface IBaseSheetBarProps {
    label?: ReactNode;
    children?: unknown[];
    index?: number;
    color?: string;
    sheetId?: string;
    style?: CSSProperties;
    hidden?: BooleanNumber;
    selected?: boolean;
    menuOverlay?: ReactNode;
    className?: string;
    onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
    tabIndex?: number;
}
export declare function SheetBarItem(props: IBaseSheetBarProps): import("react/jsx-runtime").JSX.Element;
