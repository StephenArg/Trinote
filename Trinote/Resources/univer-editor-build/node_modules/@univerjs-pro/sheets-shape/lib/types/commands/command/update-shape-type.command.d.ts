import type { IShapeData, ShapeTypeEnum } from '@univerjs-pro/engine-shape';
import type { ICommand } from '@univerjs/core';
import type { ISheetCommandSharedParams } from '@univerjs/sheets';
export interface IUpdateSheetsShapeTypeCommandParams extends ISheetCommandSharedParams {
    shapeId: string;
    shapeType: ShapeTypeEnum;
    shapeData?: IShapeData;
}
export declare const UpdateSheetsShapeTypeCommand: ICommand<IUpdateSheetsShapeTypeCommandParams>;
