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
import type { ArrayValueObject } from '../value-object/array-value-object';
import type { BaseValueObject } from '../value-object/base-value-object';
import { compareToken } from '../../basics/token';
export declare function findCompareToken(str: string): [compareToken, BaseValueObject];
/**
 * When it contains both comparison characters and wildcard characters
 * 1. The value of apple* has the same effect as =apple*
 * 2. >=apple*: normal value, >apple: obtains the same effect as >=apple*
 * 3. <apple*: normal value, <=apple: obtains the same effect as <apple*
 */
export declare function valueObjectCompare(range: BaseValueObject, criteria: BaseValueObject, operator?: compareToken, isCaseSensitive?: boolean): BaseValueObject;
/**
 * Find the Boolean intersection of two ArrayValueObjects
 */
export declare function booleanObjectIntersection(valueObject1: ArrayValueObject, valueObject2: ArrayValueObject): ArrayValueObject;
