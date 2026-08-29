/**
 * Copyright 2023-present DreamNum Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import type { ICommand, IDocumentBody } from '@univerjs/core';
import type { IThreadComment } from '../../types/interfaces/i-thread-comment';
export interface IAddCommentMutationParams {
    unitId: string;
    subUnitId: string;
    comment: IThreadComment;
    sync?: boolean;
}
export declare const AddCommentMutation: ICommand<IAddCommentMutationParams>;
export interface IUpdateCommentPayload {
    commentId: string;
    text: IDocumentBody;
    attachments?: string[];
    updated?: boolean;
    updateT?: string;
}
export interface IUpdateCommentMutationParams {
    unitId: string;
    subUnitId: string;
    payload: IUpdateCommentPayload;
    silent?: boolean;
}
export declare const UpdateCommentMutation: ICommand<IUpdateCommentMutationParams>;
export interface IUpdateCommentRefPayload {
    commentId: string;
    ref: string;
}
export interface IUpdateCommentRefMutationParams {
    unitId: string;
    subUnitId: string;
    payload: IUpdateCommentRefPayload;
    silent?: boolean;
}
export declare const UpdateCommentRefMutation: ICommand<IUpdateCommentRefMutationParams>;
export interface IResolveCommentMutationParams {
    unitId: string;
    subUnitId: string;
    commentId: string;
    resolved: boolean;
}
export declare const ResolveCommentMutation: ICommand<IResolveCommentMutationParams>;
export interface IDeleteCommentMutationParams {
    unitId: string;
    subUnitId: string;
    commentId: string;
}
export declare const DeleteCommentMutation: ICommand<IDeleteCommentMutationParams>;
