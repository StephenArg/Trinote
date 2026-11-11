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
import type { ParseData } from './types';
import { DateSystem } from '../../types/enum/date-system';
export interface ParseOptions {
    locale?: string;
    dateSystem?: DateSystem;
}
/** Parse a numeric string and return its value and inferred format. */
export declare function parseNumber(value: string, options?: ParseOptions): ParseData<number> | null;
export declare function isValidDate(year: number, month: number, day: number): boolean;
/** Parse a date or datetime string and return its serial value and format. */
export declare function parseDate(value: string, options?: ParseOptions): ParseData<number> | null;
/** Parse a time string and return its day fraction and inferred format. */
export declare function parseTime(value: string, options?: ParseOptions): ParseData<number> | null;
/** Parse a localized or English boolean string. */
export declare function parseBool(value: string, options?: ParseOptions): ParseData<boolean> | null;
/** Parse a spreadsheet input as a number, date, time, or boolean. */
export declare function parseValue(value: string, options?: ParseOptions): ParseData | null;
