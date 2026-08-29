import type { ICommand } from '@univerjs/core';
import type { IRemovePivotTableMutationParams } from '../../const/type';
export interface IRemovePivotTableCommandParams extends IRemovePivotTableMutationParams {
    /**
     * @property {string} unitId The unit id of workbook which the pivot table belongs to.
     */
    unitId: string;
    /**
     * @property {string} subUnitId The sub unit id of worksheet which the pivot table belongs to.
     */
    subUnitId: string;
    /**
     * @property {string} pivotTableId The pivot table id.
     */
    pivotTableId: string;
}
export declare const RemovePivotTableCommand: ICommand<IRemovePivotTableCommandParams>;
