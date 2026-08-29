import type { IUpdateDataValidationMutationParams } from '@univerjs/data-validation';
import type { IInsertRowMutationParams } from '@univerjs/sheets';
import type { IMutationTransformAlgorithm } from '../../../../services/transform/transform.service';
export declare const insertRowMutationWithUpdateDataValidation: IMutationTransformAlgorithm<IInsertRowMutationParams, IUpdateDataValidationMutationParams>;
