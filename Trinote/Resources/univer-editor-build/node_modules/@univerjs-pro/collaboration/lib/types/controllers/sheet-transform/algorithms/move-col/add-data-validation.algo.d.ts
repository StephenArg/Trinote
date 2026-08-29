import type { ICommandInfo, IMutationInfo } from '@univerjs/core';
import type { IAddDataValidationMutationParams } from '@univerjs/data-validation';
import type { IMoveColumnsMutationParams } from '@univerjs/sheets';
import type { IMutationTransformAlgorithm } from '../../../../services/transform/transform.service';
export declare function transformAddDataValidationWithRefRange(m: IMutationInfo<IAddDataValidationMutationParams>, command: ICommandInfo): IMutationInfo<object>[];
export declare const moveColMutationWithAddDataValidation: IMutationTransformAlgorithm<IMoveColumnsMutationParams, IAddDataValidationMutationParams>;
