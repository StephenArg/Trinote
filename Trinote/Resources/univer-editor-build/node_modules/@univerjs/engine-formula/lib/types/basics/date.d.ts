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
import { DateSystem, numfmt } from '@univerjs/core';
import { ErrorValueObject } from '../engine/value-object/base-value-object';
export declare const DEFAULT_DATE_FORMAT = "yyyy/mm/dd;@";
export declare const DEFAULT_NOW_FORMAT = "yyyy/mm/dd hh:mm";
export declare const DEFAULT_TIME_FORMAT = "h:mm A/P";
export declare function formatDateDefault(date: Date): string;
/**
 * Validate date string
 *
 * TODO @Dushusir: Internationalization and more format support, can be reused when editing and saving cells, like "2020年1月1日"
 */
export declare function isValidDateStr(dateStr: string): boolean;
export declare function parseFormattedDate(value: string, options?: {
    dateSystem?: DateSystem;
}): numfmt.ParseData<number> | null;
export declare function parseFormattedTime(value: string, options?: {
    dateSystem?: DateSystem;
}): numfmt.ParseData<number> | null;
export declare function isDate(format: string): boolean;
export declare function isValidWeekend(weekend: number | string): boolean;
export declare function getWeekendArray(weekend: number | string): number[];
export declare function countWorkingDays(startDateSerialNumber: number, endDateSerialNumber: number, weekend?: number | string, holidays?: number[], dateSystem?: DateSystem): number;
export declare function getDateSerialNumberByWorkingDays(startDateSerialNumber: number, workingDays: number, weekend?: number | string, holidays?: number[], dateSystem?: DateSystem): number | ErrorValueObject;
export declare function getDateSerialNumberByObject(serialNumberObject: BaseValueObject, dateSystem?: DateSystem): ErrorValueObject | number;
export declare function getWeekDayByDateSerialNumber(dateSerialNumber: number, dateSystem?: DateSystem): number;
interface ITwoDateDaysType {
    days: number;
    yearDays: number;
}
export declare function getTwoDateDaysByBasis(startDateSerialNumber: number, endDateSerialNumber: number, basis: number, dateSystem?: DateSystem): ITwoDateDaysType;
export declare function isLeapYear(year: number): boolean;
export declare function isLeapYear1900(year: number): boolean;
export declare function getDaysInMonth(year: number, month: number): number;
export declare function getDaysInYear(year: number): number;
export declare function getNormalYearDaysByBasis(dateSerialNumber: number, basis: number, dateSystem?: DateSystem): number;
export declare function lastDayOfMonth(year: number, month: number, day: number): boolean;
export declare function dateAddMonths(date: Date, months: number): Date;
export {};
