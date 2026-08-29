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
import { Disposable, ICommandService, IResourceManagerService, IUniverInstanceService } from '@univerjs/core';
import { IDrawingManagerService } from '@univerjs/drawing';
import { SheetInterceptorService } from '@univerjs/sheets';
import { ISheetDrawingService } from '../services/sheet-drawing.service';
export declare const SHEET_DRAWING_PLUGIN = "SHEET_DRAWING_PLUGIN";
export declare class SheetsDrawingLoadController extends Disposable {
    private _sheetInterceptorService;
    private _univerInstanceService;
    private readonly _commandService;
    private readonly _sheetDrawingService;
    private readonly _drawingManagerService;
    private _resourceManagerService;
    constructor(_sheetInterceptorService: SheetInterceptorService, _univerInstanceService: IUniverInstanceService, _commandService: ICommandService, _sheetDrawingService: ISheetDrawingService, _drawingManagerService: IDrawingManagerService, _resourceManagerService: IResourceManagerService);
    private _initCommands;
    private _initSnapshot;
    private _initSheetChange;
}
