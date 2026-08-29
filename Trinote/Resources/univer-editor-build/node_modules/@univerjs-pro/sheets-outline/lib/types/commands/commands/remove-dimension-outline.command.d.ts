import type { ICommand } from '@univerjs/core';
export interface IRemoveDimensionOutlineCommandParams {
    unitId?: string;
    subUnitId?: string;
    outlineId: string;
}
export declare const RemoveDimensionOutlineCommand: ICommand<IRemoveDimensionOutlineCommandParams>;
