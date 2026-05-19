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
import { ICommandService, IContextService, RxDisposable } from '@univerjs/core';
import { IDocClipboardService } from '../../services/clipboard/clipboard.service';
import { IEditorService } from '../../services/editor/editor-manager.service';
import { DocSelectionRenderService } from '../../services/selection/doc-selection-render.service';
export declare class DocClipboardController extends RxDisposable implements IRenderModule {
    private readonly _context;
    private readonly _commandService;
    private readonly _docClipboardService;
    private readonly _docSelectionRenderService;
    private readonly _contextService;
    private readonly _editorService;
    constructor(_context: IRenderContext<DocumentDataModel>, _commandService: ICommandService, _docClipboardService: IDocClipboardService, _docSelectionRenderService: DocSelectionRenderService, _contextService: IContextService, _editorService: IEditorService);
    private _init;
    private _initLegacyPasteCommand;
}
