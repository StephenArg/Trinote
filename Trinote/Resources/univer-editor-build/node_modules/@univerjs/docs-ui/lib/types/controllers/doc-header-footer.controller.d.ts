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
import { Disposable, ICommandService, IUniverInstanceService, LocaleService } from '@univerjs/core';
import { DocSkeletonManagerService } from '@univerjs/docs';
import { IRenderManagerService } from '@univerjs/engine-render';
import { ComponentManager } from '@univerjs/ui';
import { IEditorService } from '../services/editor/editor-manager.service';
import { DocSelectionRenderService } from '../services/selection/doc-selection-render.service';
export declare enum HeaderFooterType {
    FIRST_PAGE_HEADER = 0,
    FIRST_PAGE_FOOTER = 1,
    DEFAULT_HEADER = 2,
    DEFAULT_FOOTER = 3,
    EVEN_PAGE_HEADER = 4,
    EVEN_PAGE_FOOTER = 5
}
export declare class DocHeaderFooterController extends Disposable implements IRenderModule {
    private readonly _context;
    private readonly _commandService;
    private readonly _editorService;
    private readonly _instanceSrv;
    private readonly _renderManagerService;
    private readonly _docSkeletonManagerService;
    private readonly _docSelectionRenderService;
    private readonly _localeService;
    private readonly _componentManager;
    private _loadedMap;
    constructor(_context: IRenderContext<DocumentDataModel>, _commandService: ICommandService, _editorService: IEditorService, _instanceSrv: IUniverInstanceService, _renderManagerService: IRenderManagerService, _docSkeletonManagerService: DocSkeletonManagerService, _docSelectionRenderService: DocSelectionRenderService, _localeService: LocaleService, _componentManager: ComponentManager);
    private _initialize;
    dispose(): void;
    private _listenSwitchMode;
    private _initCustomComponents;
    private _init;
    private _initialMain;
    private _getTransformCoordForDocumentOffset;
    private _drawHeaderFooterLabel;
    private _isEditorReadOnly;
    private _isTraditionalMode;
}
