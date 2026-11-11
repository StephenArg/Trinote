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
import type { BooleanNumber, ICommand, IDocumentBody, JSONXActions } from '@univerjs/core';
export declare enum HeaderFooterType {
    FIRST_PAGE_HEADER = 0,
    FIRST_PAGE_FOOTER = 1,
    DEFAULT_HEADER = 2,
    DEFAULT_FOOTER = 3,
    EVEN_PAGE_HEADER = 4,
    EVEN_PAGE_FOOTER = 5
}
export interface IHeaderFooterProps {
    /** Distance from the page edge to the header, in points (pt). */
    marginHeader?: number;
    /** Distance from the page edge to the footer, in points (pt). */
    marginFooter?: number;
    useFirstPageHeaderFooter?: BooleanNumber;
    evenAndOddHeaders?: BooleanNumber;
}
export type HeaderFooterCreateMode = 'single' | 'pair';
export interface ICreateHeaderFooterCommandParams {
    unitId: string;
    createType?: HeaderFooterType;
    segmentId?: string;
    headerFooterProps?: IHeaderFooterProps;
    createMode?: HeaderFooterCreateMode;
    /** Optional stable section id. Omit to configure the document-level default. */
    sectionId?: string;
}
export declare function getEmptyHeaderFooterBody(): IDocumentBody;
export declare function createHeaderFooterAction(segmentId: string | undefined, createType: HeaderFooterType, headerFooterConfig: IHeaderFooterProps, actions: JSONXActions, createMode?: HeaderFooterCreateMode, configPath?: Array<string | number>): JSONXActions;
export declare const CreateHeaderFooterCommand: ICommand<ICreateHeaderFooterCommandParams>;
