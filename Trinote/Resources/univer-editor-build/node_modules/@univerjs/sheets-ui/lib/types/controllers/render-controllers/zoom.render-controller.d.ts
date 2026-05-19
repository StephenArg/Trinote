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
import { Disposable, ICommandService, IContextService } from '@univerjs/core';
import { IEditorBridgeService } from '../../services/editor-bridge.service';
import { SheetSkeletonManagerService } from '../../services/sheet-skeleton-manager.service';
/**
 * Zoom render controller, registered in a render module.
 */
export declare class SheetsZoomRenderController extends Disposable implements IRenderModule {
    private readonly _context;
    private readonly _sheetSkeletonManagerService;
    private readonly _commandService;
    private readonly _contextService;
    private readonly _editorBridgeService?;
    constructor(_context: IRenderContext<Workbook>, _sheetSkeletonManagerService: SheetSkeletonManagerService, _commandService: ICommandService, _contextService: IContextService, _editorBridgeService?: IEditorBridgeService | undefined);
    updateZoom(worksheetId: string, zoomRatio: number): boolean;
    private _initZoomEventListener;
    private _zoom;
    private _initSkeletonListener;
    /**
     * Triggered when zoom and switch sheet.
     * @param zoomRatio
     */
    private _updateViewZoom;
}
