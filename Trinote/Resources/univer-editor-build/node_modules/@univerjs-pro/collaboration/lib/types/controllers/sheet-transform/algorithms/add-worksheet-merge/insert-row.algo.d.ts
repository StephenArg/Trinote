import type { IMutationInfo } from '@univerjs/core';
import type { IAddWorksheetMergeMutationParams, IInsertColMutationParams, IInsertRowMutationParams, IRemoveColMutationParams, IRemoveRowsMutationParams, IRemoveWorksheetMergeMutationParams } from '@univerjs/sheets';
import type { IMutationTransformAlgorithm } from '../../../../services/transform/transform.service';
export type IMutationInfoArrWithMergeAndRowCol = Array<IMutationInfo<IInsertRowMutationParams> | IMutationInfo<IInsertColMutationParams> | IMutationInfo<IRemoveRowsMutationParams> | IMutationInfo<IRemoveColMutationParams> | IMutationInfo<IAddWorksheetMergeMutationParams> | IMutationInfo<IRemoveWorksheetMergeMutationParams>>;
export declare const addWorksheetMergeMutationWithInsertRowMutation: IMutationTransformAlgorithm<IAddWorksheetMergeMutationParams, IInsertRowMutationParams>;
