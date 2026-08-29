import type { ILineType } from '@univerjs-pro/engine-shape';
import type { ICommand } from '@univerjs/core';
import type { ISheetCommandSharedParams } from '@univerjs/sheets';
export interface IUpdateSheetsShapeResizeCommandParams extends ISheetCommandSharedParams {
    shapeId: string;
    width: number;
    height: number;
    left: number;
    top: number;
    flipX: boolean;
    flipY: boolean;
    angle: number;
    newAdjustValues: Record<string, number>;
    oldAdjustValues: Record<string, number>;
    newLineType: ILineType;
    oldLineType: ILineType;
}
export declare const UpdateLineShapeResizeCommand: ICommand;
