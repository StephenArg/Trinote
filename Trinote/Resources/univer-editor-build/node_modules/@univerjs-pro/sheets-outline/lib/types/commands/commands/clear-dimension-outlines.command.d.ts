import type { ICommand } from '@univerjs/core';
import type { DimensionOutlineAxis } from '../../common/type';
export interface IClearDimensionOutlinesCommandParams {
    unitId?: string;
    subUnitId?: string;
    axis: DimensionOutlineAxis;
    /** Zero-based inclusive start index of the clear range. */
    start: number;
    /** Zero-based inclusive end index of the clear range. */
    end: number;
}
export declare const ClearDimensionOutlinesCommand: ICommand<IClearDimensionOutlinesCommandParams>;
