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
import type { LocaleData, LocaleSettings, LocaleToken } from './types';
/**
 * @typedef {object} LocaleToken - An object of properties for a locale tag.
 * @property {string} lang - The basic tag such as `zh_CN` or `fi`
 * @property {string} language - The language section (`zh` for `zh_CN`)
 * @property {string} territory - The territory section (`CN` for `zh_CN`)
 */
/**
 * Parse a regular IETF BCP 47 locale tag and emit an object of its parts.
 * Irregular tags and subtags are not supported.
 *
 * @param {string} locale - A BCP 47 string tag of the locale.
 * @returns {LocaleToken} - An object describing the locale.
 */
export declare function parseLocale(locale: string): LocaleToken;
export declare function resolveLocale(locale: string | number): string | null;
/**
 * Used by the formatter to pull a locate from its registered locales. If
 * subtag isn't available but the base language is, the base language is used.
 * So if `en-CA` is not found, the formatter tries to find `en` else it
 * returns a `null`.
 *
 * @param {string} locale - A BCP 47 string tag of the locale, or an Excel locale code.
 * @returns {LocaleData | null} - An object of format date properties.
 */
export declare function getLocale(locale: string | number): LocaleData | null;
export declare function createLocale(settings: LocaleSettings): LocaleData;
/**
 * Register locale data for a language so for use when formatting.
 *
 * Any partial set of properties may be returned to have the defaults used where properties are missing.
 *
 * @see {LocaleData}
 * @param {object} settings - A collection of settings for a locale.
 * @param {string} [settings.group]
 *    Symbol used as a grouping separator (`1,000,000` uses `,`)
 * @param {string} [settings.decimal]
 *    Symbol used to separate integers from fractions (usually `.`)
 * @param {string} [settings.positive]
 *    Symbol used to indicate positive numbers (usually `+`)
 * @param {string} [settings.negative]
 *    Symbol used to indicate positive numbers (usually `-`)
 * @param {string} [settings.percent]
 *    Symbol used to indicate a percentage (usually `%`)
 * @param {string} [settings.exponent]
 *    Symbol used to indicate an exponent (usually `E`)
 * @param {string} [settings.nan]
 *    Symbol used to indicate NaN values (`NaN`)
 * @param {string} [settings.infinity]
 *    Symbol used to indicate infinite values (`∞`)
 * @param {Array<string>} [settings.ampm]
 *    How AM and PM should be presented.
 * @param {Array<string>} [settings.mmmm6]
 *    Long month names for the Islamic calendar (e.g. `Rajab`)
 * @param {Array<string>} [settings.mmm6]
 *    Short month names for the Islamic calendar (e.g. `Raj.`)
 * @param {Array<string>} [settings.mmmm]
 *    Long month names for the Gregorian calendar (e.g. `November`)
 * @param {Array<string>} [settings.mmm]
 *    Short month names for the Gregorian calendar (e.g. `Nov`)
 * @param {Array<string>} [settings.dddd]
 *    Long day names (e.g. `Wednesday`)
 * @param {Array<string>} [settings.ddd]
 *    Shortened day names (e.g. `Wed`)
 * @param {Array<string>} [settings.bool]
 *    How TRUE and FALSE should be presented.
 * @param {boolean} [settings.preferMDY]
 *    Is the prefered date format month first (12/31/2025) or day first (31/12/2025)
 * @param {string | LocaleToken} locale - A string BCP 47 tag or parsed locale token.
 * @returns {LocaleData} - A full collection of settings for a locale
 */
export declare function addLocale(settings: LocaleSettings, locale: string | LocaleToken): LocaleData;
export declare function listLocales(): string[];
export declare const defaultLocale: LocaleData;
