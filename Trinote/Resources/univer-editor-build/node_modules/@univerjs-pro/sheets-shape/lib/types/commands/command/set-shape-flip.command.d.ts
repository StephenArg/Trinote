import type { ICommand } from '@univerjs/core';
import type { ISheetCommandSharedParams } from '@univerjs/sheets';
export interface IUpdateSheetsShapeFlipCommandParams extends ISheetCommandSharedParams {
    shapeId: string;
    /**
     * is toggle horizontal flip
     */
    flipH?: boolean;
    /**
     * is toggle vertical flip
     */
    flipV?: boolean;
}
export declare const ToggleSheetsShapeFlipCommand: ICommand;
