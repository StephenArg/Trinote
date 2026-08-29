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
import type { DataValidationType, ICellData, Nullable } from '@univerjs/core';
import type { DataValidatorRegistryService } from '@univerjs/data-validation';
export declare function getFormulaResult(result: Nullable<Nullable<ICellData>[][]>): Nullable<import("@univerjs/core").CellValue>;
export declare function getFormulaCellData(result: Nullable<Nullable<ICellData>[][]>): Nullable<ICellData>;
export declare function isLegalFormulaResult(res: string): boolean;
/**
 * Judge if the data-validation's formula need to be offseted by ranges
 */
export declare function shouldOffsetFormulaByRange(type: DataValidationType | string, validatorRegistryService: DataValidatorRegistryService): boolean;
