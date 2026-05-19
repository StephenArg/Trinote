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
import type { ICellData, IObjectMatrixPrimitiveType, IRange, Nullable } from '@univerjs/core';
import type { IDiscreteRange } from '../../basics';
import type { IAutoFillCopyDataInTypeIndexInfo } from './type';
import { CellValueType, Direction } from '@univerjs/core';
declare function chineseToNumber(chnStr?: Nullable<string>): number;
declare function sectionToChinese(section: number): string;
declare function numberToChinese(num: number): string;
declare function isChnNumber(txt?: string): boolean;
declare function matchExtendNumber(txt?: string): {
    isExtendNumber: false;
} | {
    isExtendNumber: true;
    rawMatchTxt: string;
    matchNumber: number;
    beforeTxt: string;
    afterTxt: string;
};
declare function isChnWeek1(txt: string): boolean;
declare function isChnWeek2(txt: string): boolean;
declare function isChnWeek3(txt: string): boolean;
declare function getLenS(indexArr: any[], rsd: number): number;
/**
 * equal diff
 */
declare function isEqualDiff(arr: number[]): boolean;
declare function getDataIndex(csLen: number, asLen: number, indexArr: number[]): IAutoFillCopyDataInTypeIndexInfo;
declare function fillCopy(data: Array<Nullable<ICellData>>, len: number): {
    p: import("@univerjs/core").IDocumentData | null;
    s: string | import("@univerjs/core").IStyleData | null;
    v: import("@univerjs/core").CellValue | null;
    t: CellValueType | null;
    f: string | null;
    ref?: Nullable<string>;
    xf?: Nullable<string>;
    si: string | null;
    custom?: import("@univerjs/core").CustomData;
}[];
declare function fillCopyStyles(data: Array<Nullable<ICellData>>, len: number): {
    s: Nullable<string | import("@univerjs/core").IStyleData>;
}[];
declare function isEqualRatio(arr: number[]): boolean;
declare function getXArr(len: number): number[];
declare function fillSeries(data: Array<Nullable<ICellData>>, len: number, direction: Direction): ICellData[];
declare function forecast(x: number, yArr: number[], xArr: number[], forward?: boolean): number;
declare function fillExtendNumber(data: Array<Nullable<ICellData>>, len: number, step: number): ICellData[];
declare function fillOnlyFormat(data: Array<Nullable<ICellData>>, len: number): ICellData[];
declare function fillChnWeek(data: Array<Nullable<ICellData>>, len: number, step: number, weekType?: number): ICellData[];
declare function fillChnNumber(data: Array<Nullable<ICellData>>, len: number, step: number): ICellData[];
declare function isLoopSeries(txt: string): boolean;
declare function getLoopSeriesInfo(txt: string): {
    name: string;
    series: string[];
};
declare function fillLoopSeries(data: Array<Nullable<ICellData>>, len: number, step: number, series: string[]): ICellData[];
declare function getAutoFillRepeatRange(sourceRange: IRange, targetRange: IRange): {
    repeatStartCell: {
        col: number;
        row: number;
    };
    relativeRange: IRange;
}[];
/**
 * Formulas or Boolean values do not need to update cell.v
 */
declare function needsUpdateCellValue(cell: ICellData): boolean;
/**
 * Remove cell.custom
 */
declare function removeCellCustom(cell: Nullable<ICellData>): void;
declare function reverseIfNeed<T>(data: T[], reverse: boolean): T[];
declare function generateNullCellValueRowCol(range: IDiscreteRange[]): IObjectMatrixPrimitiveType<ICellData>;
declare const AutoFillTools: {
    chnNumChar: {
        零: number;
        一: number;
        二: number;
        三: number;
        四: number;
        五: number;
        六: number;
        七: number;
        八: number;
        九: number;
    };
    chnNumChar2: string[];
    chnUnitSection: string[];
    chnUnitChar: string[];
    chnNameValue: {
        十: {
            value: number;
            secUnit: boolean;
        };
        百: {
            value: number;
            secUnit: boolean;
        };
        千: {
            value: number;
            secUnit: boolean;
        };
        万: {
            value: number;
            secUnit: boolean;
        };
        亿: {
            value: number;
            secUnit: boolean;
        };
    };
    chineseToNumber: typeof chineseToNumber;
    sectionToChinese: typeof sectionToChinese;
    numberToChinese: typeof numberToChinese;
    isChnNumber: typeof isChnNumber;
    matchExtendNumber: typeof matchExtendNumber;
    isChnWeek1: typeof isChnWeek1;
    isChnWeek2: typeof isChnWeek2;
    isChnWeek3: typeof isChnWeek3;
    getLenS: typeof getLenS;
    isEqualDiff: typeof isEqualDiff;
    getDataIndex: typeof getDataIndex;
    fillCopy: typeof fillCopy;
    fillCopyStyles: typeof fillCopyStyles;
    isEqualRatio: typeof isEqualRatio;
    getXArr: typeof getXArr;
    fillSeries: typeof fillSeries;
    forecast: typeof forecast;
    fillExtendNumber: typeof fillExtendNumber;
    fillOnlyFormat: typeof fillOnlyFormat;
    fillChnWeek: typeof fillChnWeek;
    fillChnNumber: typeof fillChnNumber;
    isLoopSeries: typeof isLoopSeries;
    getLoopSeriesInfo: typeof getLoopSeriesInfo;
    fillLoopSeries: typeof fillLoopSeries;
    getAutoFillRepeatRange: typeof getAutoFillRepeatRange;
    needsUpdateCellValue: typeof needsUpdateCellValue;
    removeCellCustom: typeof removeCellCustom;
    reverseIfNeed: typeof reverseIfNeed;
    generateNullCellValueRowCol: typeof generateNullCellValueRowCol;
};
export default AutoFillTools;
