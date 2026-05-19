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
import type { IParagraph, ISectionBreak, ITable, ITableCell, ITableColumn, ITableRow, Nullable } from '@univerjs/core';
import type { DocumentViewModel, ITextRangeWithStyle } from '@univerjs/engine-render';
export declare enum INSERT_ROW_POSITION {
    ABOVE = 0,
    BELLOW = 1
}
export declare enum INSERT_COLUMN_POSITION {
    LEFT = 0,
    RIGHT = 1
}
export declare function genEmptyTable(rowCount: number, colCount: number): {
    dataStream: string;
    paragraphs: IParagraph[];
    sectionBreaks: ISectionBreak[];
};
export declare function getEmptyTableCell(): ITableCell;
export declare function getEmptyTableRow(col: number): ITableRow;
export declare function getTableColumn(width: number): ITableColumn;
export declare function genTableSource(rowCount: number, colCount: number, pageContentWidth: number): ITable;
interface IRangeInfo {
    startOffset: number;
    endOffset: number;
    segmentId: string;
}
export declare function getRangeInfoFromRanges(textRange: Nullable<ITextRangeWithStyle>, rectRanges: Readonly<Nullable<ITextRangeWithStyle[]>>): Nullable<IRangeInfo>;
export declare function getInsertRowBody(col: number): {
    dataStream: string;
    paragraphs: IParagraph[];
    sectionBreaks: ISectionBreak[];
};
export declare function getInsertColumnBody(): {
    dataStream: string;
    paragraphs: IParagraph[];
    sectionBreaks: ISectionBreak[];
};
export declare function getInsertRowActionsParams(rangeInfo: IRangeInfo, position: INSERT_ROW_POSITION, viewModel: DocumentViewModel): {
    offset: number;
    colCount: number;
    tableId: string;
    insertRowIndex: number;
} | null;
export declare function getInsertColumnActionsParams(rangeInfo: IRangeInfo, position: INSERT_COLUMN_POSITION, viewModel: DocumentViewModel): {
    offsets: number[];
    tableId: string;
    columnIndex: number;
    rowCount: number;
} | null;
export declare function getColumnWidths(pageWidth: number, tableColumns: ITableColumn[], insertColumnIndex: number): {
    widths: number[];
    newColWidth: number;
};
export declare function getDeleteRowsActionsParams(rangeInfo: IRangeInfo, viewModel: DocumentViewModel): {
    tableId: string;
    rowIndexes: number[];
    offset: number;
    len: number;
    cursor: number;
    selectWholeTable: boolean;
} | null;
interface IRetainDeleteOffset {
    retain: number;
    delete: number;
}
export declare function getDeleteColumnsActionParams(rangeInfo: IRangeInfo, viewModel: DocumentViewModel): {
    offsets: IRetainDeleteOffset[];
    tableId: string;
    columnIndexes: number[];
    cursor: number;
    selectWholeTable: boolean;
    rowCount: number;
} | null;
export declare function getDeleteTableActionParams(rangeInfo: IRangeInfo, viewModel: DocumentViewModel): {
    tableId: string;
    offset: number;
    len: number;
    cursor: number;
} | null;
export declare function getDeleteRowContentActionParams(rangeInfo: IRangeInfo, viewModel: DocumentViewModel): {
    offsets: IRetainDeleteOffset[];
    tableId: string;
    cursor: number;
    rowCount: number;
} | null;
export interface IOffsets {
    startOffset: number;
    endOffset: number;
}
export declare enum CellPosition {
    NEXT = 0,
    PREV = 1
}
export declare function getCellOffsets(viewModel: DocumentViewModel, range: ITextRangeWithStyle, position: CellPosition): Nullable<IOffsets>;
export {};
