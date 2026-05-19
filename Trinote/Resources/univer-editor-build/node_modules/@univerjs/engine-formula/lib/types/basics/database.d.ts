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
import type { BaseValueObject } from '../engine/value-object/base-value-object';
import { ErrorValueObject } from '../engine/value-object/base-value-object';
type DatabaseValueType = string | number | null;
export declare function checkDatabase(database: BaseValueObject): {
    isError: boolean;
    errorObject: ErrorValueObject;
    databaseValues: DatabaseValueType[][];
} | {
    isError: boolean;
    errorObject: null;
    databaseValues: DatabaseValueType[][];
};
export declare function checkField(field: BaseValueObject, database: DatabaseValueType[][]): {
    isError: boolean;
    errorObject: ErrorValueObject;
    fieldIndex: number;
} | {
    isError: boolean;
    errorObject: null;
    fieldIndex: number;
};
export declare function checkCriteria(criteria: BaseValueObject): {
    isError: boolean;
    errorObject: ErrorValueObject;
    criteriaValues: DatabaseValueType[][];
} | {
    isError: boolean;
    errorObject: null;
    criteriaValues: DatabaseValueType[][];
};
export declare function isCriteriaMatch(criteria: DatabaseValueType[][], database: DatabaseValueType[][], databaseRowIndex: number): boolean;
export {};
