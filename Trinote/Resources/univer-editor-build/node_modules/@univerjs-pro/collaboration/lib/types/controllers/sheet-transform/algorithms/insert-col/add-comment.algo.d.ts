import type { ICommandInfo, IMutationInfo } from '@univerjs/core';
import type { IInsertColMutationParams } from '@univerjs/sheets';
import type { IAddCommentMutationParams, IUpdateCommentRefMutationParams } from '@univerjs/thread-comment';
import type { IMutationTransformAlgorithm } from '../../../../services/transform/transform.service';
export declare const transformAddCommentWithRefRange: (m2: IMutationInfo<IAddCommentMutationParams>, command: ICommandInfo) => {
    id: string;
    params: {
        comment: undefined;
        commentId: string;
        unitId: string;
        subUnitId: string;
        sync?: boolean;
    };
}[] | {
    id: string;
    params: IUpdateCommentRefMutationParams;
}[];
export declare const insertColWithAddComment: IMutationTransformAlgorithm<IInsertColMutationParams, IAddCommentMutationParams>;
