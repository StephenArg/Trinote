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
import { Disposable, ICommandService, IUniverInstanceService } from '@univerjs/core';
import { IDocDrawingService } from '@univerjs/docs-drawing';
import { IDrawingManagerService } from '@univerjs/drawing';
import { IRenderManagerService } from '@univerjs/engine-render';
export declare class DocDrawingAddRemoveController extends Disposable {
    private readonly _univerInstanceService;
    private readonly _commandService;
    private readonly _drawingManagerService;
    private readonly _docDrawingService;
    private readonly _renderManagerService;
    constructor(_univerInstanceService: IUniverInstanceService, _commandService: ICommandService, _drawingManagerService: IDrawingManagerService, _docDrawingService: IDocDrawingService, _renderManagerService: IRenderManagerService);
    private _initialize;
    private _commandExecutedListener;
    private _addDrawings;
    private _removeDrawings;
    private _updateDrawingsOrder;
}
