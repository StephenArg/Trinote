import type { IMutation } from '@univerjs/core';
import type { IDimensionOutline } from '../../common/type';
export interface ISetDimensionOutlineCollapsedMutationParams {
    unitId: string;
    subUnitId: string;
    outlineId: string;
    outline?: IDimensionOutline;
    collapsed: boolean;
}
export declare const SetDimensionOutlineCollapsedMutation: IMutation<ISetDimensionOutlineCollapsedMutationParams>;
