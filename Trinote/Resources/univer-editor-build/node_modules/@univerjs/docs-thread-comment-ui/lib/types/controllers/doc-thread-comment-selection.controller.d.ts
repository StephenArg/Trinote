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
import { Disposable, ICommandService, IUniverInstanceService } from '@univerjs/core';
import { IRenderManagerService } from '@univerjs/engine-render';
import { ThreadCommentModel } from '@univerjs/thread-comment';
import { ThreadCommentPanelService } from '@univerjs/thread-comment-ui';
import { DocThreadCommentService } from '../services/doc-thread-comment.service';
export declare class DocThreadCommentSelectionController extends Disposable {
    private readonly _threadCommentPanelService;
    private readonly _univerInstanceService;
    private readonly _commandService;
    private readonly _docThreadCommentService;
    private readonly _renderManagerService;
    private readonly _threadCommentModel;
    constructor(_threadCommentPanelService: ThreadCommentPanelService, _univerInstanceService: IUniverInstanceService, _commandService: ICommandService, _docThreadCommentService: DocThreadCommentService, _renderManagerService: IRenderManagerService, _threadCommentModel: ThreadCommentModel);
    private _initSelectionChange;
    private _initActiveCommandChange;
}
