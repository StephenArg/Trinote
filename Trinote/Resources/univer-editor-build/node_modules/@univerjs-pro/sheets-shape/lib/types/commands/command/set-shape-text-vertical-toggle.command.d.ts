import type { ICommand } from '@univerjs/core';
import type { ISheetCommandSharedParams } from '@univerjs/sheets';
export interface ISetSheetsShapeTextVerticalToggleCommandParams extends ISheetCommandSharedParams {
    shapeId: string;
}
export declare const SetSheetsShapeTextVerticalToggleCommand: ICommand<ISetSheetsShapeTextVerticalToggleCommandParams>;
