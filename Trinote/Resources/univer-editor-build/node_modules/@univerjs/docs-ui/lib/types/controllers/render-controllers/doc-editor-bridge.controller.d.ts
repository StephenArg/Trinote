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
import { Disposable, ICommandService, IUniverInstanceService } from '@univerjs/core';
import { DocSkeletonManagerService } from '@univerjs/docs';
import { IRenderManagerService } from '@univerjs/engine-render';
import { IEditorService } from '../../services/editor/editor-manager.service';
import { DocSelectionRenderService } from '../../services/selection/doc-selection-render.service';
export declare class DocEditorBridgeController extends Disposable implements IRenderModule {
    private readonly _context;
    private readonly _univerInstanceService;
    private readonly _editorService;
    private readonly _commandService;
    private readonly _docSelectionRenderService;
    private readonly _docSkeletonManagerService;
    private readonly _renderManagerService;
    private _initialEditors;
    constructor(_context: IRenderContext<DocumentDataModel>, _univerInstanceService: IUniverInstanceService, _editorService: IEditorService, _commandService: ICommandService, _docSelectionRenderService: DocSelectionRenderService, _docSkeletonManagerService: DocSkeletonManagerService, _renderManagerService: IRenderManagerService);
    private _initialize;
    private _resize;
    private _initialBlur;
    private _initialFocus;
    /**
     * Listen to document edits to refresh the size of the formula editor.
     */
    private _commandExecutedListener;
}
