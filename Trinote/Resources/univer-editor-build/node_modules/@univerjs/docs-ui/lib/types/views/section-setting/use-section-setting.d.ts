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
import type { DocumentDataModel, IDocumentStyle, ISectionBreak, ITextRangeParam } from '@univerjs/core';
import type { IDocumentSectionUpdate } from '@univerjs/docs';
import { ColumnSeparatorType, PageOrientType, SectionType } from '@univerjs/core';
export interface ISectionSettingValues {
    columnCount: number | undefined;
    columnGap: number | undefined;
    separatorType: ColumnSeparatorType | undefined;
    sectionType: SectionType | undefined;
    pageWidth: number | undefined;
    pageHeight: number | undefined;
    pageOrient: PageOrientType | undefined;
    marginTop: number | undefined;
    marginBottom: number | undefined;
    marginLeft: number | undefined;
    marginRight: number | undefined;
    pageNumberStart: number | undefined;
}
export declare function getSectionSettingValues(sections: ISectionBreak[], documentStyle: IDocumentStyle): ISectionSettingValues;
export declare function createSectionColumnUpdates(sections: ISectionBreak[], documentStyle: IDocumentStyle, change: {
    columnCount: number;
} | {
    columnGap: number;
}): IDocumentSectionUpdate[];
export declare function createSectionOrientationUpdates(sections: ISectionBreak[], documentStyle: IDocumentStyle, pageOrient: PageOrientType): IDocumentSectionUpdate[];
export declare function getSelectedSections(documentDataModel: DocumentDataModel, ranges: Readonly<ITextRangeParam[]>): ISectionBreak[];
export declare function useSectionSetting(): {
    selectSection(sectionId: string): void;
    setColumnCount(value: number): Promise<boolean>;
    setColumnGap(value: number): Promise<boolean>;
    setSeparatorType(value: ColumnSeparatorType): Promise<boolean>;
    setSectionType(value: SectionType): Promise<boolean>;
    setPageWidth(value: number): Promise<boolean>;
    setPageHeight(value: number): Promise<boolean>;
    setPageOrient(value: PageOrientType): Promise<boolean>;
    setMarginTop(value: number): Promise<boolean>;
    setMarginBottom(value: number): Promise<boolean>;
    setMarginLeft(value: number): Promise<boolean>;
    setMarginRight(value: number): Promise<boolean>;
    setPageNumberStart(value: number): Promise<boolean>;
    columnCount: number | undefined;
    columnGap: number | undefined;
    separatorType: ColumnSeparatorType | undefined;
    sectionType: SectionType | undefined;
    pageWidth: number | undefined;
    pageHeight: number | undefined;
    pageOrient: PageOrientType | undefined;
    marginTop: number | undefined;
    marginBottom: number | undefined;
    marginLeft: number | undefined;
    marginRight: number | undefined;
    pageNumberStart: number | undefined;
    unitId: string | undefined;
    valid: boolean;
    selectedCount: number;
    sectionOptions: {
        label: string;
        value: string;
    }[];
    selectedSectionId: string | undefined;
};
