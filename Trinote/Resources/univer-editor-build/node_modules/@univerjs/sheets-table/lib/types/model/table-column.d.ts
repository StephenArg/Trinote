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
import type { IStyleData } from '@univerjs/core';
import type { TableMetaType } from '../types/type';
import { TableColumnDataTypeEnum } from '../types/enum';
export declare class TableColumn {
    dataType: TableColumnDataTypeEnum;
    id: string;
    displayName: string;
    formula: string;
    meta: TableMetaType;
    style: IStyleData;
    constructor(id: string, name: string);
    getMeta(): TableMetaType;
    setMeta(meta: TableMetaType): void;
    getDisplayName(): string;
    toJSON(): {
        id: string;
        displayName: string;
        dataType: TableColumnDataTypeEnum;
        formula: string;
        meta: TableMetaType;
        style: IStyleData;
    };
    fromJSON(json: any): void;
}
