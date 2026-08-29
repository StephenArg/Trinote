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
import type { IStyleData } from '../types/interfaces';
import type { Nullable } from './types';
/**
 * Universal tool library
 */
export declare class Tools {
    static deleteNull(obj: any): any;
    static getSystemType(): string;
    static getBrowserType(): string;
    /** @deprecated This method is deprecated, please use `import { merge } from '@univerjs/core` instead */
    static deepMerge(target: any, ...sources: any[]): any;
    static diffValue(one: any, two: any): boolean;
    static deepClone<T = unknown>(value: T): T;
    static getValueType(value: any): string;
    static isDefine<T>(value?: T | void): value is T;
    static isBlank(value: any): boolean;
    static isPlainObject(value: any): value is object;
    static isDate(value?: Date): value is Date;
    static isRegExp(value?: any): value is RegExp;
    static isArray<T>(value?: any): value is T[];
    static isString(value?: any): value is string;
    static isNumber(value?: any): value is number;
    static isStringNumber(value?: any): boolean;
    static isObject<T>(value?: any): value is T;
    static isEmptyObject(value?: any): boolean;
    static isTablet(): boolean;
    static isIPhone(): boolean;
    static isLegalUrl(url: string): boolean;
    static normalizeUrl(url: string): string;
    static topLevelDomainCombiningString(): string;
    /**
     * remove all null from object
     * @param obj
     * @returns
     */
    static removeNull(value: Record<string, any>): object;
    static numToWord(x: number): string;
    /**
     * Column subscript letter to number
     *
     * @param a - Column subscript letter,e.g.,"A1"
     * @returns Column subscript number,e.g.,0
     *
     */
    static ABCatNum(a: string): number;
    /**
     * Column subscript number to letter
     *
     * @param n Column subscript number,e.g.,0
     * @returns Column subscript letter,e.g.,"A1"
     */
    static chatAtABC(n: number): string;
    /**
     * extend two objects
     * @param originJson
     * @param extendJson
     * @returns
     */
    static commonExtend<T>(originJson: Record<string, any>, extendJson: Record<string, any>): T;
    static hasIntersectionBetweenTwoRanges(range1Start: number, range1End: number, range2Start: number, range2End: number): boolean;
    static isStartValidPosition(name: string): boolean;
    static isValidParameter(name: string): boolean;
    static clamp(value: number, min: number, max: number): number;
    static now(): number;
}
export declare function generateRandomId(n?: number, alphabet?: string): string;
/**
 * compose styles by priority, the latter will overwrite the former
 * @param { Nullable<IStyleData>[]} styles the styles to be composed
 * @returns  { Nullable<IStyleData>[]} Returns the composed style
 */
export declare function composeStyles(...styles: Nullable<IStyleData>[]): IStyleData;
export declare const isNodeEnv: () => boolean;
/**
 * Converts a wildcard pattern with ? and * to a regular expression.
 * @param {string} wildChar - The wildcard string containing ? and *
 * @returns {RegExp} The generated regular expression
 */
export declare function createREGEXFromWildChar(wildChar: string): RegExp;
/**
 * Escapes characters that have special meaning in a regular expression so the
 * returned string can be safely embedded in a RegExp pattern as literal text.
 */
export declare function escapeRegExp(str: string): string;
