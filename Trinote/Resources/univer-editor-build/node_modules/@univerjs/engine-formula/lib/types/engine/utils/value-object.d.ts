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
import type { BaseReferenceObject, FunctionVariantType } from '../reference-object/base-reference-object';
import type { BaseValueObject } from '../value-object/base-value-object';
import { ArrayValueObject } from '../value-object/array-value-object';
import { ErrorValueObject } from '../value-object/base-value-object';
import { NumberValueObject } from '../value-object/primitive-object';
export declare function convertTonNumber(valueObject: BaseValueObject): NumberValueObject;
export declare function isSingleValueObject(valueObject: FunctionVariantType): boolean;
/**
 * Covert BaseValueObject to cell value
 * @param objectValue
 * @returns
 */
export declare function objectValueToCellValue(objectValue: Nullable<BaseValueObject>): ICellData | undefined;
/**
 * The size of the extended range is determined by the maximum width and height of the criteria range.
 * @param variants
 * @returns
 */
export declare function calculateMaxDimensions(variants: BaseValueObject[]): {
    maxRowLength: number;
    maxColumnLength: number;
};
/**
 * Parse the paired range and criteria in functions like COUNTIFS, SUMIFS, etc.
 * @param variants - The range and criteria pairs
 * @param targetRange - The target range for calculation (e.g., sumRange in SUMIFS)
 * @returns An object containing parsed information
 */
export declare function parsePairedRangeAndCriteria(variants: FunctionVariantType[], targetRange?: FunctionVariantType): {
    isError: boolean;
    errorObject: ErrorValueObject | null;
    rangeIsDifferentSize: boolean;
    criteriaMaxRowLength: number;
    criteriaMaxColumnLength: number;
    targetRange: ArrayValueObject | null;
    variants: BaseValueObject[];
};
export declare function baseValueObjectToArrayValueObject(valueObject: BaseValueObject): ArrayValueObject;
/**
 * Get the paired range and criteria result for COUNTIFS, SUMIFS, etc.
 */
export declare function getPairedRangeAndCriteriaResult(variants: BaseValueObject[], params: {
    formulaName: string;
    maxRowLength: number;
    maxColumnLength: number;
    isNumberSensitive?: boolean;
    targetRange?: ArrayValueObject;
}): BaseValueObject[][];
/**
 * Two ArrayValueObject of the same type can be compared
 */
export declare function filterSameValueObjectResult(array: ArrayValueObject, range: ArrayValueObject, criteria: BaseValueObject): ArrayValueObject;
/**
 * Check if the two valueObjects are of the same type
 * @param left
 * @param right
 * @returns
 */
export declare function isSameValueObjectType(left: BaseValueObject, right: BaseValueObject): boolean;
export declare enum ReferenceObjectType {
    CELL = 0,
    COLUMN = 1,
    ROW = 2
}
export declare function getReferenceObjectFromCache(trimToken: string, type: ReferenceObjectType): BaseReferenceObject;
export declare function getRangeReferenceObjectFromCache(variant1: BaseReferenceObject, variant2: BaseReferenceObject): FunctionVariantType;
