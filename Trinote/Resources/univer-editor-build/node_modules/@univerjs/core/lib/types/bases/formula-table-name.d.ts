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
import type { IBaseSnapshot, ITableSnapshot } from './typedef';
type BaseFormulaTable = Pick<ITableSnapshot, 'id' | 'name' | 'formulaName'>;
interface IBaseFormulaSnapshot {
    tables: Record<string, BaseFormulaTable>;
}
export declare function normalizeBaseFormulaTableName(displayName: string): string;
export declare function createBaseFormulaTableNameMap(snapshot: IBaseFormulaSnapshot): ReadonlyMap<string, string>;
export declare function allocateBaseFormulaTableName(displayName: string, existingNames: Iterable<string>, preferredName?: string): string;
export declare function getBaseFormulaTableName(table: BaseFormulaTable, snapshot: IBaseFormulaSnapshot): string;
export declare function normalizeBaseFormulaTableReferences(formula: string, snapshot: IBaseFormulaSnapshot): string;
export declare function createBaseFormulaTableReferenceNormalizer(snapshot: IBaseFormulaSnapshot, formulaNames?: ReadonlyMap<string, string>): (formula: string) => string;
export declare function migrateBaseFormulaTableNames(snapshot: IBaseSnapshot): void;
export {};
