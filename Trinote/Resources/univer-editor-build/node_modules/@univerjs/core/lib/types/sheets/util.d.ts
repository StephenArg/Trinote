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
import type { Nullable } from '../shared';
import type { CellValueType, TextDirection } from '../types/enum';
import type { IPaddingData, IStyleBase, IStyleData, ITextRotation, ITextStyle } from '../types/interfaces';
import type { ICellData, IRange, IUnitRange } from './typedef';
import { DocumentDataModel } from '../docs';
import { HorizontalAlign, VerticalAlign, WrapStrategy } from '../types/enum';
export interface IFontLocale {
    fontList: string[];
    defaultFontSize: number;
}
export declare const isRangesEqual: (oldRanges: IRange[], ranges: IRange[]) => boolean;
export declare const isUnitRangesEqual: (oldRanges: IUnitRange[], ranges: IUnitRange[]) => boolean;
export declare const DEFAULT_PADDING_DATA: {
    t: number;
    b: number;
    l: number;
    r: number;
};
export declare const getDefaultBaselineOffset: (fontSize: number) => {
    sbr: number;
    sbo: number;
    spr: number;
    spo: number;
};
export interface ICellStyle {
    textRotation?: ITextRotation;
    textDirection?: Nullable<TextDirection>;
    horizontalAlign?: HorizontalAlign;
    verticalAlign?: VerticalAlign;
    wrapStrategy?: WrapStrategy;
    paddingData?: IPaddingData;
    cellValueType?: CellValueType;
}
export declare const VERTICAL_ROTATE_ANGLE = 90;
export declare function createDocumentModelWithStyle(content: string, textStyle: ITextStyle, config?: ICellStyle): DocumentDataModel;
export declare function extractOtherStyle(style?: Nullable<IStyleData>): ICellStyle;
/**
 * Pick font style from cell style.
 * Important note: Do not add attributes to this method arbitrarily.
 * @param format
 * @returns {IStyleBase} style
 */
export declare function getFontFormat(format?: Nullable<IStyleData>): IStyleBase;
export declare function addLinkToDocumentModel(documentModel: DocumentDataModel, linkUrl: string, linkId: string): void;
export declare function isNotNullOrUndefined<T>(value: T | null | undefined): value is T;
export declare function getEmptyCell(): ICellData;
