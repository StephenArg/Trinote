import type { PivotDateGroupFieldDateTypeEnum } from '@univerjs-pro/engine-pivot';
import type { ICommand } from '@univerjs/core';
interface IUpdateDateGroupCommandParams {
    unitId: string;
    subUnitId: string;
    pivotTableId: string;
    tableFieldId: string;
    dateType: PivotDateGroupFieldDateTypeEnum;
}
export declare const UpdateDateGroupCommand: ICommand<IUpdateDateGroupCommandParams>;
export {};
