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
import type { ICellData, Nullable } from '@univerjs/core';
export declare const DEFAULT_SCIENTIFIC_NOTATION_FORMAT = "0.00E+00";
export declare function isScientificNotationNumericCell(cell: Nullable<ICellData>): boolean;
export declare function getScientificNotationFormatFromCell(cell: Nullable<ICellData>): string;
export declare function isAllowedPatternForScientificNotationNumber(pattern?: string): boolean;
