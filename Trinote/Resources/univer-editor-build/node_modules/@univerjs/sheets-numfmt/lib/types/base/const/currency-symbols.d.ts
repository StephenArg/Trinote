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
import { LocaleType } from '@univerjs/core';
export declare const localeCurrencySymbolMap: Map<LocaleType, string>;
/**
 * Get the currency symbol icon based on the locale.
 */
export declare function getCurrencySymbolIconByLocale(locale: LocaleType): {
    icon: string;
    symbol: string;
    locale: LocaleType.FR_FR | LocaleType.ES_ES | LocaleType.CA_ES | LocaleType.SK_SK | LocaleType.DE_DE | LocaleType.IT_IT;
} | {
    icon: string;
    symbol: string;
    locale: LocaleType.RU_RU;
} | {
    icon: string;
    symbol: string;
    locale: LocaleType.ZH_CN | LocaleType.JA_JP;
} | {
    icon: string;
    symbol: string;
    locale: LocaleType.EN_US | LocaleType.ZH_TW | LocaleType.ZH_HK | LocaleType.VI_VN | LocaleType.FA_IR | LocaleType.KO_KR | LocaleType.PT_BR | LocaleType.ID_ID | LocaleType.PL_PL | LocaleType.AR_SA;
};
/**
 * Get the currency symbol by locale.
 */
export declare function getCurrencySymbolByLocale(locale: LocaleType): string;
/**
 * Get the currency format string based on the locale and number of digits.
 */
export declare function getCurrencyFormat(locale: LocaleType, numberDigits?: number): string;
