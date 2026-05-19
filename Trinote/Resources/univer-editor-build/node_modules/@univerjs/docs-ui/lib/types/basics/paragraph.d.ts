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
import type { ICustomDecoration, ICustomRange, ICustomTable, IDocumentBody, IParagraph, ITextRun, ITextStyle, Nullable } from '@univerjs/core';
export declare function hasParagraphInTable(paragraph: IParagraph, tables: ICustomTable[]): boolean;
export declare function getTextRunAtPosition(body: IDocumentBody, position: number, defaultStyle: ITextStyle, cacheStyle: Nullable<ITextStyle>, isCellEditor?: boolean): ITextRun;
export declare function getCustomRangeAtPosition(customRanges: ICustomRange[], position: number, extendRange?: boolean): ICustomRange<Record<string, any>> | null | undefined;
export declare function getCustomDecorationAtPosition(customDecorations: ICustomDecoration[], position: number): ICustomDecoration[];
