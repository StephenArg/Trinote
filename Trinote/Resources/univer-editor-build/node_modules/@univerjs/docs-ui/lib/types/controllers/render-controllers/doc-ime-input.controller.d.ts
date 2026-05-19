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
import type { IRenderContext, IRenderModule } from '@univerjs/engine-render';
import { Disposable, ICommandService } from '@univerjs/core';
import { DocSkeletonManagerService, DocStateEmitService } from '@univerjs/docs';
import { DocIMEInputManagerService } from '../../services/doc-ime-input-manager.service';
import { DocSelectionRenderService } from '../../services/selection/doc-selection-render.service';
export declare class DocIMEInputController extends Disposable implements IRenderModule {
    private readonly _context;
    private readonly _docSelectionRenderService;
    private readonly _docImeInputManagerService;
    private readonly _docSkeletonManagerService;
    private readonly _docStateEmitService;
    private readonly _commandService;
    private _previousIMEContent;
    private _isCompositionStart;
    private _onStartSubscription;
    private _onUpdateSubscription;
    private _onEndSubscription;
    constructor(_context: IRenderContext<DocumentDataModel>, _docSelectionRenderService: DocSelectionRenderService, _docImeInputManagerService: DocIMEInputManagerService, _docSkeletonManagerService: DocSkeletonManagerService, _docStateEmitService: DocStateEmitService, _commandService: ICommandService);
    dispose(): void;
    private _initialize;
    private _initialOnCompositionstart;
    private _initialOnCompositionUpdate;
    private _initialOnCompositionend;
    private _updateContent;
    private _finalizeComposition;
    private _resetIME;
}
