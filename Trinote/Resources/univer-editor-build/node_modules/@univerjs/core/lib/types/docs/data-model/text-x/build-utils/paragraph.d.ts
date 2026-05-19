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
import type { ICustomTable, IParagraph, IParagraphStyle, ITextStyle } from '../../../../types/interfaces';
import type { DocumentDataModel } from '../../document-data-model';
import { TextX } from '../text-x';
export interface ISwitchParagraphBulletParams {
    paragraphs: IParagraph[];
    listType: string;
    segmentId?: string;
    document: DocumentDataModel;
}
export declare const switchParagraphBullet: (params: ISwitchParagraphBulletParams) => TextX;
export interface IToggleChecklistParagraphParams {
    paragraphIndex: number;
    segmentId?: string;
    document: DocumentDataModel;
}
export declare const toggleChecklistParagraph: (params: IToggleChecklistParagraphParams) => false | TextX;
export interface ISetParagraphBulletParams {
    paragraphs: IParagraph[];
    listType: string;
    segmentId?: string;
    document: DocumentDataModel;
}
export declare const setParagraphBullet: (params: ISetParagraphBulletParams) => false | TextX;
export interface IChangeParagraphBulletNestLevelParams {
    paragraphs: IParagraph[];
    segmentId?: string;
    document: DocumentDataModel;
    type: 1 | -1;
}
export declare function hasParagraphInTable(paragraph: IParagraph, tables: ICustomTable[]): boolean;
export declare const changeParagraphBulletNestLevel: (params: IChangeParagraphBulletNestLevelParams) => TextX;
export interface ISetParagraphStyleParams {
    textRanges: readonly ITextRange[];
    segmentId?: string;
    document: DocumentDataModel;
    style: IParagraphStyle;
    paragraphTextRun?: ITextStyle;
    cursor?: number;
    deleteLen?: number;
    textX?: TextX;
}
export declare const setParagraphStyle: (params: ISetParagraphStyleParams) => TextX;
