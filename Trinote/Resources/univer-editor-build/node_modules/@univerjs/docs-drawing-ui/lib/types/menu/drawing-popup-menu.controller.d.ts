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
import { ICommandService, IContextService, IUniverInstanceService, RxDisposable } from '@univerjs/core';
import { DocCanvasPopManagerService } from '@univerjs/docs-ui';
import { IDrawingManagerService } from '@univerjs/drawing';
import { IRenderManagerService } from '@univerjs/engine-render';
export declare class DocDrawingPopupMenuController extends RxDisposable {
    private readonly _drawingManagerService;
    private readonly _canvasPopManagerService;
    private readonly _renderManagerService;
    private readonly _univerInstanceService;
    private readonly _contextService;
    private readonly _commandService;
    private _initImagePopupMenu;
    private _disposePopups;
    private _isDrawingPanelOpen;
    constructor(_drawingManagerService: IDrawingManagerService, _canvasPopManagerService: DocCanvasPopManagerService, _renderManagerService: IRenderManagerService, _univerInstanceService: IUniverInstanceService, _contextService: IContextService, _commandService: ICommandService);
    private _init;
    private _dispose;
    private _clearPopups;
    private _create;
    private _hasCropObject;
    private _popupMenuListener;
    private _getImageMenuItems;
}
