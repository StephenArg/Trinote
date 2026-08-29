import type { ICommand } from '@univerjs/core';
import { DimensionOutlineAxis } from '../../common/type';
export interface IAddDimensionOutlineCommandParams {
    unitId?: string;
    subUnitId?: string;
    axis: DimensionOutlineAxis;
    /** Zero-based inclusive start index of the grouped rows or columns. */
    start: number;
    /** Zero-based inclusive end index of the grouped rows or columns. */
    end: number;
}
export declare const AddDimensionOutlineCommand: ICommand<IAddDimensionOutlineCommandParams>;
