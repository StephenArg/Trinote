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
import type { IUnitRangeName, Nullable } from '@univerjs/core';
import type { Editor, IRichTextEditorProps } from '@univerjs/docs-ui';
import type { ISelectionWithStyle } from '@univerjs/sheets';
export interface IRangeSelectorInstance {
    editor: Nullable<Editor>;
    blur: () => void;
    focus: () => void;
    showDialog: (ranges: IUnitRangeName[]) => void;
    hideDialog: () => void;
    verify: () => boolean;
    getValue: () => string;
}
export interface IRangeSelectorProps extends IRichTextEditorProps {
    unitId: string;
    subUnitId: string;
    maxRangeCount?: number;
    supportAcrossSheet?: boolean;
    /**
     * always return range ref with sheet name, default: false
     */
    keepSheetReference?: boolean;
    selectorRef?: React.RefObject<IRangeSelectorInstance | null>;
    onVerify?: (res: boolean, rangeText: string) => void;
    onRangeSelectorDialogVisibleChange?: (visible: boolean) => void;
    hideEditor?: boolean;
    forceShowDialogWhenSelectionChanged?: boolean;
    resetRange?: ISelectionWithStyle[];
}
export interface IRangeSelectorDialogProps {
    visible: boolean;
    initialValue: IUnitRangeName[];
    unitId: string;
    subUnitId: string;
    maxRangeCount?: number;
    supportAcrossSheet?: boolean;
    keepSheetReference?: boolean;
    onConfirm: (ranges: IUnitRangeName[]) => void;
    onClose: () => void;
    onShowBySelection?: (ranges: IUnitRangeName[]) => boolean;
}
export declare function RangeSelectorDialog(props: IRangeSelectorDialogProps): import("react/jsx-runtime").JSX.Element;
export declare function parseRanges(rangeString: string): IUnitRangeName[];
export declare function stringifyRanges(ranges: IUnitRangeName[]): string;
export declare function RangeSelector(props: IRangeSelectorProps): import("react/jsx-runtime").JSX.Element;
