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
import type { IDocumentData } from '@univerjs/core';
import type { CSSProperties, ReactNode, RefObject } from 'react';
import type { Editor } from '../../services/editor/editor';
import type { IKeyboardEventConfig } from './hooks';
export interface IRichTextEditorProps {
    className?: string;
    autoFocus?: boolean;
    onFocusChange?: (isFocus: boolean, newValue?: string) => void;
    initialValue?: IDocumentData | string;
    onClickOutside?: () => void;
    keyboardEventConfig?: IKeyboardEventConfig;
    moveCursor?: boolean;
    style?: CSSProperties;
    isSingle?: boolean;
    placeholder?: string;
    editorId?: string;
    onHeightChange?: (height: number) => void;
    onChange?: (data: IDocumentData, str: string) => void;
    maxHeight?: number;
    defaultHeight?: number;
    icon?: ReactNode;
    editorRef?: RefObject<Editor | null> | ((editor: Editor | null) => void);
    noStyle?: boolean;
}
export declare const RichTextEditor: (props: IRichTextEditorProps) => import("react/jsx-runtime").JSX.Element;
