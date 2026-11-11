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
import type { IFieldSnapshot, ITableSnapshot } from './typedef';
export declare const BASE_RECORD_ID_FIELD_ID = "__record_id";
export declare const BASE_RECORD_ID_FIELD_NAME = "record-id";
export declare function createBaseRecordIdField(): IFieldSnapshot;
export declare function isValidBaseRecordId(recordId: string): boolean;
export declare function isBaseRecordIdFieldName(name: string): boolean;
export declare function assertBaseTableRecordIdentity(table: ITableSnapshot): void;
