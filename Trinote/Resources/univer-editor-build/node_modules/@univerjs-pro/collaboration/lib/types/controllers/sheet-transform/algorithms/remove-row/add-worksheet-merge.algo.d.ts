import type { IAddWorksheetMergeMutationParams, IRemoveRowsMutationParams } from '@univerjs/sheets';
import type { IMutationTransformAlgorithm } from '../../../../services/transform/transform.service';
export declare const removeRowMutationWithAddMerge: IMutationTransformAlgorithm<IRemoveRowsMutationParams, IAddWorksheetMergeMutationParams>;
