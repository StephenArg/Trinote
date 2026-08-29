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
import type { IThreadComment } from '../types/interfaces/i-thread-comment';
import { Disposable, IResourceManagerService } from '@univerjs/core';
import { ThreadCommentModel } from '../models/thread-comment.model';
import { IThreadCommentDataSourceService } from '../services/tc-datasource.service';
export type UnitThreadCommentJSON = Record<string, IThreadComment[]>;
export declare const SHEET_UNIVER_THREAD_COMMENT_PLUGIN = "SHEET_UNIVER_THREAD_COMMENT_PLUGIN";
export declare class ThreadCommentResourceController extends Disposable {
    private readonly _resourceManagerService;
    private readonly _threadCommentModel;
    private readonly _threadCommentDataSourceService;
    constructor(_resourceManagerService: IResourceManagerService, _threadCommentModel: ThreadCommentModel, _threadCommentDataSourceService: IThreadCommentDataSourceService);
    private _initSnapshot;
}
