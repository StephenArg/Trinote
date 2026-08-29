import type { IMutation } from '@univerjs/core';
import type { ISheetCommandSharedParams } from '@univerjs/sheets';
export interface IRemoveSheetsShapeMutationParams extends ISheetCommandSharedParams {
    shapeId: string;
}
export declare const RemoveSheetsShapeMutation: IMutation<IRemoveSheetsShapeMutationParams>;
