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
import type { IAccessor, IRange } from '@univerjs/core';
import { CommandType } from '@univerjs/core';
export declare const OpenTableSelectorOperation: {
    type: CommandType;
    id: string;
    handler(accessor: IAccessor): Promise<boolean>;
};
export interface ITableSelectionInfo {
    unitId: string;
    subUnitId: string;
    range: IRange;
    tableId?: string;
}
export declare function openRangeSelector(accessor: IAccessor, unitId: string, subUnitId: string, range: IRange, tableId?: string): Promise<ITableSelectionInfo | null>;
