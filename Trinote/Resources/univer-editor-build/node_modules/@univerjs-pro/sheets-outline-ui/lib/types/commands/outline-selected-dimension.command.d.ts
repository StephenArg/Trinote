import type { ICommand } from '@univerjs/core';
import { DimensionOutlineAxis } from '@univerjs-pro/sheets-outline';
import { SheetsSelectionsService } from '@univerjs/sheets';
export declare const OutlineSelectedDimensionCommand: ICommand;
export declare const OutlineSelectedRowsCommand: ICommand;
export declare const OutlineSelectedColumnsCommand: ICommand;
export interface IDimensionSelectionInfo {
    axis: DimensionOutlineAxis;
    start: number;
    end: number;
}
export declare function getSingleDimensionSelection(selectionService: SheetsSelectionsService, axis?: DimensionOutlineAxis): IDimensionSelectionInfo | null;
