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
import type { ITextRange, Nullable } from '@univerjs/core';
import type { IThreadComment } from '@univerjs/thread-comment';
import { Disposable } from '@univerjs/core';
import { ThreadCommentPanelService } from '@univerjs/thread-comment-ui';
import { ISidebarService } from '@univerjs/ui';
export declare class DocThreadCommentService extends Disposable {
    private readonly _sidebarService;
    private readonly _threadCommentPanelService;
    private _addingComment$;
    readonly addingComment$: import("rxjs").Observable<Nullable<IThreadComment & ITextRange>>;
    get addingComment(): Nullable<IThreadComment & ITextRange>;
    constructor(_sidebarService: ISidebarService, _threadCommentPanelService: ThreadCommentPanelService);
    startAdd(comment: IThreadComment & ITextRange): void;
    endAdd(): void;
}
