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
import { Disposable } from '@univerjs/core';
import { CellPopupManagerService } from '../services/cell-popup-manager.service';
import { IEditorBridgeService } from '../services/editor-bridge.service';
/**
 * Controller to hide cell popups when entering edit mode.
 * This ensures that popups don't overlap with the cell editor.
 */
export declare class CellPopupEditorController extends Disposable implements IRenderModule {
    private readonly _context;
    private readonly _editorBridgeService;
    private readonly _cellPopupManagerService;
    constructor(_context: IRenderContext<Workbook>, _editorBridgeService: IEditorBridgeService, _cellPopupManagerService: CellPopupManagerService);
    private _initEditorVisibleListener;
}
