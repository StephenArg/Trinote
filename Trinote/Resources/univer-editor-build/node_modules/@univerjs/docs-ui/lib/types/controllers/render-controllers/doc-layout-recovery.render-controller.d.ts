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
import type { DocumentDataModel, IDisposable } from '@univerjs/core';
import type { IRenderContext, IRenderModule } from '@univerjs/engine-render';
import { RxDisposable } from '@univerjs/core';
import { DocLayoutExecutorService } from '@univerjs/docs';
import { IShortcutService } from '@univerjs/ui';
import { DocCanvasPopManagerService } from '../../services/doc-popup-manager.service';
import { DocSelectionRenderService } from '../../services/selection/doc-selection-render.service';
export declare function acquireDocLayoutRecoveryInteractionLock(canvas: HTMLElement, shortcutService: Pick<IShortcutService, 'forceDisable'>, blurSelection: () => void): IDisposable;
export declare class DocLayoutRecoveryRenderController extends RxDisposable implements IRenderModule {
    private readonly _context;
    private readonly _layoutExecutorService;
    private readonly _docPopupManagerService;
    private readonly _docSelectionRenderService;
    private readonly _shortcutService;
    private _popup;
    private _interactionLock;
    private _visible;
    constructor(_context: IRenderContext<DocumentDataModel>, _layoutExecutorService: DocLayoutExecutorService, _docPopupManagerService: DocCanvasPopManagerService, _docSelectionRenderService: DocSelectionRenderService, _shortcutService: IShortcutService);
    dispose(): void;
    private _show;
    private _hide;
    private _restoreInteraction;
}
