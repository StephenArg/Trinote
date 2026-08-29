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
import type { CommentUpdate, IThreadComment } from '@univerjs/thread-comment';
import { Disposable, IUniverInstanceService } from '@univerjs/core';
import { ThreadCommentModel } from '@univerjs/thread-comment';
export type SheetCommentUpdate = CommentUpdate & {
    row: number;
    column: number;
};
export declare class SheetsThreadCommentModel extends Disposable {
    private readonly _threadCommentModel;
    private readonly _univerInstanceService;
    private _matrixMap;
    private _locationMap;
    private _commentUpdate$;
    commentUpdate$: import("rxjs").Observable<SheetCommentUpdate>;
    constructor(_threadCommentModel: ThreadCommentModel, _univerInstanceService: IUniverInstanceService);
    private _init;
    private _ensureCommentMatrix;
    private _ensureCommentLocationMap;
    private _addCommentToMatrix;
    private _deleteCommentFromMatrix;
    private _ensure;
    private _initData;
    private _addComment;
    private _initUpdateTransform;
    getByLocation(unitId: string, subUnitId: string, row: number, column: number): string | undefined;
    getAllByLocation(unitId: string, subUnitId: string, row: number, column: number): IThreadComment[];
    getComment(unitId: string, subUnitId: string, commentId: string): IThreadComment | undefined;
    getCommentWithChildren(unitId: string, subUnitId: string, row: number, column: number): import("@univerjs/core").Nullable<import("@univerjs/thread-comment").IThreadInfo>;
    showCommentMarker(unitId: string, subUnitId: string, row: number, column: number): boolean;
    getSubUnitAll(unitId: string, subUnitId: string): IThreadComment[];
}
