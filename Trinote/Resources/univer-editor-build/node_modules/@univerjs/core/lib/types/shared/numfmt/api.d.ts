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
import type { FormatColor, FormatDateInfo, FormatInfo, FormatOptions } from './types';
export { dec2frac } from './dec-to-frac';
export { addLocale, getLocale, parseLocale } from './locale';
export { parseBool, parseDate, parseNumber, parseTime, parseValue } from './parse-value';
export type { ParseOptions } from './parse-value';
export { round } from './round';
export { dateFromSerial, dateToSerial } from './serial-date';
export { tokenize } from './tokenize';
export type { FormatDateInfo, FormatInfo, FormatToken, LocaleData, LocaleToken, ParseData, } from './types';
/**
 * Formats a value as a string and returns the result.
 */
export declare function format(pattern: string, value: unknown, options?: FormatOptions): string;
/**
 * Find the color appropriate to a value as dictated by a format pattern.
 */
export declare function formatColor(pattern: string, value: unknown, options?: FormatOptions): FormatColor;
/** Determine if a given format pattern is a date pattern. */
export declare function isDateFormat(pattern: string): boolean;
/** Determine if a given format pattern is a percentage pattern. */
export declare function isPercentFormat(pattern: string): boolean;
/** Determine if a given format pattern is a text only pattern. */
export declare function isTextFormat(pattern: string): boolean;
/** Determine if a given format pattern is valid. */
export declare function isValidFormat(pattern: string): boolean;
/** Returns metadata describing a parsed format pattern. */
export declare function getFormatInfo(pattern: string, options?: {
    currency?: string;
}): FormatInfo;
/** Gets information about date codes used in a format string. */
export declare function getFormatDateInfo(pattern: string): FormatDateInfo;
/** Completes omitted components in a calendar-date or clock pattern for editing; elapsed durations return null. */
export declare function getDateTimeEditPattern(pattern: string, value: number): string | null;
/** A dictionary of the types used to identify token variants. */
export declare const tokenTypes: Readonly<{
    AMPM: "ampm";
    BREAK: "break";
    CALENDAR: "calendar";
    CHAR: "char";
    COLOR: "color";
    COMMA: "comma";
    CONDITION: "condition";
    DATETIME: "datetime";
    DBNUM: "dbnum";
    DIGIT: "digit";
    DURATION: "duration";
    ERROR: "error";
    ESCAPED: "escaped";
    EXP: "exp";
    FILL: "fill";
    GENERAL: "general";
    GROUP: "group";
    HASH: "hash";
    LOCALE: "locale";
    MINUS: "minus";
    MODIFIER: "modifier";
    NATNUM: "natnum";
    PAREN: "paren";
    PERCENT: "percent";
    PLUS: "plus";
    POINT: "point";
    QMARK: "qmark";
    SCALE: "scale";
    SKIP: "skip";
    SLASH: "slash";
    SPACE: "space";
    STRING: "string";
    TEXT: "text";
    ZERO: "zero";
}>;
