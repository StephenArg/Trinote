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
import type { ICommandInfo, IRange, IUniverInstanceService } from '@univerjs/core';
import type { IMoveRangeMutationParams } from '../../commands/mutations/move-range.mutation';
import type { IMoveColumnsMutationParams, IMoveRowsMutationParams } from '../../commands/mutations/move-rows-cols.mutation';
import type { IReorderRangeMutationParams } from '../../commands/mutations/reorder-range.mutation';
import type { ISetColDataMutationParams } from '../../commands/mutations/set-col-data.mutation';
import type { ISetColHiddenMutationParams, ISetColVisibleMutationParams } from '../../commands/mutations/set-col-visible.mutation';
import type { ISetGridlinesColorMutationParams } from '../../commands/mutations/set-gridlines-color.mutation';
import type { ISetRangeValuesMutationParams } from '../../commands/mutations/set-range-values.mutation';
import type { ISetRowDataMutationParams } from '../../commands/mutations/set-row-data.mutation';
import type { ISetRowHiddenMutationParams, ISetRowVisibleMutationParams } from '../../commands/mutations/set-row-visible.mutation';
import type { ISetWorksheetColWidthMutationParams } from '../../commands/mutations/set-worksheet-col-width.mutation';
import type { ISetWorksheetDefaultStyleMutationParams } from '../../commands/mutations/set-worksheet-default-style.mutation';
import type { ISetWorksheetRowAutoHeightMutationParams, ISetWorksheetRowHeightMutationParams, ISetWorksheetRowIsAutoHeightMutationParams } from '../../commands/mutations/set-worksheet-row-height.mutation';
import type { IToggleGridlinesMutationParams } from '../../commands/mutations/toggle-gridlines.mutation';
import type { ISetWorksheetActiveOperationParams } from '../../commands/operations/set-worksheet-active.operation';
import type { IAddWorksheetMergeMutationParams, IInsertColMutationParams, IInsertRowMutationParams, IRemoveColMutationParams, IRemoveRowsMutationParams, IRemoveWorksheetMergeMutationParams, IWorksheetRangeThemeStyleMutationParams } from '../interfaces';
/**
 * Enum for all skeleton change command IDs
 */
export declare enum SheetSkeletonChangeType {
    SET_WORKSHEET_ROW_HEIGHT = "sheet.mutation.set-worksheet-row-height",
    SET_WORKSHEET_ROW_IS_AUTO_HEIGHT = "sheet.mutation.set-worksheet-row-is-auto-height",
    SET_WORKSHEET_ROW_AUTO_HEIGHT = "sheet.mutation.set-worksheet-row-auto-height",
    SET_WORKSHEET_COL_WIDTH = "sheet.mutation.set-worksheet-col-width",
    SET_WORKSHEET_ACTIVE = "sheet.operation.set-worksheet-active",
    MOVE_ROWS = "sheet.mutation.move-rows",
    MOVE_COLUMNS = "sheet.mutation.move-columns",
    SET_COL_HIDDEN = "sheet.mutation.set-col-hidden",
    SET_COL_VISIBLE = "sheet.mutation.set-col-visible",
    SET_ROW_HIDDEN = "sheet.mutation.set-row-hidden",
    SET_ROW_VISIBLE = "sheet.mutation.set-row-visible",
    INSERT_COL = "sheet.mutation.insert-col",
    INSERT_ROW = "sheet.mutation.insert-row",
    REMOVE_COL = "sheet.mutation.remove-col",
    REMOVE_ROW = "sheet.mutation.remove-rows",
    TOGGLE_GRIDLINES = "sheet.mutation.toggle-gridlines",
    SET_GRIDLINES_COLOR = "sheet.mutation.set-gridlines-color"
}
/**
 * Enum for all value change command IDs
 */
export declare enum SheetValueChangeType {
    SET_RANGE_VALUES = "sheet.mutation.set-range-values",
    MOVE_RANGE = "sheet.mutation.move-range",
    REMOVE_WORKSHEET_MERGE = "sheet.mutation.remove-worksheet-merge",
    ADD_WORKSHEET_MERGE = "sheet.mutation.add-worksheet-merge",
    REORDER_RANGE = "sheet.mutation.reorder-range",
    SET_WORKSHEET_DEFAULT_STYLE = "sheet.mutation.set-worksheet-default-style",
    SET_ROW_DATA = "sheet.mutation.set-row-data",
    SET_COL_DATA = "sheet.mutation.set-col-data",
    SET_WORKSHEET_RANGE_THEME_STYLE = "sheet.mutation.set-worksheet-range-theme-style",
    DELETE_WORKSHEET_RANGE_THEME_STYLE = "sheet.mutation.delete-worksheet-range-theme-style"
}
/**
 * Mutations those will trigger the skeleton change.
 */
