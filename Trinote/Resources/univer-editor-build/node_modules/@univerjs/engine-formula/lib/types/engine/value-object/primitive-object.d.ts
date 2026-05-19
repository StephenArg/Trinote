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
import { FormulaAstLRU } from '../../basics/cache-lru';
import { compareToken } from '../../basics/token';
import { BaseValueObject, ErrorValueObject } from './base-value-object';
export type PrimitiveValueType = string | boolean | number | null;
export type FormulaFunctionValueType = PrimitiveValueType | PrimitiveValueType[][] | BaseValueObject;
export type FormulaFunctionResultValueType = PrimitiveValueType | PrimitiveValueType[][];
export declare class NullValueObject extends BaseValueObject {
    private static _instance;
    static create(): NullValueObject;
    isNull(): boolean;
    plus(valueObject: BaseValueObject): BaseValueObject;
    minus(valueObject: BaseValueObject): BaseValueObject;
    multiply(valueObject: BaseValueObject): BaseValueObject;
    divided(valueObject: BaseValueObject): BaseValueObject;
    mod(valueObject: BaseValueObject): BaseValueObject;
    compare(valueObject: BaseValueObject, operator: compareToken): BaseValueObject;
    concatenateFront(valueObject: BaseValueObject): BaseValueObject;
    concatenateBack(valueObject: BaseValueObject): BaseValueObject;
    plusBy(value: string | number | boolean): BaseValueObject;
    minusBy(value: string | number | boolean): BaseValueObject;
    multiplyBy(value: string | number | boolean): BaseValueObject;
    dividedBy(value: string | number | boolean): BaseValueObject;
    compareBy(value: string | number | boolean, operator: compareToken): BaseValueObject;
    pow(valueObject: BaseValueObject): BaseValueObject;
    sqrt(): BaseValueObject;
    cbrt(): BaseValueObject;
    cos(): BaseValueObject;
    cosh(): BaseValueObject;
    acos(): BaseValueObject;
    acosh(): BaseValueObject;
    sin(): BaseValueObject;
    sinh(): BaseValueObject;
    asin(): BaseValueObject;
    asinh(): BaseValueObject;
    tan(): BaseValueObject;
    tanh(): BaseValueObject;
    atan(): BaseValueObject;
    atan2(valueObject: BaseValueObject): BaseValueObject;
    atanh(): BaseValueObject;
    log(): BaseValueObject;
    log10(): BaseValueObject;
    exp(): BaseValueObject;
    abs(): BaseValueObject;
    round(valueObject: BaseValueObject): BaseValueObject;
    floor(valueObject: BaseValueObject): BaseValueObject;
    ceil(valueObject: BaseValueObject): BaseValueObject;
    convertToNumberObjectValue(): NumberValueObject;
    convertToBooleanObjectValue(): BooleanValueObject;
}
export declare class BooleanValueObject extends BaseValueObject {
    private _value;
    private static _instanceTrue;
    private static _instanceFalse;
    static create(value: boolean): BooleanValueObject;
    constructor(rawValue: boolean);
    getValue(): boolean;
    isBoolean(): boolean;
    getNegative(): BaseValueObject;
    getReciprocal(): BaseValueObject;
    plus(valueObject: BaseValueObject): BaseValueObject;
    minus(valueObject: BaseValueObject): BaseValueObject;
    multiply(valueObject: BaseValueObject): BaseValueObject;
    divided(valueObject: BaseValueObject): BaseValueObject;
    mod(valueObject: BaseValueObject): BaseValueObject;
    compare(valueObject: BaseValueObject, operator: compareToken): BaseValueObject;
    compareBy(value: string | number | boolean, operator: compareToken): BaseValueObject;
    private _compareString;
    concatenateFront(valueObject: BaseValueObject): BaseValueObject;
    concatenateBack(valueObject: BaseValueObject): BaseValueObject;
    private _convertToNumber;
    pow(valueObject: BaseValueObject): BaseValueObject;
    sqrt(): BaseValueObject;
    cbrt(): BaseValueObject;
    cos(): BaseValueObject;
    cosh(): BaseValueObject;
    acos(): BaseValueObject;
    acosh(): BaseValueObject;
    sin(): BaseValueObject;
    sinh(): BaseValueObject;
    asin(): BaseValueObject;
    asinh(): BaseValueObject;
    tan(): BaseValueObject;
    tanh(): BaseValueObject;
    atan(): BaseValueObject;
    atan2(valueObject: BaseValueObject): BaseValueObject;
    atanh(): BaseValueObject;
    log(): BaseValueObject;
    log10(): BaseValueObject;
    exp(): BaseValueObject;
    abs(): BaseValueObject;
    round(valueObject: BaseValueObject): BaseValueObject;
    floor(valueObject: BaseValueObject): BaseValueObject;
    ceil(valueObject: BaseValueObject): BaseValueObject;
    convertToNumberObjectValue(): ErrorValueObject | NumberValueObject;
    convertToBooleanObjectValue(): this;
}
export declare class NumberValueObject extends BaseValueObject {
    private _value;
    static create(value: number, pattern?: string): NumberValueObject;
    constructor(rawValue: number);
    getValue(): number;
    setValue(value: number): void;
    isNumber(): boolean;
    getNegative(): BaseValueObject;
    getReciprocal(): BaseValueObject;
    plus(valueObject: BaseValueObject): BaseValueObject;
    equalZero(): boolean;
    minus(valueObject: BaseValueObject): BaseValueObject;
    multiply(valueObject: BaseValueObject): BaseValueObject;
    divided(valueObject: BaseValueObject): BaseValueObject;
    mod(valueObject: BaseValueObject): BaseValueObject;
    concatenateFront(valueObject: BaseValueObject): BaseValueObject;
    concatenateBack(valueObject: BaseValueObject): BaseValueObject;
    isDateFormat(): boolean;
    compare(valueObject: BaseValueObject, operator: compareToken): BaseValueObject;
    plusBy(value: string | number | boolean): BaseValueObject;
    minusBy(value: string | number | boolean): BaseValueObject;
    multiplyBy(value: string | number | boolean): BaseValueObject;
    dividedBy(value: string | number | boolean): BaseValueObject;
    compareBy(valueRaw: string | number | boolean, operator: compareToken, isDateCompare?: boolean): BaseValueObject;
    private _compareString;
    private _compareNumber;
    private _compareFiniteNumber;
    private _compareBoolean;
    pow(valueObject: BaseValueObject): BaseValueObject;
    sqrt(): BaseValueObject;
    cbrt(): BaseValueObject;
    cos(): BaseValueObject;
    cosh(): BaseValueObject;
    acos(): BaseValueObject;
    acosh(): BaseValueObject;
    sin(): BaseValueObject;
    sinh(): BaseValueObject;
    asin(): BaseValueObject;
    asinh(): BaseValueObject;
    tan(): BaseValueObject;
    tanh(): BaseValueObject;
    atan(): BaseValueObject;
    atan2(valueObject: BaseValueObject): BaseValueObject;
    atanh(): BaseValueObject;
    log(): BaseValueObject;
    log10(): BaseValueObject;
    exp(): BaseValueObject;
    abs(): BaseValueObject;
    round(valueObject: BaseValueObject): BaseValueObject;
    floor(valueObject: BaseValueObject): BaseValueObject;
    ceil(valueObject: BaseValueObject): BaseValueObject;
    convertToNumberObjectValue(): this;
    convertToBooleanObjectValue(): BooleanValueObject;
    private _compareInfinity;
}
export interface IImageFormulaInfo {
    source: string;
    altText: string;
    sizing: number;
    height: number;
    width: number;
    isErrorImage?: boolean;
    imageNaturalHeight?: number;
    imageNaturalWidth?: number;
}
export interface IStringValueObjectOptions {
    /**
     * Whether it is a hyperlink value from HYPERLINK function
     */
    isHyperlink?: boolean;
    hyperlinkUrl?: string;
    /**
     * Whether it is an image value from IMAGE function
     */
    isImage?: boolean;
    imageInfo?: IImageFormulaInfo;
}
export declare const StringValueObjectCache: FormulaAstLRU<StringValueObject>;
export declare class StringValueObject extends BaseValueObject {
    private _value;
    private _isHyperlink;
    private _hyperlinkUrl;
    private _isImage;
    private _imageInfo;
    static create(value: string, options?: IStringValueObjectOptions): StringValueObject;
    static checkCacheByOptions(cached: StringValueObject, options: IStringValueObjectOptions): boolean;
    constructor(rawValue: string);
    getValue(): string;
    isString(): boolean;
    isHyperlink(): boolean;
    getHyperlinkUrl(): string;
    isImage(): boolean;
    getImageInfo(): IStringValueObjectOptions['imageInfo'];
    concatenateFront(valueObject: BaseValueObject): BaseValueObject;
    concatenateBack(valueObject: BaseValueObject): BaseValueObject;
    plus(valueObject: BaseValueObject): BaseValueObject;
    minus(valueObject: BaseValueObject): BaseValueObject;
    multiply(valueObject: BaseValueObject): BaseValueObject;
    divided(valueObject: BaseValueObject): BaseValueObject;
    compare(valueObject: BaseValueObject, operator: compareToken, isCaseSensitive?: boolean): BaseValueObject;
    compareBy(value: string | number | boolean, operator: compareToken, isCaseSensitive?: boolean): BaseValueObject;
    private _compareString;
    private _compareNumber;
    private _compareBoolean;
    convertToNumberObjectValue(): ErrorValueObject | NumberValueObject;
    convertToBooleanObjectValue(): BooleanValueObject;
    private _checkWildcard;
}
export declare function createBooleanValueObjectByRawValue(rawValue: string | number | boolean): BooleanValueObject;
export declare function createStringValueObjectByRawValue(rawValue: string | number | boolean): StringValueObject;
export declare function createNumberValueObjectByRawValue(rawValue: string | number | boolean, pattern?: string): ErrorValueObject | NumberValueObject;
