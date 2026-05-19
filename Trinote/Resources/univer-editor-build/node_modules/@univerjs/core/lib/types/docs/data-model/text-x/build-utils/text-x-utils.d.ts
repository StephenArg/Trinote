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
import type { ThemeService } from '../../../../services/theme/theme.service';
import type { Nullable } from '../../../../shared';
import type { ITextRange, ITextRangeParam } from '../../../../sheets/typedef';
import type { CustomRangeType, IDocumentBody } from '../../../../types/interfaces';
import type { DocumentDataModel } from '../../document-data-model';
import type { TextXAction } from '../action-types';
import type { TextXSelection } from '../text-x';
import { TextX } from '../text-x';
export interface IDeleteCustomRangeParam {
    rangeId: string;
    segmentId?: string;
    documentDataModel: DocumentDataModel;
    insert?: Nullable<IDocumentBody>;
}
export declare function deleteCustomRangeTextX(params: IDeleteCustomRangeParam): false | TextXSelection;
export interface IAddCustomRangeTextXParam {
    ranges: ITextRange[];
    segmentId?: string;
    rangeId: string;
    rangeType: CustomRangeType;
    properties?: Record<string, any>;
    wholeEntity?: boolean;
    body: IDocumentBody;
}
export declare function addCustomRangeTextX(param: IAddCustomRangeTextXParam): false | (TextX & {
    selections?: ITextRange[];
});
export declare function deleteSelectionTextX(selections: ITextRange[], body: IDocumentBody, memoryCursor?: number, insertBody?: Nullable<IDocumentBody>, keepBullet?: boolean): Array<TextXAction>;
export declare function retainSelectionTextX(selections: ITextRange[], body: IDocumentBody, memoryCursor?: number): TextXAction[];
export interface IReplaceSelectionTextXParams {
    /**
     * range to be replaced.
     */
    selection: ITextRangeParam;
    /** Body to be inserted at the given position. */
    body: IDocumentBody;
    /**
     * origin document data model.
     */
    doc: DocumentDataModel;
}
export declare const replaceSelectionTextX: (params: IReplaceSelectionTextXParams) => false | TextX;
export interface IReplaceSelectionTextRunsParams extends IReplaceSelectionTextXParams {
    themeService: ThemeService;
}
export declare const replaceSelectionTextRuns: (params: IReplaceSelectionTextRunsParams) => false | TextX;
