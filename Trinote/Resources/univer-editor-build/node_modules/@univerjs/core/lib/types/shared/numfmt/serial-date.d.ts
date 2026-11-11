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
import type { DateTimeParts } from './types';
import { DateSystem } from '../../types/enum/date-system';
export declare const EXCEL_1904_OFFSET = 1462;
/**
 * Decoded Excel calendar and clock fields.
 * In the 1900 system, serial 0 returns 1900-01-00 and serial 60 returns the fictitious 1900-02-29.
 * Callers converting these fields to a native Date must choose how to normalize those two pseudo-dates.
 */
export interface IExcelDateTimeParts {
    year: number;
    month: number;
    day: number;
    hours: number;
    minutes: number;
    seconds: number;
    fractionalSecond: number;
}
interface IDateSystemOptions {
    dateSystem: DateSystem;
}
export declare function getDateSystemMaxSerial(dateSystem?: DateSystem): number;
export declare function excelSerialToDateTimeParts(serial: number, options: IDateSystemOptions): IExcelDateTimeParts | null;
/** Convert an Excel serial to a native UTC Date, keeping only its calendar date. Returns an invalid Date for invalid serials. */
export declare function excelSerialToDate(serial: number, dateSystem?: DateSystem): Date;
/** Convert an Excel serial to a native UTC Date, including its time fraction. Returns an invalid Date for invalid serials. */
export declare function excelSerialToDateTime(serial: number, dateSystem?: DateSystem): Date;
export declare function excelDateTimePartsToSerial(parts: IExcelDateTimeParts, options: IDateSystemOptions): number | null;
/** Convert a native UTC Date's calendar fields to an Excel date serial. */
export declare function excelDateSerial(date: Date, dateSystem?: DateSystem): number;
/** Convert a native UTC Date's calendar and clock fields to an Excel serial. */
export declare function excelDateTimeSerial(date: Date, dateSystem?: DateSystem): number;
/**
 * Convert a native JavaScript Date, or array to a spreadsheet serial date.
 *
 * Returns a serial date number if input was a Date object or an array of
 * numbers, or null.
 */
export declare function dateToSerial(date: unknown, options?: {
    ignoreTimezone?: boolean;
}): number | null;
/**
 * Convert a spreadsheet serial date to an array of date parts, accurate to a
 * second.
 */
export declare function dateFromSerial(serial: number, options?: {
    leap1900?: boolean;
}): DateTimeParts;
export {};
