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
import { Disposable, ICommandService, IUniverInstanceService } from '@univerjs/core';
import { DocSelectionManagerService } from '@univerjs/docs';
import { IContextMenuService } from '@univerjs/ui';
import { DocEventManagerService } from '../../services/doc-event-manager.service';
/**
 * This controller subscribe to context menu events in sheet rendering views and invoke context menu at a correct
 * position and with correct menu type.
 */
export declare class DocContextMenuRenderController extends Disposable implements IRenderModule {
    private readonly _context;
    private readonly _contextMenuService;
    private readonly _commandService;
    private readonly _docEventManagerService;
    private readonly _docSelectionManagerService;
    private readonly _univerInstanceService;
    constructor(_context: IRenderContext<Workbook>, _contextMenuService: IContextMenuService, _commandService: ICommandService, _docEventManagerService: DocEventManagerService, _docSelectionManagerService: DocSelectionManagerService, _univerInstanceService: IUniverInstanceService);
    private _initPointerDown;
    private _initEditChange;
    private _isSelectionInCodeBlock;
}
