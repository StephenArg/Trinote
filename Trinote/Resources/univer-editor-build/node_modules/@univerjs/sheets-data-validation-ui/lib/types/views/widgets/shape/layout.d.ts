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
import type { IStyleData, Nullable } from '@univerjs/core';
import type { IDocumentSkeletonFontStyle } from '@univerjs/engine-render';
export declare const PADDING_H = 4;
export declare const PADDING_V = 0;
export declare const MARGIN_H = 4;
export declare const MARGIN_V = 4;
export declare const CELL_PADDING_H = 6;
export declare const CELL_PADDING_V = 6;
export declare const ICON_PLACE = 14;
export declare function measureDropdownItemText(text: string, style: Nullable<IStyleData>): import("@univerjs/engine-render").IDocumentSkeletonBoundingBox;
export declare function getDropdownItemSize(text: string, fontStyle: IDocumentSkeletonFontStyle): {
    width: number;
    height: number;
    ba: number;
};
export interface IDropdownLayoutInfo {
    layout: {
        width: number;
        height: number;
        ba: number;
    };
    text: string;
}
export interface IDropdownLine {
    width: number;
    height: number;
    items: (IDropdownLayoutInfo & {
        left: number;
    })[];
}
export declare function layoutDropdowns(items: string[], fontStyle: IDocumentSkeletonFontStyle, cellWidth: number, cellHeight: number): {
    lines: IDropdownLine[];
    totalHeight: number;
    contentWidth: number;
    contentHeight: number;
    cellAutoHeight: number;
    calcAutoWidth: number;
};
