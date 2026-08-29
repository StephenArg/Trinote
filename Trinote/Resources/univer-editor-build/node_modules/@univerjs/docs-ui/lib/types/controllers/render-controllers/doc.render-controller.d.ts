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
import { ICommandService, IUniverInstanceService, RxDisposable } from '@univerjs/core';
import { DocSelectionManagerService, DocSkeletonManagerService } from '@univerjs/docs';
import { IRenderManagerService } from '@univerjs/engine-render';
import { DocPageLayoutService } from '../../services/doc-page-layout.service';
import { IEditorService } from '../../services/editor/editor-manager.service';
import { DocSelectionRenderService } from '../../services/selection/doc-selection-render.service';
export declare class DocRenderController extends RxDisposable implements IRenderModule {
    private readonly _context;
    private readonly _commandService;
    private readonly _docSelectionRenderService;
    private readonly _docSkeletonManagerService;
    private readonly _editorService;
    private readonly _renderManagerService;
    private readonly _univerInstanceService;
    private readonly _docPageLayoutService;
    private readonly _textSelectionManagerService;
    constructor(_context: IRenderContext<DocumentDataModel>, _commandService: ICommandService, _docSelectionRenderService: DocSelectionRenderService, _docSkeletonManagerService: DocSkeletonManagerService, _editorService: IEditorService, _renderManagerService: IRenderManagerService, _univerInstanceService: IUniverInstanceService, _docPageLayoutService: DocPageLayoutService, _textSelectionManagerService: DocSelectionManagerService);
    reRender(unitId: string): void;
    private _addNewRender;
    private _addComponent;
    private _initRenderRefresh;
    private _create;
    private _initCommandListener;
    private _refreshPagePositionAndSelection;
    private _recalculateSizeBySkeleton;
    private _syncCanvasBackground;
    private _getEditorBackgroundConfig;
}
