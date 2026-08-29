import type { IMutation } from '@univerjs/core';
import type { IDimensionOutline } from '../../common/type';
export interface IAddDimensionOutlineMutationParams {
    unitId: string;
    subUnitId: string;
    outline: IDimensionOutline;
}
export declare const AddDimensionOutlineMutation: IMutation<IAddDimensionOutlineMutationParams>;
