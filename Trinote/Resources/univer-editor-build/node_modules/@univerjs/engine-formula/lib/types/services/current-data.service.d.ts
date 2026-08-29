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
import type { IUnitRange, LocaleType, Nullable } from '@univerjs/core';
import type { IArrayFormulaRangeType, IDirtyUnitDefinedNameMap, IDirtyUnitFeatureMap, IDirtyUnitOtherFormulaMap, IDirtyUnitSheetNameMap, IDirtyUnitSuperTableMap, IFormulaData, IFormulaDatasetConfig, IRuntimeUnitDataType, IUnitData, IUnitExcludedCell, IUnitRowData, IUnitSheetIdToNameMap, IUnitSheetNameMap, IUnitStylesData } from '../basics/common';
import { Disposable, IUniverInstanceService, LocaleService } from '@univerjs/core';
import { FormulaDataModel } from '../models/formula-data.model';
import { ISheetRowFilteredService } from './sheet-row-filtered.service';
export interface IFormulaDirtyData {
    forceCalculation: boolean;
    dirtyRanges: IUnitRange[];
    dirtyNameMap: IDirtyUnitSheetNameMap;
    dirtyDefinedNameMap: IDirtyUnitDefinedNameMap;
    dirtySuperTableMap?: IDirtyUnitSuperTableMap;
    dirtyUnitFeatureMap: IDirtyUnitFeatureMap;
    dirtyUnitOtherFormulaMap: IDirtyUnitOtherFormulaMap;
    clearDependencyTreeCache: IDirtyUnitSheetNameMap;
    maxIteration?: number;
    isCalculateTreeModel?: boolean;
    rowData?: IUnitRowData;
}
export interface IFormulaCurrentConfigService {
    load(config: IFormulaDatasetConfig): void;
    getUnitData(): IUnitData;
    /**
     * Get the unit styles data.
     */
    getUnitStylesData(): IUnitStylesData;
    getFormulaData(): IFormulaData;
    getSheetNameMap(): IUnitSheetNameMap;
    isForceCalculate(): boolean;
    getDirtyRanges(): IUnitRange[];
    getDirtyNameMap(): IDirtyUnitSheetNameMap;
    getDirtyDefinedNameMap(): IDirtyUnitDefinedNameMap;
    getDirtySuperTableMap(): IDirtyUnitSuperTableMap;
    getDirtyUnitFeatureMap(): IDirtyUnitFeatureMap;
    registerUnitData(unitData: IUnitData): void;
    registerFormulaData(formulaData: IFormulaData): void;
    registerSheetNameMap(sheetNameMap: IUnitSheetNameMap): void;
    getExcludedRange(): Nullable<IUnitExcludedCell>;
    loadDirtyRangesAndExcludedCell(dirtyRanges: IUnitRange[], excludedCell?: IUnitExcludedCell): void;
    getArrayFormulaCellData(): IRuntimeUnitDataType;
    getArrayFormulaRange(): IArrayFormulaRangeType;
    getSheetName(unitId: string, sheetId: string): string;
    getDirtyUnitOtherFormulaMap(): IDirtyUnitOtherFormulaMap;
    getExecuteUnitId(): Nullable<string>;
    getExecuteSubUnitId(): Nullable<string>;
    setExecuteUnitId(unitId: string): void;
    setExecuteSubUnitId(subUnitId: string): void;
    getDirtyData(): IFormulaDirtyData;
    getClearDependencyTreeCache(): IDirtyUnitSheetNameMap;
    getLocale(): LocaleType;
    getSheetsInfo(): {
        sheetOrder: string[];
        sheetNameMap: {
            [sheetId: string]: string;
        };
    };
    getSheetRowColumnCount(unitId: string, sheetId: string): {
        rowCount: number;
        columnCount: number;
    };
    getFilteredOutRows(unitId: string, sheetId: string, startRow: number, endRow: number): number[];
    setSheetNameMap(sheetIdToNameMap: IUnitSheetIdToNameMap): void;
    loadDataLite(rowData?: IUnitRowData): void;
}
export declare class FormulaCurrentConfigService extends Disposable implements IFormulaCurrentConfigService {
    private readonly _univerInstanceService;
    private readonly _localeService;
    private readonly _formulaDataModel;
    private readonly _sheetRowFilteredService;
    private _unitData;
    private _unitStylesData;
    private _arrayFormulaCellData;
    private _arrayFormulaRange;
    private _formulaData;
    private _sheetNameMap;
    private _forceCalculate;
    private _clearDependencyTreeCache;
    private _dirtyRanges;
    private _dirtyNameMap;
    private _dirtyDefinedNameMap;
    private _dirtySuperTableMap;
    private _dirtyUnitFeatureMap;
    private _dirtyUnitOtherFormulaMap;
    private _excludedCell;
    private _sheetIdToNameMap;
    private _executeUnitId;
    private _executeSubUnitId;
    constructor(_univerInstanceService: IUniverInstanceService, _localeService: LocaleService, _formulaDataModel: FormulaDataModel, _sheetRowFilteredService: ISheetRowFilteredService);
    dispose(): void;
    getExecuteUnitId(): Nullable<string>;
    getExecuteSubUnitId(): Nullable<string>;
    setExecuteUnitId(unitId: string): void;
    setExecuteSubUnitId(subUnitId: string): void;
    getExcludedRange(): Nullable<IUnitExcludedCell>;
    getUnitData(): IUnitData;
    getUnitStylesData(): IUnitStylesData;
    getFormulaData(): IFormulaData;
    getArrayFormulaCellData(): IRuntimeUnitDataType;
    getArrayFormulaRange(): IArrayFormulaRangeType;
    getSheetNameMap(): IUnitSheetNameMap;
    isForceCalculate(): boolean;
    getDirtyRanges(): IUnitRange[];
    getDirtyNameMap(): IDirtyUnitSheetNameMap;
    getDirtyDefinedNameMap(): IDirtyUnitDefinedNameMap;
    getDirtySuperTableMap(): IDirtyUnitSuperTableMap;
    getDirtyUnitFeatureMap(): IDirtyUnitFeatureMap;
    getDirtyUnitOtherFormulaMap(): IDirtyUnitOtherFormulaMap;
    getSheetName(unitId: string, sheetId: string): string;
    setSheetNameMap(sheetIdToNameMap: IUnitSheetIdToNameMap): void;
    getClearDependencyTreeCache(): IDirtyUnitSheetNameMap;
    getLocale(): LocaleType;
    getSheetsInfo(): {
        sheetOrder: string[];
        sheetNameMap: {
            [sheetId: string]: string;
        };
    };
    getSheetRowColumnCount(unitId: string, sheetId: string): {
        rowCount: number;
        columnCount: number;
    };
    getFilteredOutRows(unitId: string, sheetId: string, startRow: number, endRow: number): number[];
    load(config: IFormulaDatasetConfig): void;
    loadDataLite(rowData?: IUnitRowData): void;
    getDirtyData(): IFormulaDirtyData;
    loadDirtyRangesAndExcludedCell(dirtyRanges: IUnitRange[], excludedCell?: IUnitExcludedCell): void;
    registerUnitData(unitData: IUnitData): void;
    registerFormulaData(formulaData: IFormulaData): void;
    registerSheetNameMap(sheetNameMap: IUnitSheetNameMap): void;
    private _mergeNameMap;
    private _loadSheetData;
    /**
     * There is no filter information in the worker, it must be passed in from the main thread after it is ready
     * @param rowData
     */
    private _applyUnitRowData;
}
export declare const IFormulaCurrentConfigService: import("@wendellhu/redi").IdentifierDecorator<IFormulaCurrentConfigService>;
