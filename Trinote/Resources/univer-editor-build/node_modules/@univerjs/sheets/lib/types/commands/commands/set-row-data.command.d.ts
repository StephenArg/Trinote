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
import type { ICommand, IObjectArrayPrimitiveType, IRowData, Nullable } from '@univerjs/core';
import type { ISheetCommandSharedParams } from '../utils/interface';
export type IRowProperties = Omit<IRowData, 'h' | 'ia' | 'ah' | 'hd'>;
export interface ISetRowDataCommandParams extends Partial<ISheetCommandSharedParams> {
    rowData: IObjectArrayPrimitiveType<Nullable<IRowProperties>>;
}
export declare const SetRowDataCommand: ICommand;
