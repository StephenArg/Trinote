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
import type { ITextRange } from '../../../../sheets/typedef';
import type { IParagraph, IParagraphRange } from '../../../../types/interfaces';
export declare function makeSelection(startOffset: number, endOffset?: number): ITextRange;
export declare function normalizeSelection(selection: ITextRange): ITextRange;
export declare function isSegmentIntersects(start: number, end: number, start2: number, end2: number): boolean;
export declare function getParagraphsInRange(activeRange: ITextRange, paragraphs: IParagraph[], dataStream: string, paragraphRanges?: IParagraphRange[]): IParagraphRange[];
export declare function getParagraphsInRanges(ranges: readonly ITextRange[], paragraphs: IParagraph[], dataStream: string): IParagraphRange[];
export declare function transformParagraphs(paragraphs: IParagraph[], dataStream: string): IParagraphRange[];
