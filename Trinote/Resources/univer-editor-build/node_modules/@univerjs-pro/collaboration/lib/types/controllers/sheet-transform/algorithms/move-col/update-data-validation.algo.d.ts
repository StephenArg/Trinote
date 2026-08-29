import type { ICommandInfo, IMutationInfo } from '@univerjs/core';
import type { IUpdateDataValidationMutationParams } from '@univerjs/data-validation';
import type { IMoveColumnsMutationParams } from '@univerjs/sheets';
import type { IMutationTransformAlgorithm } from '../../../../services/transform/transform.service';
export declare function transformUpdateDataValidationWithRefRange(m: IMutationInfo<IUpdateDataValidationMutationParams>, command: ICommandInfo): {
    id: string;
    params: IUpdateDataValidationMutationParams;
}[];
export declare const moveColMutationWithUpdateDataValidation: IMutationTransformAlgorithm<IMoveColumnsMutationParams, IUpdateDataValidationMutationParams>;
