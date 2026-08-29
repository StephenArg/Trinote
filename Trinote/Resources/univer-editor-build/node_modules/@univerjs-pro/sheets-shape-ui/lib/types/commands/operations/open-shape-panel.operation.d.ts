import type { IOperation } from '@univerjs/core';
export interface IShapeOpenPanelOperationParams {
    unitId: string;
    subUnitId: string;
    drawingId: string;
}
export declare const OpenSheetShapeFormatPanelOperation: IOperation<IShapeOpenPanelOperationParams>;
