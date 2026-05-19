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
import type { BaseValueObject } from '../value-object/base-value-object';
import { ArrayValueObject } from '../value-object/array-value-object';
export declare function expandArrayValueObject(rowCount: number, columnCount: number, valueObject: BaseValueObject, defaultValue?: BaseValueObject): ArrayValueObject;
export declare function createNewArray(result: BaseValueObject[][], rowCount: number, columnCount: number, unitId?: string, sheetId?: string): ArrayValueObject;
