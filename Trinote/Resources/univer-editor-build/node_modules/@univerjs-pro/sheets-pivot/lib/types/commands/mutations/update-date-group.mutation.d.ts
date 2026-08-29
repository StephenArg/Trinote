import type { PivotDateGroupFieldDateTypeEnum } from '@univerjs-pro/engine-pivot';
import type { IMutation } from '@univerjs/core';
interface IUpdateDateGroupMutationParams {
    unitId: string;
    subUnitId: string;
    pivotTableId: string;
    tableFieldId: string;
    dateType: PivotDateGroupFieldDateTypeEnum;
}
export declare const UpdateDateGroupMutation: IMutation<IUpdateDateGroupMutationParams>;
export {};
