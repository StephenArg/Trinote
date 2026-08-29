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
import type { IRenderContext, IRenderModule } from '@univerjs/engine-render';
import { Disposable } from '@univerjs/core';
import { IDrawingManagerService } from '@univerjs/drawing';
import { SheetSkeletonService } from '@univerjs/sheets';
import { ISheetDrawingService } from '@univerjs/sheets-drawing';
export declare class SheetsDrawingRenderController extends Disposable implements IRenderModule {
    private _context;
    private readonly _sheetDrawingService;
    private readonly _drawingManagerService;
    private readonly _sheetSkeletonService;
    constructor(_context: IRenderContext, _sheetDrawingService: ISheetDrawingService, _drawingManagerService: IDrawingManagerService, _sheetSkeletonService: SheetSkeletonService);
    private _init;
    private _drawingInitializeListener;
}
