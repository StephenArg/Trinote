import type { ICommand } from '@univerjs/core';
import type { IUnitRangeNameWithSubUnitId } from '../../const/type';
export interface IUpdatePivotTableSourceRangeCommandParams {
    unitId: string;
    subUnitId: string;
    token: string;
    dataRangeInfo: IUnitRangeNameWithSubUnitId;
}
export declare const UpdatePivotTableSourceRangeCommand: ICommand<IUpdatePivotTableSourceRangeCommandParams>;
