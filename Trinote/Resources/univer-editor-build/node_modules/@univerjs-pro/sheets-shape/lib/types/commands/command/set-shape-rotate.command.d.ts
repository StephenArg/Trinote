import type { ICommand } from '@univerjs/core';
import type { ISheetCommandSharedParams } from '@univerjs/sheets';
export interface IUpdateSheetsShapeRotateCommandParams extends ISheetCommandSharedParams {
    shapeId: string;
    /**
     * is toggle horizontal flip
     */
    rotate: number;
}
export declare const SetSheetsShapeRotateCommand: ICommand;
