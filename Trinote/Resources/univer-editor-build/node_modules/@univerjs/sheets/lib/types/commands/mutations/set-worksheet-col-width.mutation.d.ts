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
import type { IMutation, IObjectArrayPrimitiveType, IRange, Nullable, Worksheet } from '@univerjs/core';
export interface ISetWorksheetColWidthMutationParams {
    unitId: string;
    subUnitId: string;
    ranges: IRange[];
    colWidth: number | IObjectArrayPrimitiveType<Nullable<number>>;
}
/**
 * This factory is for generating undo mutations for command {@link DeltaColumnWidthCommand}.
 *
 * Note that this mutation may return multi mutations params if the column width is different
 * for each column in the range.
 */
export declare const SetWorksheetColWidthMutationFactory: (params: ISetWorksheetColWidthMutationParams, worksheet: Worksheet) => ISetWorksheetColWidthMutationParams;
/**
 * Set width of column manually
 */
export declare const SetWorksheetColWidthMutation: IMutation<ISetWorksheetColWidthMutationParams>;
