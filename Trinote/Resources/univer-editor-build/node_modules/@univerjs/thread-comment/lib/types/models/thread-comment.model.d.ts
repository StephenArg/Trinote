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
import type { Nullable } from '@univerjs/core';
import type { IUpdateCommentPayload, IUpdateCommentRefPayload } from '../commands/mutations/comment.mutation';
import type { IThreadComment } from '../types/interfaces/i-thread-comment';
import { Disposable, LifecycleService } from '@univerjs/core';
import { IThreadCommentDataSourceService } from '../services/tc-datasource.service';
export type CommentUpdate = {
    unitId: string;
    subUnitId: string;
    silent?: boolean;
} & ({
    type: 'add';
    payload: IThreadComment;
    isRoot: boolean;
} | {
    type: 'update';
    payload: IUpdateCommentPayload;
} | {
    type: 'delete';
    payload: {
        commentId: string;
        isRoot: boolean;
        comment: IThreadComment;
    };
} | {
    type: 'updateRef';
    payload: IUpdateCommentRefPayload;
    threadId: string;
} | {
    type: 'resolve';
    payload: {
        commentId: string;
        resolved: boolean;
    };
} | {
    type: 'syncUpdate';
    payload: IThreadComment;
});
export interface IThreadInfo {
    unitId: string;
    subUnitId: string;
    threadId: string;
    root: IThreadComment;
    children: IThreadComment[];
    relativeUsers: Set<string>;
}
export declare class ThreadCommentModel extends Disposable {
    private readonly _dataSourceService;
    private readonly _lifecycleService;
    private _commentsMap;
    private _threadMap;
    private _commentUpdate$;
    commentUpdate$: import("rxjs").Observable<CommentUpdate>;
    private _tasks;
    constructor(_dataSourceService: IThreadCommentDataSourceService, _lifecycleService: LifecycleService);
    private _ensureCommentMap;
    ensureMap(unitId: string, subUnitId: string): Map<string, IThreadComment>;
    private _ensureThreadMap;
    private _replaceComment;
    syncThreadComments(unitId: string, subUnitId: string, threadIds: string[]): Promise<void>;
    addComment(unitId: string, subUnitId: string, origin: IThreadComment, shouldSync?: boolean): boolean;
    updateComment(unitId: string, subUnitId: string, payload: IUpdateCommentPayload, silent?: boolean): boolean;
    updateCommentRef(unitId: string, subUnitId: string, payload: IUpdateCommentRefPayload, silent?: boolean): boolean;
    resolveComment(unitId: string, subUnitId: string, commentId: string, resolved: boolean): boolean;
    getComment(unitId: string, subUnitId: string, commentId: string): IThreadComment | undefined;
    getRootComment(unitId: string, subUnitId: string, threadId: string): IThreadComment | undefined;
    getThread(unitId: string, subUnitId: string, threadId: string): Nullable<IThreadInfo>;
    getCommentWithChildren(unitId: string, subUnitId: string, commentId: string): Nullable<IThreadInfo>;
    private _deleteComment;
    deleteThread(unitId: string, subUnitId: string, threadId: string): void;
    deleteComment(unitId: string, subUnitId: string, commentId: string): boolean;
    deleteUnit(unitId: string): void;
    getUnit(unitId: string): IThreadInfo[];
    getAll(): {
        unitId: string;
        threads: IThreadInfo[];
    }[];
}
