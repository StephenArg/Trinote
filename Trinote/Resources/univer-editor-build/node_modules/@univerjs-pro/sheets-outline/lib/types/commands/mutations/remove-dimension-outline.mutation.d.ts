import type { IMutation } from '@univerjs/core';
import type { IDimensionOutline } from '../../common/type';
export interface IRemoveDimensionOutlineMutationParams {
    unitId: string;
    subUnitId: string;
    outlineId: string;
    outline?: IDimensionOutline;
}
export declare const RemoveDimensionOutlineMutation: IMutation<IRemoveDimensionOutlineMutationParams>;
