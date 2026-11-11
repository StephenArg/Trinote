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
import type { ICommand, IDocumentBody, IParagraph, ISectionBreak, ITextRun } from '@univerjs/core';
export declare const CreateDocTableCommandId = "doc.command.create-table";
export interface ICreateDocTableCommandParams {
    rowCount: number;
    colCount: number;
}
export interface IDocTableInsertBodyParams {
    tableDataStream: string;
    tableParagraphs: IParagraph[];
    sectionBreaks: ISectionBreak[];
    tableId: string;
    textRun: ITextRun;
    existingParagraphIds?: Set<string>;
}
export declare function buildDocTableInsertBody(params: IDocTableInsertBodyParams): {
    dataStream: string;
    paragraphs: IParagraph[];
    sectionBreaks: ISectionBreak[];
    textRuns: {
        st: number;
        ed: number;
        sId?: string;
        ts?: import("@univerjs/core").ITextStyle;
    }[];
    tables: {
        startIndex: number;
        endIndex: number;
        tableId: string;
    }[];
};
export declare function shouldCreateParagraphBeforeTable(body: {
    dataStream: string;
}, startOffset: number): boolean;
export declare function normalizeTableInsertOffset(body: {
    dataStream: string;
}, startOffset: number): number;
export declare function canInsertTableAtOffset(body: Pick<IDocumentBody, 'tables' | 'blockRanges' | 'customBlocks'>, offset: number): boolean;
/**
 * The command to create a table at cursor point.
 */
export declare const CreateDocTableCommand: ICommand<ICreateDocTableCommandParams>;
