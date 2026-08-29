import type { ICommand } from '@univerjs/core';
export interface ISetDimensionOutlineCollapsedCommandParams {
    unitId?: string;
    subUnitId?: string;
    outlineId: string;
    collapsed: boolean;
}
export declare const SetDimensionOutlineCollapsedCommand: ICommand<ISetDimensionOutlineCollapsedCommandParams>;
