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
import type { IAccessor, ICellData, ICommand, IMutationInfo, Injector, IRange, Nullable, Worksheet } from '@univerjs/core';
import type { ISheetCommandSharedParams } from '../utils/interface';
import { Dimension, ObjectMatrix } from '@univerjs/core';
export interface IAddMergeCommandParams extends ISheetCommandSharedParams {
    value?: Dimension.ROWS | Dimension.COLUMNS;
    selections: IRange[];
    defaultMerge?: boolean;
}
export declare enum MergeType {
    MergeAll = "mergeAll",
    MergeVertical = "mergeVertical",
    MergeHorizontal = "mergeHorizontal"
}
export interface IMergeCellsUtilOptions {
    /**
     * Whether to use the default merge behavior when there are existing cell contents in the merge ranges.
     * If true, only the value in the upper left cell is retained.
     * If false, a confirm dialog will be shown to the user.
     * @default true
     */
    defaultMerge?: boolean;
    /**
     * Whether to force merge even if there are existing merged cells that overlap with the new merge ranges.
     * If true, the overlapping merged cells will be removed before performing the new merge.
     * @default false
     */
    isForceMerge?: boolean;
}
export declare function getClearContentMutationParamsForRanges(accessor: IAccessor, unitId: string, worksheet: Worksheet, ranges: IRange[]): {
    undos: IMutationInfo[];
    redos: IMutationInfo[];
};
export declare function getClearContentMutationParamForRange(worksheet: Worksheet, range: IRange): ObjectMatrix<Nullable<ICellData>>;
export declare const AddWorksheetMergeCommand: ICommand;
export declare const AddWorksheetMergeAllCommand: ICommand;
export declare const AddWorksheetMergeVerticalCommand: ICommand;
export declare const AddWorksheetMergeHorizontalCommand: ICommand;
export declare function addMergeCellsUtil(injector: Injector, unitId: string, subUnitId: string, ranges: IRange[], options?: IMergeCellsUtilOptions): void;
export declare function getMergeableSelectionsByType(type: MergeType, selections: Nullable<IRange[]>): Nullable<IRange[]>;
