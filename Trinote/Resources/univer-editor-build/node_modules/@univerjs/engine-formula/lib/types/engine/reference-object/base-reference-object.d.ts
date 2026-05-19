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
import type { ICellData, IRange, Nullable } from '@univerjs/core';
import type { IArrayFormulaRangeType, IRuntimeUnitDataType, IUnitData, IUnitSheetNameMap, IUnitStylesData } from '../../basics/common';
import type { BaseValueObject } from '../value-object/base-value-object';
import { ObjectMatrix } from '@univerjs/core';
import { FormulaAstLRU } from '../../basics/cache-lru';
import { ObjectClassType } from '../../basics/object-class-type';
import { ArrayValueObject } from '../value-object/array-value-object';
export type NodeValueType = BaseValueObject | BaseReferenceObject | AsyncObject | AsyncArrayObject;
export type FunctionVariantType = BaseValueObject | BaseReferenceObject;
export declare const FORMULA_REF_TO_ARRAY_CACHE: FormulaAstLRU<ArrayValueObject>;
export declare class BaseReferenceObject extends ObjectClassType {
    private _token;
    private _forcedSheetId;
    private _forcedSheetName;
    private _defaultSheetId;
    private _rangeData;
    private _unitData;
    private _unitStylesData;
    private _filteredOutRows;
    private _defaultUnitId;
    private _forcedUnitId;
    private _runtimeData;
    private _arrayFormulaCellData;
    private _arrayFormulaRange;
    private _runtimeArrayFormulaCellData;
    private _runtimeArrayFormulaRange;
    private _runtimeFeatureCellData;
    private _refOffsetX;
    private _refOffsetY;
    private _currentRow?;
    private _currentColumn?;
    constructor(_token: string);
    dispose(): void;
    getToken(): string;
    setToken(token: string): void;
    isExceedRange(): boolean;
    setRefOffset(x?: number, y?: number): void;
    getRefOffset(): {
        x: number;
        y: number;
    };
    getRangePosition(): IRange;
    isReferenceObject(): boolean;
    iterator(callback: (valueObject: Nullable<BaseValueObject>, rowIndex: number, columnIndex: number) => Nullable<boolean>): Nullable<boolean>;
    getFirstCell(): BaseValueObject;
    getRangeData(): IRange;
    setRangeData(range: IRange): void;
    getUnitId(): string;
    getSheetId(): string;
    setForcedUnitIdDirect(unitId: string): void;
    getForcedUnitId(): string;
    setForcedSheetId(sheetNameMap: IUnitSheetNameMap): void;
    setForcedSheetIdDirect(sheetId: string): void;
    getForcedSheetId(): Nullable<string>;
    setForcedSheetName(sheetName: string): void;
    getForcedSheetName(): string;
    setDefaultSheetId(sheetId: string): void;
    getDefaultSheetId(): string;
    setDefaultUnitId(unitId: string): void;
    getDefaultUnitId(): string;
    getUnitData(): IUnitData;
    setUnitData(unitData: IUnitData): void;
    getUnitStylesData(): IUnitStylesData;
    setUnitStylesData(unitStylesData: IUnitStylesData): void;
    getFilteredOutRows(): number[];
    setFilteredOutRows(filteredOutRows: number[]): void;
    getRuntimeData(): IRuntimeUnitDataType;
    setRuntimeData(runtimeData: IRuntimeUnitDataType): void;
    getArrayFormulaCellData(): IRuntimeUnitDataType;
    setArrayFormulaCellData(unitData: IRuntimeUnitDataType): void;
    getArrayFormulaRange(): IArrayFormulaRangeType;
    setArrayFormulaRange(rangeData: IArrayFormulaRangeType): void;
    getRuntimeArrayFormulaCellData(): IRuntimeUnitDataType;
    setRuntimeArrayFormulaCellData(unitData: IRuntimeUnitDataType): void;
    getRuntimeArrayFormulaRange(): IArrayFormulaRangeType;
    setRuntimeArrayFormulaRange(rangeData: IArrayFormulaRangeType): void;
    getRuntimeFeatureCellData(): {
        [featureId: string]: IRuntimeUnitDataType;
    };
    setRuntimeFeatureCellData(unitData: {
        [featureId: string]: IRuntimeUnitDataType;
    }): void;
    getActiveSheetRowCount(): number;
    getActiveSheetColumnCount(): number;
    getRowCount(): number;
    getColumnCount(): number;
    getRowData(): import("@univerjs/core").IObjectArrayPrimitiveType<Partial<import("@univerjs/core").IRowData>>;
    getColumnData(): import("@univerjs/core").IObjectArrayPrimitiveType<Partial<import("@univerjs/core").IColumnData>>;
    isCell(): boolean;
    isColumn(): boolean;
    isRow(): boolean;
    isRange(): boolean;
    isTable(): boolean;
    isCurrentRowForRange(): boolean;
    isCurrentColumnForRange(): boolean;
    isMultiArea(): boolean;
    unionBy(referenceObject: BaseReferenceObject): NodeValueType;
    unionRange(rangeData1: IRange, rangeData2: IRange): IRange;
    getCellValueObject(cell: ICellData): BaseValueObject;
    private _getPatternByCell;
    getCellByRow(row: number): BaseValueObject;
    getCellByColumn(column: number): BaseValueObject;
    getCurrentActiveSheetData(): import("../../basics/common").ISheetItem;
    getCurrentStylesData(): import("@univerjs/core").Styles;
    getCurrentRuntimeSheetData(): ObjectMatrix<Nullable<ICellData>> | undefined;
    getCurrentActiveArrayFormulaCellData(): ObjectMatrix<Nullable<ICellData>> | undefined;
    getCurrentRuntimeActiveArrayFormulaCellData(): ObjectMatrix<Nullable<ICellData>> | undefined;
    getCurrentActiveArrayFormulaRange(): import("@univerjs/core").IObjectMatrixPrimitiveType<IRange> | undefined;
    getCurrentRuntimeActiveArrayFormulaRange(): import("@univerjs/core").IObjectMatrixPrimitiveType<IRange> | undefined;
    getCellData(row: number, column: number): Nullable<ICellData>;
    getRuntimeFeatureCellValue(row: number, column: number): ICellData | undefined;
    getCellByPosition(rowRaw?: number, columnRaw?: number): BaseValueObject;
    setCurrentRowAndColumn(row: number, column: number): void;
    getCurrentRow(): number | undefined;
    getCurrentColumn(): number | undefined;
    /**
     * Get the pattern of the cell
     * @param unitId
     * @param sheetId
     * @param row
     * @param column
     * @returns
     */
    getCellPattern(unitId: string, sheetId: string, row: number, column: number): string;
    toArrayValueObject(useCache?: boolean): ArrayValueObject;
    toUnitRange(): {
        range: IRange;
        sheetId: string;
        unitId: string;
    };
    private _checkIfWorksheetMiss;
    private _getBlankArrayValueObject;
}
export declare class AsyncObject extends ObjectClassType {
    private _promise;
    constructor(_promise: Promise<BaseValueObject>);
    isAsyncObject(): boolean;
    getValue(): Promise<BaseValueObject>;
}
export declare class AsyncArrayObject extends ObjectClassType {
    private _promiseList;
    constructor(_promiseList: Array<Array<BaseValueObject | AsyncObject>>);
    isAsyncArrayObject(): boolean;
    getValue(): Promise<ArrayValueObject>;
}
