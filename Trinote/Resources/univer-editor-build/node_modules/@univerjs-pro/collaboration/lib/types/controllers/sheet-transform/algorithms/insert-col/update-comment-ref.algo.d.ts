import type { ICommandInfo, IMutationInfo } from '@univerjs/core';
import type { IInsertColMutationParams } from '@univerjs/sheets';
import type { IUpdateCommentRefMutationParams } from '@univerjs/thread-comment';
import type { IMutationTransformAlgorithm } from '../../../../services/transform/transform.service';
export declare const transformUpdateCommentRefWithRefRange: (m2: IMutationInfo<IUpdateCommentRefMutationParams>, command: ICommandInfo) => {
    id: string;
    params: {
        comment: undefined;
        commentId: string;
        unitId: string;
        subUnitId: string;
        payload: import("@univerjs/thread-comment/commands/mutations/comment.mutation.js").IUpdateCommentRefPayload;
        silent?: boolean;
    };
}[] | {
    id: string;
    params: IUpdateCommentRefMutationParams;
}[];
export declare const insertColWithUpdateCommentRef: IMutationTransformAlgorithm<IInsertColMutationParams, IUpdateCommentRefMutationParams>;
