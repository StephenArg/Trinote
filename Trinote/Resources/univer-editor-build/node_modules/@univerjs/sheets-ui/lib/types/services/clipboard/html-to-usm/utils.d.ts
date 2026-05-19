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
import type { IParagraph, IParagraphStyle, ITextRun, Nullable } from '@univerjs/core';
import type { ICellDataWithSpanInfo } from '../type';
export default function parseToDom(rawHtml: string): HTMLElement;
export declare function getParagraphStyle(el: HTMLElement): Nullable<IParagraphStyle>;
export declare function generateParagraphs(dataStream: string, prevParagraph?: IParagraph): IParagraph[];
export declare function convertToCellStyle(cell: ICellDataWithSpanInfo, dataStream: string, textRuns: ITextRun[] | undefined): ICellDataWithSpanInfo | {
    s: import("@univerjs/core").ITextStyle | undefined;
    p?: Nullable<import("@univerjs/core").IDocumentData>;
    v?: Nullable<import("@univerjs/core").CellValue>;
    t?: Nullable<import("@univerjs/core").CellValueType>;
    f?: Nullable<string>;
    ref?: Nullable<string>;
    xf?: Nullable<string>;
    si?: Nullable<string>;
    custom?: import("@univerjs/core").CustomData;
    rowSpan?: number;
    colSpan?: number;
    plain?: string;
};
