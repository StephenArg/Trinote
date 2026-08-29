import type { IMutation } from '@univerjs/core';
import type { DimensionOutlineAxis, IDimensionOutline } from '../../common/type';
export type ITransformDimensionOutlinesMutationParams = {
    unitId: string;
    subUnitId: string;
    axis: DimensionOutlineAxis;
    type: 'insert';
    index: number;
    count: number;
    restoreOutlines?: IDimensionOutline[];
} | {
    unitId: string;
    subUnitId: string;
    axis: DimensionOutlineAxis;
    type: 'delete';
    start: number;
    end: number;
} | {
    unitId: string;
    subUnitId: string;
    axis: DimensionOutlineAxis;
    type: 'move';
    sourceStart: number;
    sourceEnd: number;
    destinationIndex: number;
};
export declare const TransformDimensionOutlinesMutation: IMutation<ITransformDimensionOutlinesMutationParams>;
