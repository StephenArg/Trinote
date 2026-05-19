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
import type { IDocumentData, ITextRun } from '@univerjs/core';
export declare function covertTextRunToHtml(dataStream: string, textRun: ITextRun): string;
export declare function getBodySliceHtml(doc: IDocumentData, startIndex: number, endIndex: number): string;
export declare function convertBodyToHtml(doc: IDocumentData): string;
export declare class UDMToHtmlService {
    convert(docList: IDocumentData[]): string;
}
