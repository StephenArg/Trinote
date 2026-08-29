import type { IMutation } from '@univerjs/core';
import type { ISparklineSerializedGroup } from '../../common/type';
export interface IAddSheetSparklineMutationProps {
    unitId: string;
    subUnitId: string;
    sparklineConfigMap: Record<string, ISparklineSerializedGroup>;
}
export declare const AddSheetSparklineMutation: IMutation<IAddSheetSparklineMutationProps>;
