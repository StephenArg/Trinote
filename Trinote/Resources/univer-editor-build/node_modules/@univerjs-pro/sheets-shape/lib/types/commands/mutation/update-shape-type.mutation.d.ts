import type { IShapeData, ShapeTypeEnum } from '@univerjs-pro/engine-shape';
import type { IMutation } from '@univerjs/core';
import type { ISheetCommandSharedParams } from '@univerjs/sheets';
export interface IUpdateSheetsShapeTypeMutationParams extends ISheetCommandSharedParams {
    shapeId: string;
    shapeType: ShapeTypeEnum;
    shapeData?: IShapeData;
}
export declare const UpdateSheetsShapeTypeMutation: IMutation<IUpdateSheetsShapeTypeMutationParams>;
