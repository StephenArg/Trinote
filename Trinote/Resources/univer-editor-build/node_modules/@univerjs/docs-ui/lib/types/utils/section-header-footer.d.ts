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
import type { IDocumentData, IDocumentStyle, ISectionBreak, Nullable } from '@univerjs/core';
import type { DocumentViewModel, IDocumentSkeletonPage } from '@univerjs/engine-render';
import { HeaderFooterType } from '@univerjs/docs';
import { DocumentEditArea } from '@univerjs/engine-render';
export interface IDocPageSectionContext {
    sectionId?: string;
    sectionIndex: number;
    sections: ISectionBreak[];
    section?: ISectionBreak;
    /** Effective config after applying the owning section over document defaults. */
    config: IDocumentStyle & Partial<ISectionBreak>;
}
export interface IHeaderFooterTarget {
    createType: Nullable<HeaderFooterType>;
    headerFooterId: Nullable<string>;
    sectionId?: string;
}
export declare function getDocPageSectionContext(snapshot: IDocumentData, page?: Pick<IDocumentSkeletonPage, 'sectionId'>): IDocPageSectionContext;
export declare function getHeaderFooterTarget(viewModel: DocumentViewModel, editArea: DocumentEditArea, segmentPage: number, page?: IDocumentSkeletonPage): IHeaderFooterTarget;
