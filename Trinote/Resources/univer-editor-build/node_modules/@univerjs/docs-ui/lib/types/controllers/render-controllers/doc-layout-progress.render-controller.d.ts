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
import type { DocumentDataModel } from '@univerjs/core';
import type { IDocumentLayoutProgress, IRenderContext, IRenderModule } from '@univerjs/engine-render';
import { RxDisposable } from '@univerjs/core';
import { DocSkeletonManagerService } from '@univerjs/docs';
import { DocLayoutProgressService } from '../../services/doc-layout-progress.service';
export declare const DOC_LAYOUT_PROGRESS_DELAY_MS = 2000;
export declare const DOC_LAYOUT_PROGRESS_CANCEL_GRACE_MS = 1000;
export declare function resolveDocLayoutProgressPercent(progress: IDocumentLayoutProgress): number;
export declare class DocLayoutProgressRenderController extends RxDisposable implements IRenderModule {
    private readonly _context;
    private readonly _docSkeletonManagerService;
    private readonly _docLayoutProgressService;
    private _visible;
    private _delayTimer;
    private _cancelTimer;
    private _latestProgress;
    private _layoutStartedAt;
    private _maxProgress;
    constructor(_context: IRenderContext<DocumentDataModel>, _docSkeletonManagerService: DocSkeletonManagerService, _docLayoutProgressService: DocLayoutProgressService);
    dispose(): void;
    private _handleProgress;
    private _scheduleShow;
    private _show;
    private _scheduleCancelledClear;
    private _clearCancelTimer;
    private _reset;
}
