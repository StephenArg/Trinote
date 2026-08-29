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
import type { IRenderContext, IRenderModule, IWheelEvent } from '@univerjs/engine-render';
import { Disposable, DocumentFlavor, ICommandService, IContextService, IUniverInstanceService } from '@univerjs/core';
import { DocSelectionManagerService, DocSkeletonManagerService } from '@univerjs/docs';
import { IRenderManagerService } from '@univerjs/engine-render';
import { DocPageLayoutService } from '../../services/doc-page-layout.service';
import { IEditorService } from '../../services/editor/editor-manager.service';
export declare function shouldHandleDocWheelZoom(event: Pick<IWheelEvent, 'ctrlKey' | 'metaKey'>, focusingDoc: boolean, _documentFlavor?: DocumentFlavor): boolean;
export declare class DocZoomRenderController extends Disposable implements IRenderModule {
    private readonly _context;
    private readonly _contextService;
    private readonly _docSkeletonManagerService;
    private readonly _univerInstanceService;
    private readonly _commandService;
    private readonly _textSelectionManagerService;
    private readonly _editorService;
    private readonly _docPageLayoutService;
    private readonly _renderManagerService;
    private _isSheetEditor;
    private _initTimer;
    private _updateTimer;
    constructor(_context: IRenderContext<DocumentDataModel>, _contextService: IContextService, _docSkeletonManagerService: DocSkeletonManagerService, _univerInstanceService: IUniverInstanceService, _commandService: ICommandService, _textSelectionManagerService: DocSelectionManagerService, _editorService: IEditorService, _docPageLayoutService: DocPageLayoutService, _renderManagerService: IRenderManagerService);
    dispose(): void;
    private _initSkeletonListener;
    private _initCommandExecutedListener;
    updateViewZoom(zoomRatio: number, needRefreshSelection?: boolean): void;
    private _initZoomEventListener;
}
