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
import { Disposable, ICommandService, IContextService, LocaleService } from '@univerjs/core';
import { DocSelectionManagerService } from '@univerjs/docs';
import { IDocDrawingService } from '@univerjs/docs-drawing';
import { DocSelectionRenderService } from '@univerjs/docs-ui';
import { IDrawingManagerService, IImageIoService } from '@univerjs/drawing';
import { IRenderManagerService } from '@univerjs/engine-render';
import { ILocalFileService, IMessageService } from '@univerjs/ui';
import { DocRefreshDrawingsService } from '../../services/doc-refresh-drawings.service';
export declare class DocDrawingUpdateRenderController extends Disposable implements IRenderModule {
    private readonly _context;
    private readonly _commandService;
    private readonly _docSelectionManagerService;
    private readonly _renderManagerSrv;
    private readonly _imageIoService;
    private readonly _docDrawingService;
    private readonly _drawingManagerService;
    private readonly _contextService;
    private readonly _messageService;
    private readonly _localeService;
    private readonly _docSelectionRenderService;
    private readonly _docRefreshDrawingsService;
    private readonly _fileOpenerService;
    constructor(_context: IRenderContext<DocumentDataModel>, _commandService: ICommandService, _docSelectionManagerService: DocSelectionManagerService, _renderManagerSrv: IRenderManagerService, _imageIoService: IImageIoService, _docDrawingService: IDocDrawingService, _drawingManagerService: IDrawingManagerService, _contextService: IContextService, _messageService: IMessageService, _localeService: LocaleService, _docSelectionRenderService: DocSelectionRenderService, _docRefreshDrawingsService: DocRefreshDrawingsService, _fileOpenerService: ILocalFileService);
    dispose(): void;
    insertDocImage(): Promise<boolean>;
    private _insertFloatImages;
    private _isInsertInHeaderFooter;
    private _getImagePosition;
    private _getCurrentImageInsertPosition;
    private _updateOrderListener;
    private _groupDrawingListener;
    private _getCurrentSceneAndTransformer;
    private _transformDrawingListener;
    private _focusDrawingListener;
    private _findSegmentIdByDrawingId;
    private _updateDrawingsEditStatus;
    private _editAreaChangeListener;
    private _setDrawingSelections;
}
