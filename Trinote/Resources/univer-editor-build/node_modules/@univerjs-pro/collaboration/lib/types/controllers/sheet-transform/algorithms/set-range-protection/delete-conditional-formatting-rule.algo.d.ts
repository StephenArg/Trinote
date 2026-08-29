import type { ISetRangeProtectionMutationParams } from '@univerjs/sheets';
import type { IDeleteConditionalRuleMutationParams } from '@univerjs/sheets-conditional-formatting';
import type { IMutationTransformAlgorithm } from '../../../../services/transform/transform.service';
export declare const setRangeProtectionWithDeleteConditionFormattingRule: IMutationTransformAlgorithm<ISetRangeProtectionMutationParams, IDeleteConditionalRuleMutationParams>;
