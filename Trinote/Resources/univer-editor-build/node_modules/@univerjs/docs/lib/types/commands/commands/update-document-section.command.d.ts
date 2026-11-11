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
import type { ICommand, ISectionBreak } from '@univerjs/core';
import { SectionType } from '@univerjs/core';
export type IDocumentSectionConfig = Omit<ISectionBreak, 'sectionId' | 'startIndex'>;
export interface IDocumentSectionUpdate {
    sectionId: string;
    config: Partial<IDocumentSectionConfig>;
}
export interface IUpdateDocumentSectionCommandParams {
    unitId: string;
    updates: IDocumentSectionUpdate[];
}
export interface IInsertDocumentSectionBreakCommandParams {
    unitId: string;
    offset: number;
    sectionId: string;
    config?: Partial<IDocumentSectionConfig>;
    nextSectionType?: SectionType;
}
export interface IDeleteDocumentSectionBreakCommandParams {
    unitId: string;
    sectionId: string;
}
export interface IInsertDocumentColumnBreakCommandParams {
    unitId: string;
    offset: number;
}
export declare const UpdateDocumentSectionCommand: ICommand<IUpdateDocumentSectionCommandParams>;
export declare const InsertDocumentSectionBreakCommand: ICommand<IInsertDocumentSectionBreakCommandParams>;
export declare const InsertDocumentColumnBreakCommand: ICommand<IInsertDocumentColumnBreakCommandParams>;
export declare const DeleteDocumentSectionBreakCommand: ICommand<IDeleteDocumentSectionBreakCommandParams>;
