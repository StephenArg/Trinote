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
import type { IBaseComment, IThreadComment } from '../types/interfaces/i-thread-comment';
import { Disposable } from '@univerjs/core';
export type ThreadCommentJSON = {
    id: string;
    threadId: string;
    ref: string;
} & Partial<Omit<IThreadComment, 'id' | 'threadId' | 'ref'>>;
type Success = boolean;
export interface IThreadCommentDataSource {
    /**
     * handler for add-comment, throw error means fail and stop the process.
     */
    addComment: (comment: IThreadComment) => Promise<IThreadComment>;
    /**
     * handler for update-comment, throw error means fail and stop the process.
     */
    updateComment: (comment: IThreadComment) => Promise<Success>;
    resolveComment: (comment: IThreadComment) => Promise<Success>;
    /**
     * handler for delete-comment, throw error means fail and stop the process.
     */
    deleteComment: (unitId: string, subUnitId: string, threadId: string, commentId: string) => Promise<Success>;
    /**
     * handler for batch-fetch-comment, throw error means fail and stop the process.
     */
    listComments: (unitId: string, subUnitId: string, threadId: string[]) => Promise<IBaseComment[]>;
    saveCommentToSnapshot: (comment: IThreadComment) => ThreadCommentJSON;
}
export interface IThreadCommentDataSourceService {
    dataSource: Nullable<IThreadCommentDataSource>;
    /**
     * should sync update mutations to collaboration-server
     */
    syncUpdateMutationToColla: boolean;
    /**
     * handler for add-comment, throw error means fail and stop the process.
     */
    addComment: (comment: IThreadComment) => Promise<IThreadComment>;
    /**
     * handler for update-comment, throw error means fail and stop the process.
     */
    updateComment: (comment: IThreadComment) => Promise<Success>;
    /**
     * handler for resolve-comment, throw error means fail and stop the process.
     */
    resolveComment: (comment: IThreadComment) => Promise<Success>;
    /**
     * handler for delete-comment, throw error means fail and stop the process.
     */
    deleteComment: (unitId: string, subUnitId: string, threadId: string, commentId: string) => Promise<Success>;
    saveToSnapshot: (unitComments: Record<string, IThreadComment[]>, unitId: string) => Record<string, ThreadCommentJSON[]>;
    getThreadComment: (unitId: string, subUnitId: string, threadId: string) => Promise<Nullable<IBaseComment>>;
    listThreadComments: (unitId: string, subUnitId: string, threadId: string[]) => Promise<IBaseComment[] | false>;
}
/**
 * Preserve for import async comment system
 */
export declare class ThreadCommentDataSourceService extends Disposable implements IThreadCommentDataSourceService {
    private _dataSource;
    syncUpdateMutationToColla: boolean;
    set dataSource(dataSource: Nullable<IThreadCommentDataSource>);
    get dataSource(): Nullable<IThreadCommentDataSource>;
    constructor();
    getThreadComment(unitId: string, subUnitId: string, threadId: string): Promise<Nullable<IBaseComment>>;
    addComment(comment: IThreadComment): Promise<{
        threadId: string;
        ref: string;
        id: string;
        dT: string;
        updateT?: string;
        personId: string;
        text: import("@univerjs/core").IDocumentBody;
        attachments?: string[];
        updated?: boolean;
        mentions?: string[];
        parentId?: string;
        resolved?: boolean;
        unitId: string;
        subUnitId: string;
        children?: IBaseComment[];
    }>;
    updateComment(comment: IThreadComment): Promise<boolean>;
    resolveComment(comment: IThreadComment): Promise<boolean>;
    deleteComment(unitId: string, subUnitId: string, threadId: string, commentId: string): Promise<boolean>;
    listThreadComments(unitId: string, subUnitId: string, threadIds: string[]): Promise<false | IBaseComment[]>;
    saveToSnapshot(unitComments: Record<string, IThreadComment[]>, unitId: string): Record<string, ThreadCommentJSON[]>;
}
export declare const IThreadCommentDataSourceService: import("@wendellhu/redi").IdentifierDecorator<IThreadCommentDataSourceService>;
export {};
