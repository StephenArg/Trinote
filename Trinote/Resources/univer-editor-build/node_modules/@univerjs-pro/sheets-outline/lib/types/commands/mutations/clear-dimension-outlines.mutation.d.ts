import type { IMutation } from '@univerjs/core';
import type { DimensionOutlineAxis } from '../../common/type';
export interface IClearDimensionOutlinesMutationParams {
    unitId: string;
    subUnitId: string;
    axis: DimensionOutlineAxis;
    start: number;
    end: number;
    removedOutlineIds?: string[];
}
export declare const ClearDimensionOutlinesMutation: IMutation<IClearDimensionOutlinesMutationParams>;
