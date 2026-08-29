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
import type { ICommand } from '@univerjs/core';
import type { IThreadComment } from '../../types/interfaces/i-thread-comment';
import type { IUpdateCommentPayload } from '../mutations/comment.mutation';
export interface IAddCommentCommandParams {
    unitId: string;
    subUnitId: string;
    comment: IThreadComment;
}
export declare const AddCommentCommand: ICommand<IAddCommentCommandParams>;
export interface IUpdateCommentCommandParams {
    unitId: string;
    subUnitId: string;
    payload: IUpdateCommentPayload;
}
export declare const UpdateCommentCommand: ICommand<IUpdateCommentCommandParams>;
export interface IResolveCommentCommandParams {
    unitId: string;
    subUnitId: string;
    commentId: string;
    resolved: boolean;
}
export declare const ResolveCommentCommand: ICommand<IResolveCommentCommandParams>;
export interface IDeleteCommentCommandParams {
    unitId: string;
    subUnitId: string;
    commentId: string;
}
/**
 * Delete Reply
 */
export declare const DeleteCommentCommand: ICommand<IDeleteCommentCommandParams>;
export interface IDeleteCommentTreeCommandParams {
    unitId: string;
    subUnitId: string;
    commentId: string;
}
export declare const DeleteCommentTreeCommand: ICommand<IDeleteCommentCommandParams>;
