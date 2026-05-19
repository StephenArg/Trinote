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
import type { BooleanNumber, IMutation, IObjectArrayPrimitiveType, IRange, IRowAutoHeightInfo, Nullable, Worksheet } from '@univerjs/core';
export interface ISetWorksheetRowHeightMutationParams {
    unitId: string;
    subUnitId: string;
    ranges: IRange[];
    rowHeight: number | IObjectArrayPrimitiveType<Nullable<number>>;
}
export interface ISetWorksheetRowIsAutoHeightMutationParams {
    unitId: string;
    subUnitId: string;
    ranges: IRange[];
    autoHeightInfo: BooleanNumber | IObjectArrayPrimitiveType<Nullable<BooleanNumber>>;
}
export interface ISetWorksheetRowAutoHeightMutationParams {
    unitId: string;
    subUnitId: string;
    rowsAutoHeightInfo: IRowAutoHeightInfo[];
}
export declare const SetWorksheetRowHeightMutationFactory: (params: ISetWorksheetRowHeightMutationParams, worksheet: Worksheet) => ISetWorksheetRowHeightMutationParams;
export declare const SetWorksheetRowIsAutoHeightMutationFactory: (params: ISetWorksheetRowIsAutoHeightMutationParams, worksheet: Worksheet) => ISetWorksheetRowIsAutoHeightMutationParams;
export declare const SetWorksheetRowAutoHeightMutationFactory: (params: ISetWorksheetRowAutoHeightMutationParams, worksheet: Worksheet) => ISetWorksheetRowAutoHeightMutationParams;
export declare const SetWorksheetRowHeightMutation: IMutation<ISetWorksheetRowHeightMutationParams>;
export declare const SetWorksheetRowIsAutoHeightMutation: IMutation<ISetWorksheetRowIsAutoHeightMutationParams>;
export declare const SetWorksheetRowAutoHeightMutation: IMutation<ISetWorksheetRowAutoHeightMutationParams>;
