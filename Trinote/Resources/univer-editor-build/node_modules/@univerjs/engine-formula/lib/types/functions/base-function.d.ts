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
import type { IRange, LocaleType, Nullable } from '@univerjs/core';
import type { IFunctionNames } from '../basics/function';
import type { BaseAstNode } from '../engine/ast-node/base-ast-node';
import type { BaseReferenceObject, FunctionVariantType, NodeValueType } from '../engine/reference-object/base-reference-object';
import type { ArrayBinarySearchType } from '../engine/utils/compare';
import type { ArrayValueObject } from '../engine/value-object/array-value-object';
import type { BaseValueObject } from '../engine/value-object/base-value-object';
import type { FormulaFunctionResultValueType, FormulaFunctionValueType } from '../engine/value-object/primitive-object';
import type { FormulaDataModel } from '../models/formula-data.model';
import type { IDefinedNameMapItem } from '../services/defined-names.service';
import type { IFormulaUnitReferenceResolver } from '../services/unit-reference-resolver.service';
import { DateSystem } from '@univerjs/core';
import { ArrayOrderSearchType } from '../engine/utils/compare';
import { ErrorValueObject } from '../engine/value-object/base-value-object';
export declare class BaseFunction {
    private _name;
    private _unitId;
    private _subUnitId;
    private _row;
    private _column;
    private _currentFormulaRowCount;
    private _currentFormulaColumnCount;
    private _definedNames;
    private _locale;
    private _dateSystem;
    private _sheetOrder;
    private _sheetNameMap;
    protected _formulaDataModel: Nullable<FormulaDataModel>;
    protected _unitReferenceResolver: Nullable<IFormulaUnitReferenceResolver>;
    protected _rowCount: number;
    protected _columnCount: number;
    /**
     * Whether the function needs to expand the parameters
     */
    needsExpandParams: boolean;
    /**
     * Whether the function needs to pass in reference object
     */
    needsReferenceObject: boolean;
    /**
     * Whether the function needs handle locale
     */
    needsLocale: boolean;
    /**
     * Whether the function needs sheets info
     */
    needsSheetsInfo: boolean;
    /**
     * Whether the function needs function methods in FormulaDataModel
     */
    needsFormulaDataModel: boolean;
    /** Whether the function resolves external Unit qualifiers. */
    needsUnitReferenceResolver: boolean;
    /**
     * Whether the function needs the number of rows and columns in the sheet
     */
    needsSheetRowColumnCount: boolean;
    /**
     * Whether the function needs to filter out rows
     */
    needsFilteredOutRows: boolean;
    /**
     * Whether the function needs unevaluated AST children.
     */
    needsAstChildren: boolean;
    /**
     * Arguments that preserve a selected lazy IF branch as a reference array.
     */
    lazyIfReferenceArrayArgumentIndexes: readonly number[];
    /**
     * Legacy CSE-style array functions should write only the first result cell
     * when they are used as a top-level normal formula.
     */
    returnsLegacyArrayAsScalar: boolean;
    /**
     * Minimum number of parameters
     */
    minParams: number;
    /**
     * Maximum number of parameters
     */
    maxParams: number;
    constructor(_name: IFunctionNames);
    get name(): IFunctionNames;
    get unitId(): Nullable<string>;
    get subUnitId(): Nullable<string>;
    get row(): number;
    get column(): number;
    get currentFormulaRowCount(): number;
    get currentFormulaColumnCount(): number;
    dispose(): void;
    /**
     * In Excel, to inject a defined name into a function that has positioning capabilities,
     * such as using the INDIRECT function to reference a named range,
     * you can write it as follows:
     * =INDIRECT("DefinedName1")
     */
    getDefinedName(name: string): import("..").IDefinedNamesServiceParam | null | undefined;
    setDefinedNames(definedNames: IDefinedNameMapItem): void;
    getLocale(): LocaleType;
    setLocale(locale: LocaleType): void;
    getDateSystem(): DateSystem;
    setDateSystem(dateSystem: DateSystem): void;
    getSheetsInfo(): {
        sheetOrder: string[];
        sheetNameMap: {
            [sheetId: string]: string;
        };
    };
    setSheetsInfo({ sheetOrder, sheetNameMap, }: {
        sheetOrder: string[];
        sheetNameMap: {
            [sheetId: string]: string;
        };
    }): void;
    setFormulaDataModel(_formulaDataModel: FormulaDataModel): void;
    setUnitReferenceResolver(unitReferenceResolver: IFormulaUnitReferenceResolver): void;
    setSheetRowColumnCount(rowCount: number, columnCount: number): void;
    isAsync(): boolean;
    isAddress(): boolean;
    isCustom(): boolean;
    isArgumentsIgnoreNumberPattern(): boolean;
    setRefInfo(unitId: string, subUnitId: string, row: number, column: number, rowCount?: number, columnCount?: number): void;
    calculateCustom(...arg: Array<FormulaFunctionValueType>): FormulaFunctionResultValueType | Promise<FormulaFunctionResultValueType>;
    calculate(...arg: BaseValueObject[]): NodeValueType;
    calculateAst(_children: BaseAstNode[], _getVariant: (node: BaseAstNode) => Nullable<FunctionVariantType>): NodeValueType;
    checkArrayType(variant: FunctionVariantType): boolean;
    /**
     * Starting with 1
     * For instance, The column number (starting with 1 for the left-most column of table_array) that contains the return value.
     * https://support.microsoft.com/en-us/office/vlookup-function-0bbc8083-26fe-4963-8ab8-93a18ad188a1
     * @param indexNum
     */
    getIndexNumValue(indexNum: BaseValueObject, defaultValue?: number): number | ErrorValueObject;
    /**
     * A logical value that specifies 1/TRUE , 0/FALSE, default 1
     * For instance range_lookup, A logical value that specifies whether you want VLOOKUP to find an approximate or an exact match
     * Approximate match - 1/TRUE
     * Exact match - 0/FALSE
     * https://support.microsoft.com/en-us/office/vlookup-function-0bbc8083-26fe-4963-8ab8-93a18ad188a1
     * For instance A1, A logical value that specifies what type of reference is contained in the cell ref_text.
     * If a1 is TRUE or omitted, ref_text is interpreted as an A1-style reference.
     * If a1 is FALSE, ref_text is interpreted as an R1C1-style reference.
     * https://support.microsoft.com/zh-cn/office/indirect-%E5%87%BD%E6%95%B0-474b3a3a-8a26-4f44-b491-92b6306fa261
     * @param logicValueObject
     */
    getZeroOrOneByOneDefault(logicValueObject?: BaseValueObject): number | undefined;
    /**
     * A logical value that specifies 1/TRUE , 0/FALSE, -1, default 1.
     * The difference from getZeroOrOneByOneDefault is that we need to get -1
     * @param logicValueObject
     */
    getMatchTypeValue(logicValueObject?: BaseValueObject): number | undefined;
    binarySearch(value: BaseValueObject, searchArray: ArrayValueObject, resultArray: ArrayValueObject, searchType?: ArrayBinarySearchType, matchType?: ArrayOrderSearchType): BaseValueObject;
    private _getOneFirstByRaw;
    private _getOneLastByRaw;
    equalSearch(value: BaseValueObject, searchArray: ArrayValueObject, resultArray: ArrayValueObject, isFirst?: boolean): BaseValueObject;
    fuzzySearch(value: BaseValueObject, searchArray: ArrayValueObject, resultArray: ArrayValueObject, isFirst?: boolean): BaseValueObject;
    orderSearch(value: BaseValueObject, searchArray: ArrayValueObject, resultArray: ArrayValueObject, searchType?: ArrayOrderSearchType, isDesc?: boolean, keepFirstNearest?: boolean): BaseValueObject;
    binarySearchExpand(value: BaseValueObject, searchArray: ArrayValueObject, resultArray: ArrayValueObject, axis?: number, searchType?: ArrayBinarySearchType, matchType?: ArrayOrderSearchType): ErrorValueObject | ArrayValueObject | undefined;
    equalSearchExpand(value: BaseValueObject, searchArray: ArrayValueObject, resultArray: ArrayValueObject, isFirst?: boolean, axis?: number): ErrorValueObject | ArrayValueObject | undefined;
    fuzzySearchExpand(value: BaseValueObject, searchArray: ArrayValueObject, resultArray: ArrayValueObject, isFirst?: boolean, axis?: number): ErrorValueObject | ArrayValueObject | undefined;
    orderSearchExpand(value: BaseValueObject, searchArray: ArrayValueObject, resultArray: ArrayValueObject, searchType?: ArrayOrderSearchType, isDesc?: boolean, axis?: number, keepFirstNearest?: boolean): ErrorValueObject | ArrayValueObject | undefined;
    flattenArray(variants: BaseValueObject[], ignoreLogicalValuesAndText?: boolean): ArrayValueObject | BaseValueObject;
    private _includingLogicalValuesAndText;
    createReferenceObject(reference: BaseReferenceObject, range: IRange): ErrorValueObject | BaseReferenceObject;
    private _setReferenceDefault;
}
