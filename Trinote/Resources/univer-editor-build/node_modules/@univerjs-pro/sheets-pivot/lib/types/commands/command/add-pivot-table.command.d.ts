import type { ICommand } from '@univerjs/core';
import type { IPivotTableConfig } from '../../const/type';
import { PositionType } from '../../const/const';
export interface IAddPivotTableCommandParams {
    positionType: PositionType;
    pivotTableId?: string;
    pivotTableConfig: Omit<IPivotTableConfig, 'fieldsConfig'>;
}
export declare const AddPivotTableCommand: ICommand<IAddPivotTableCommandParams>;
