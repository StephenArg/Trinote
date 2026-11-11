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
import type { IPopup } from '../../services/popup/canvas-popup.service';
export declare const SYMBOL_PICKER_COMPONENT = "ui.symbol-picker";
interface ISymbolPickerPopupProps {
    activeSymbol?: string;
    onSelect?: (symbol: string, options?: {
        keepOpen?: boolean;
    }) => void;
}
interface ISymbolPickerProps {
    className?: string;
    embedded?: boolean;
    onChange?: (symbol: string) => void;
    popup?: IPopup<ISymbolPickerPopupProps>;
}
export declare function SymbolPicker(props: ISymbolPickerProps): import("react").JSX.Element;
export {};
