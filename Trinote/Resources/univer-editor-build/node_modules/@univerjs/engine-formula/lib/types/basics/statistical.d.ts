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
import type { BaseReferenceObject, FunctionVariantType } from '../engine/reference-object/base-reference-object';
import type { MultiAreaReferenceObject } from '../engine/reference-object/multi-area-reference-object';
import type { BaseValueObject } from '../engine/value-object/base-value-object';
import type { FormulaDataModel } from '../models/formula-data.model';
import { ErrorValueObject } from '../engine/value-object/base-value-object';
export declare function betaCDF(x: number, alpha: number, beta: number): number;
export declare function betaPDF(x: number, alpha: number, beta: number): number;
export declare function betaINV(probability: number, alpha: number, beta: number): number;
export declare function binomialCDF(x: number, trials: number, probability: number): number;
export declare function binomialPDF(x: number, trials: number, probability: number): number;
export declare function chisquareCDF(x: number, degFreedom: number): number;
export declare function chisquarePDF(x: number, degFreedom: number): number;
export declare function chisquareINV(probability: number, degFreedom: number): number;
export declare function centralFCDF(x: number, degFreedom1: number, degFreedom2: number): number;
export declare function centralFPDF(x: number, degFreedom1: number, degFreedom2: number): number;
export declare function centralFINV(probability: number, degFreedom1: number, degFreedom2: number): number;
export declare function exponentialCDF(x: number, lambda: number): number;
export declare function exponentialPDF(x: number, lambda: number): number;
export declare function forecastLinear(x: number, knownYs: number[], knownXs: number[]): number;
export declare function gamma(x: number): number;
export declare function gammaCDF(x: number, alpha: number, beta: number): number;
export declare function gammaPDF(x: number, alpha: number, beta: number): number;
export declare function gammaINV(probability: number, alpha: number, beta: number): number;
export declare function gammaln(x: number): number;
export declare function hypergeometricCDF(x: number, n: number, M: number, N: number): number;
export declare function hypergeometricPDF(x: number, n: number, M: number, N: number): number;
export declare function lognormalCDF(x: number, mean: number, standardDev: number): number;
export declare function lognormalPDF(x: number, mean: number, standardDev: number): number;
export declare function lognormalINV(probability: number, mean: number, standardDev: number): number;
export declare function negbinomialCDF(numberF: number, numberS: number, probabilityS: number): number;
export declare function negbinomialPDF(numberF: number, numberS: number, probabilityS: number): number;
export declare function normalCDF(x: number, mean: number, standardDev: number): number;
export declare function normalPDF(x: number, mean: number, standardDev: number): number;
export declare function normalINV(probability: number, mean: number, standardDev: number): number;
export declare function poissonCDF(x: number, mean: number): number;
export declare function poissonPDF(x: number, mean: number): number;
export declare function studentTCDF(x: number, degFreedom: number): number;
export declare function studentTPDF(x: number, degFreedom: number): number;
export declare function studentTINV(probability: number, degFreedom: number): number;
export declare function getTwoArrayNumberValues(array1: BaseValueObject, array2: BaseValueObject, count: number, array1ColumnCount: number, array2ColumnCount: number): {
    isError: boolean;
    errorObject: ErrorValueObject;
    array1Values: number[];
    array2Values: number[];
    noCalculate: boolean;
} | {
    isError: boolean;
    errorObject: null;
    array1Values: number[];
    array2Values: number[];
    noCalculate: boolean;
};
export declare function checkKnownsArrayDimensions(knownYs: BaseValueObject, knownXs?: BaseValueObject, newXs?: BaseValueObject): {
    isError: boolean;
    errorObject: ErrorValueObject;
} | {
    isError: boolean;
    errorObject: null;
};
export declare function getKnownsArrayValues(array: BaseValueObject): number[][] | ErrorValueObject;
export declare function getSerialNumbersByRowsColumns(rowCount: number, columnCount: number): number[][];
export declare function getSlopeAndIntercept(knownXsValues: number[], knownYsValues: number[], constb: number, isExponentialTransform: boolean): {
    slope: any;
    intercept: number;
    Y: number[];
};
export declare function getKnownsArrayCoefficients(knownYsValues: number[][], knownXsValues: number[][], newXsValues: number[][], constb: number, isExponentialTransform: boolean): ErrorValueObject | {
    coefficients: number[][];
    Y: number[][];
    X: number[][];
    newX: number[][];
    XTXInverse: number[][];
};
/**
 * Parse aggregate data references into multi-area refs and normal refs, currently only used in functions like SUBTOTAL and AGGREGATE.
 * If there is any invalid reference, return isError as true.
 */
export declare function parseAggregateDataRefs(refs: FunctionVariantType[]): {
    isError: boolean;
    multiAreaRefs: MultiAreaReferenceObject[];
    normalRefs: BaseReferenceObject[];
};
export declare enum AggregateFunctionType {
    AVERAGE = "AVERAGE",
    COUNT = "COUNT",
    COUNTA = "COUNTA",
    MAX = "MAX",
    MIN = "MIN",
    PRODUCT = "PRODUCT",
    STDEV = "STDEV",
    STDEV_S = "STDEV.S",
    STDEVP = "STDEVP",
    STDEV_P = "STDEV.P",
    SUM = "SUM",
    VAR = "VAR",
    VAR_S = "VAR.S",
    VARP = "VARP",
    VAR_P = "VAR.P",
    MEDIAN = "MEDIAN",
    MODE_SNGL = "MODE.SNGL"
}
export type modeSnglValueCountMapType = Record<number, {
    count: number;
    order: number;
}>;
export declare function getModeSnglResult(valueCountMap: modeSnglValueCountMapType, valueMaxCount: number): BaseValueObject;
export interface IAggregateIgnoreOptions {
    ignoreRowHidden: boolean;
    ignoreErrorValues: boolean;
    ignoreNested: boolean;
}
export declare function getAggregateResult(options: {
    type: AggregateFunctionType;
    formulaDataModel: FormulaDataModel;
} & IAggregateIgnoreOptions, refs: BaseReferenceObject[]): BaseValueObject;
export declare function getArrayValuesByAggregateIgnoreOptions(array: FunctionVariantType, options?: IAggregateIgnoreOptions, formulaDataModel?: FormulaDataModel): number[] | ErrorValueObject;
export declare function getMedianResult(array: number[]): BaseValueObject;
export declare function getLargeResult(array: number[], k: number): BaseValueObject;
export declare function getSmallResult(array: number[], k: number): BaseValueObject;
export declare function getPercentileIncResult(array: number[], k: number): BaseValueObject;
export declare function getPercentileExcResult(array: number[], k: number): BaseValueObject;
export declare function getQuartileIncResult(array: number[], quart: number): BaseValueObject;
export declare function getQuartileExcResult(array: number[], quart: number): BaseValueObject;
