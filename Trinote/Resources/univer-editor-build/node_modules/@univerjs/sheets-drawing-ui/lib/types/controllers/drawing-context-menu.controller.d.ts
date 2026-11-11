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
import { IUniverInstanceService, RxDisposable } from '@univerjs/core';
import { IDrawingManagerService } from '@univerjs/drawing';
import { IRenderManagerService } from '@univerjs/engine-render';
import { IContextMenuService } from '@univerjs/ui';
import { IDrawingContextMenuService } from '../services/drawing-context-menu.service';
export declare class DrawingContextMenuController extends RxDisposable {
    private readonly _drawingManagerService;
    private readonly _contextMenuService;
    private readonly _renderManagerService;
    private readonly _univerInstanceService;
    private readonly _drawingContextMenuService;
    constructor(_drawingManagerService: IDrawingManagerService, _contextMenuService: IContextMenuService, _renderManagerService: IRenderManagerService, _univerInstanceService: IUniverInstanceService, _drawingContextMenuService: IDrawingContextMenuService);
    private _init;
    private _contextMenuListener;
    private _getContextMenuPosition;
}
