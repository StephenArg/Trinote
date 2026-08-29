import type { IOperation } from '@univerjs/core';
export interface IShapeClosePanelOperationParams {
    unitId: string;
    subUnitId: string;
    drawingId: string;
}
export declare const CloseSheetShapeFormatPanelOperation: IOperation<IShapeClosePanelOperationParams>;
