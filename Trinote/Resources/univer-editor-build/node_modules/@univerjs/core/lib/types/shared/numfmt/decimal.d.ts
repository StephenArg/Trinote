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
export declare const SPREADSHEET_SIGNIFICANT_DIGITS = 15;
export interface IDecimalValue {
    readonly negative: boolean;
    readonly digits: string;
    readonly exponent: number;
}
export interface IRoundedDecimalParts {
    readonly negative: boolean;
    readonly integer: string;
    readonly fraction: string;
    readonly zero: boolean;
}
export interface IScientificDecimalParts {
    readonly exponent: number;
    readonly rounded: IRoundedDecimalParts;
}
export declare function decimalFromNumber(value: number): IDecimalValue;
export declare function shiftDecimal(value: IDecimalValue, power: number): IDecimalValue;
export declare function roundDecimal(value: IDecimalValue, places?: number): IRoundedDecimalParts;
export declare function decimalPartsToNumber(value: IRoundedDecimalParts): number;
export declare function decimalPartsToPlainString(value: IRoundedDecimalParts): string;
export declare function roundScientificDecimal(value: IDecimalValue, integerDigits: number, hasIntegerPattern: boolean, fractionDigits: number): IScientificDecimalParts;
