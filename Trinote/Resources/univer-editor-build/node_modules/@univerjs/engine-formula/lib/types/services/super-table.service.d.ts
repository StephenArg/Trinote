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
import type { Nullable } from '@univerjs/core';
import type { Observable } from 'rxjs';
import type { ISuperTable } from '../basics/common';
import { Disposable } from '@univerjs/core';
import { TableOptionType } from '../basics/common';
export interface ISuperTableOptionParam {
    tableOption: string;
    tableOptionType: TableOptionType;
}
export interface ISuperTableService {
    getTableMap(unitId: string): Nullable<Map<string, ISuperTable>>;
    getTableOptionMap(): Map<string, TableOptionType>;
    registerTable(unitId: string, tableName: string, reference: ISuperTable): void;
    registerTableOptionMap(tableOption: string, tableOptionType: TableOptionType): void;
    remove(unitId: string, tableName: string): void;
    update$: Observable<unknown>;
    getTable(unitId: string, tableName: string): Nullable<ISuperTable>;
    hasTable(unitId: string, tableName: string): boolean;
}
export declare class SuperTableService extends Disposable implements ISuperTableService {
    private _tableMap;
    private _tableOptionMap;
    private readonly _update$;
    readonly update$: Observable<unknown>;
    constructor();
    dispose(): void;
    remove(unitId: string, tableName: string): void;
    getTableMap(unitId: string): Map<string, ISuperTable> | undefined;
    getTableOptionMap(): Map<string, TableOptionType>;
    registerTable(unitId: string, tableName: string, reference: ISuperTable): void;
    registerTableOptionMap(tableOption: string, tableOptionType: TableOptionType): void;
    getTable(unitId: string, tableName: string): Nullable<ISuperTable>;
    hasTable(unitId: string, tableName: string): boolean;
    private _update;
}
export declare const ISuperTableService: import("@wendellhu/redi").IdentifierDecorator<ISuperTableService>;
