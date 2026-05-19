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
import type { DocumentDataModel, IAccessor, IDocumentBody, IMutationInfo, ITextRangeParam, TextX } from '@univerjs/core';
import type { ITextRangeWithStyle } from '@univerjs/engine-render';
import type { IRichTextEditingMutationParams } from '../commands/mutations/core-editing.mutation';
export interface IReplaceSelectionFactoryParams {
    unitId: string;
    /**
     * selection to be replaced, if not provided, use the current selection.
     */
    selection?: ITextRangeParam;
    /** Body to be inserted at the given position. */
    body: IDocumentBody;
    /**
     * Text ranges to be replaced.
     */
    textRanges?: ITextRangeWithStyle[];
    doc?: DocumentDataModel;
}
export declare function replaceSelectionFactory(accessor: IAccessor, params: IReplaceSelectionFactoryParams): false | (IMutationInfo<IRichTextEditingMutationParams> & {
    textX: TextX;
});
