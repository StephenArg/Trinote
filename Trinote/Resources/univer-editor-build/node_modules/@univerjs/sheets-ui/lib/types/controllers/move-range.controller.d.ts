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
import type { Workbook } from '@univerjs/core';
import type { IRenderContext, IRenderModule } from '@univerjs/engine-render';
import { Disposable, ICommandService } from '@univerjs/core';
import { SheetsSelectionsService } from '@univerjs/sheets';
import { ISheetSelectionRenderService } from '../services/selection/base-selection-render.service';
export declare class MoveRangeRenderController extends Disposable implements IRenderModule {
    private readonly _context;
    private readonly _selectionRenderService;
    private readonly _selectionManagerService;
    private readonly _commandService;
    private _disposableCollection;
    constructor(_context: IRenderContext<Workbook>, _selectionRenderService: ISheetSelectionRenderService, _selectionManagerService: SheetsSelectionsService, _commandService: ICommandService);
    dispose(): void;
    private _initialize;
}
