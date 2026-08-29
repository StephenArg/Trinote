import type { IMutation } from '@univerjs/core';
import type { ISparklineSerializedGroup } from '../../common/type';
export interface ISetSheetSparklineMutationProps {
    groupIds: string[];
    unitId: string;
    subUnitId: string;
    config: ISparklineSerializedGroup;
}
export declare const SetSheetSparklineMutation: IMutation<ISetSheetSparklineMutationProps>;