export declare const COMMAND_LISTENER_SKELETON_CHANGE: string[];
export declare const COMMAND_LISTENER_VALUE_CHANGE: string[];
export type CommandListenerSkeletonChange = {
    id: SheetSkeletonChangeType.SET_WORKSHEET_ROW_HEIGHT;
    params: ISetWorksheetRowHeightMutationParams;
} | {
    id: SheetSkeletonChangeType.SET_WORKSHEET_ROW_IS_AUTO_HEIGHT;
    params: ISetWorksheetRowIsAutoHeightMutationParams;
} | {
    id: SheetSkeletonChangeType.SET_WORKSHEET_ROW_AUTO_HEIGHT;
    params: ISetWorksheetRowAutoHeightMutationParams;
} | {
    id: SheetSkeletonChangeType.SET_WORKSHEET_COL_WIDTH;
    params: ISetWorksheetColWidthMutationParams;
} | {
    id: SheetSkeletonChangeType.SET_WORKSHEET_ACTIVE;
    params: ISetWorksheetActiveOperationParams;
} | {
    id: SheetSkeletonChangeType.MOVE_ROWS;
    params: IMoveRowsMutationParams;
} | {
    id: SheetSkeletonChangeType.MOVE_COLUMNS;
    params: IMoveColumnsMutationParams;
} | {
    id: SheetSkeletonChangeType.SET_COL_HIDDEN;
    params: ISetColHiddenMutationParams;
} | {
    id: SheetSkeletonChangeType.SET_COL_VISIBLE;
    params: ISetColVisibleMutationParams;
} | {
    id: SheetSkeletonChangeType.SET_ROW_HIDDEN;
    params: ISetRowHiddenMutationParams;
} | {
    id: SheetSkeletonChangeType.SET_ROW_VISIBLE;
    params: ISetRowVisibleMutationParams;
} | {
    id: SheetSkeletonChangeType.INSERT_COL;
    params: IInsertColMutationParams;
} | {
    id: SheetSkeletonChangeType.INSERT_ROW;
    params: IInsertRowMutationParams;
} | {
    id: SheetSkeletonChangeType.REMOVE_COL;
    params: IRemoveColMutationParams;
} | {
    id: SheetSkeletonChangeType.REMOVE_ROW;
    params: IRemoveRowsMutationParams;
} | {
    id: SheetSkeletonChangeType.TOGGLE_GRIDLINES;
    params: IToggleGridlinesMutationParams;
} | {
    id: SheetSkeletonChangeType.SET_GRIDLINES_COLOR;
    params: ISetGridlinesColorMutationParams;
};
export type CommandListenerValueChange = {
    id: SheetValueChangeType.SET_RANGE_VALUES;
    params: ISetRangeValuesMutationParams;
} | {
    id: SheetValueChangeType.MOVE_RANGE;
    params: IMoveRangeMutationParams;
} | {
    id: SheetValueChangeType.REMOVE_WORKSHEET_MERGE;
    params: IRemoveWorksheetMergeMutationParams;
} | {
    id: SheetValueChangeType.ADD_WORKSHEET_MERGE;
    params: IAddWorksheetMergeMutationParams;
} | {
    id: SheetValueChangeType.REORDER_RANGE;
    params: IReorderRangeMutationParams;
} | {
    id: SheetValueChangeType.SET_WORKSHEET_DEFAULT_STYLE;
    params: ISetWorksheetDefaultStyleMutationParams;
} | {
    id: SheetValueChangeType.SET_ROW_DATA;
    params: ISetRowDataMutationParams;
} | {
    id: SheetValueChangeType.SET_COL_DATA;
    params: ISetColDataMutationParams;
} | {
    id: SheetValueChangeType.SET_WORKSHEET_RANGE_THEME_STYLE;
    params: IWorksheetRangeThemeStyleMutationParams;
} | {
    id: SheetValueChangeType.DELETE_WORKSHEET_RANGE_THEME_STYLE;
    params: IWorksheetRangeThemeStyleMutationParams;
};
export declare function getValueChangedEffectedRange(univerInstanceService: IUniverInstanceService, commandInfo: ICommandInfo): {
    unitId: string;
    subUnitId: string;
    range: IRange;
}[];
/**
 * Get the affected range for skeleton change commands
 * @param {ICommandInfo} commandInfo The command information
 * @returns {{ unitId: string; subUnitId: string; range: IRange }[]} Array of affected ranges
 */
export declare function getSkeletonChangedEffectedRange(commandInfo: ICommandInfo, columnCount: number): {
    unitId: string;
    subUnitId: string;
    range: IRange;
}[];
