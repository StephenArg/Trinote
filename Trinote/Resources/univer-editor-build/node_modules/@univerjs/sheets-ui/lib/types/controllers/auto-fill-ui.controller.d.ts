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
import { IRenderManagerService } from '@univerjs/engine-render';
import { AutoFillController, IAutoFillService } from '@univerjs/sheets';
import { IEditorBridgeService } from '../services/editor-bridge.service';
import { SheetsRenderService } from '../services/sheets-render.service';
export declare class AutoFillUIController extends Disposable {
    private readonly _univerInstanceService;
    private readonly _commandService;
    private readonly _autoFillService;
    private _autoFillController;
    private readonly _editorBridgeService;
    private readonly _renderManagerService;
    private _sheetsRenderService;
    private _currentLocation;
    constructor(_univerInstanceService: IUniverInstanceService, _commandService: ICommandService, _autoFillService: IAutoFillService, _autoFillController: AutoFillController, _editorBridgeService: IEditorBridgeService, _renderManagerService: IRenderManagerService, _sheetsRenderService: SheetsRenderService);
    private _init;
    private _initSkeletonChange;
    private _initDefaultHook;
    private _initQuitListener;
    private _quit;
    private _initSelectionControlFillChanged;
    private _handleDbClickFill;
    private _detectFillRange;
}
