import type { IAddCommentMutationParams, IDeleteCommentMutationParams } from '@univerjs/thread-comment';
import type { IMutationTransformAlgorithm } from '../../../../services/transform/transform.service';
export declare const deleteCommentMutationWithAdd: IMutationTransformAlgorithm<IDeleteCommentMutationParams, IAddCommentMutationParams>;
