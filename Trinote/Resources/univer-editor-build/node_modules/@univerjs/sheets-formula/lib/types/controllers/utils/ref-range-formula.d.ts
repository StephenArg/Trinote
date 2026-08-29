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
import type { ICellData, IMutationInfo, IObjectMatrixPrimitiveType, IRange, Nullable } from '@univerjs/core';
import type { IFormulaData, IFormulaDataItem, ISequenceNode } from '@univerjs/engine-formula';
export declare enum FormulaReferenceMoveType {
    MoveRange = 0,// range
    MoveRows = 1,// move rows
    MoveCols = 2,// move columns
    InsertRow = 3,// row
    InsertColumn = 4,// column
    RemoveRow = 5,// row
    RemoveColumn = 6,// column
    DeleteMoveLeft = 7,// range
    DeleteMoveUp = 8,// range
    InsertMoveDown = 9,// range
    InsertMoveRight = 10,// range
    SetName = 11,
    RemoveSheet = 12,
    SetDefinedName = 13,// update defined name
    RemoveDefinedName = 14,// remove defined name
    SetSuperTableName = 15,// update super table name
    RemoveSuperTableName = 16,// remove super table name
    RemoveSuperTableColumn = 17
}
export interface IFormulaReferenceMoveParam {
    type: FormulaReferenceMoveType;
    unitId: string;
    sheetId: string;
    targetUnitId?: string;
    targetSheetId?: string;
    targetSheetName?: string;
    range?: IRange;
    from?: IRange;
    to?: IRange;
    sheetName?: string;
    /**
     * defined name id
     */
    definedNameId?: string;
    /**
     * new defined name
     */
    definedName?: string;
    oldTableName?: string;
    tableName?: string;
    tableColumnNames?: string[];
    /**
     * The filtered rows contained in the range, used for remove rows operation, etc.
     */
    rangeFilteredRows?: number[];
}
export declare function getFormulaReferenceMoveUndoRedo(oldFormulaData: IFormulaData, newFormulaData: IFormulaData, formulaReferenceMoveParam: IFormulaReferenceMoveParam): {
    undos: IMutationInfo<object>[];
    redos: IMutationInfo<object>[];
};
export declare function getFormulaReferenceSheet(oldFormulaData: IFormulaData, newFormulaData: IFormulaData): {
    undos: IMutationInfo<object>[];
    redos: IMutationInfo<object>[];
};
export declare function getFormulaReferenceRange(oldFormulaData: IFormulaData, newFormulaData: IFormulaData, formulaReferenceMoveParam: IFormulaReferenceMoveParam): {
    undos: IMutationInfo<object>[];
    redos: IMutationInfo<object>[];
};
/**
 * For different Command operations, it may be necessary to perform traversal in reverse or in forward order, so first determine the type of Command and then perform traversal.
 * @param oldFormulaData
 * @param newFormulaData
 * @param formulaReferenceMoveParam
 * @returns
 */
export declare function refRangeFormula(oldFormulaData: IFormulaData, newFormulaData: IFormulaData, formulaReferenceMoveParam: IFormulaReferenceMoveParam): {
    redoFormulaData: Record<string, Record<string, IObjectMatrixPrimitiveType<Nullable<ICellData>>>>;
    undoFormulaData: Record<string, Record<string, IObjectMatrixPrimitiveType<Nullable<ICellData>>>>;
};
/**
 * Transfer the formulaDataItem to the cellData
 * ┌────────────────────────────────┬─────────────────┐
 * │        IFormulaDataItem        │     ICellData   │
 * ├──────────────────┬─────┬───┬───┼───────────┬─────┤
 * │ f                │ si  │ x │ y │ f         │ si  │
 * ├──────────────────┼─────┼───┼───┼───────────┼─────┤
 * │ =SUM(1)          │     │   │   │ =SUM(1)   │     │
 * │                  │ id1 │   │   │           │ id1 │
 * │ =SUM(1)          │ id1 │   │   │ =SUM(1)   │ id1 │
 * │ =SUM(1)          │ id1 │ 0 │ 0 │ =SUM(1)   │ id1 │
 * │ =SUM(1)          │ id1 │ 0 │ 1 │           │ id1 │
 * └──────────────────┴─────┴───┴───┴───────────┴─────┘
 */
export declare function formulaDataItemToCellData(formulaDataItem: Nullable<IFormulaDataItem>): Nullable<ICellData>;
/**
 * Convert formulaData to cellData
 * @param formulaData
 * @returns
 */
export declare function formulaDataToCellData(formulaData: IObjectMatrixPrimitiveType<IFormulaDataItem | null>, changedCellValue?: IObjectMatrixPrimitiveType<Nullable<ICellData>>): IObjectMatrixPrimitiveType<Nullable<ICellData>>;
export declare function isFormulaDataItem(cell: IFormulaDataItem): boolean;
export declare function checkIsSameUnitAndSheet(userUnitId: string, userSheetId: string, currentFormulaUnitId: string, currentFormulaSheetId: string, sequenceRangeUnitId: string, sequenceRangeSheetId: string): boolean;
export declare function updateRefOffset(sequenceNodes: Array<string | ISequenceNode>, refChangeIds: number[], refOffsetX?: number, refOffsetY?: number): (string | ISequenceNode)[];
