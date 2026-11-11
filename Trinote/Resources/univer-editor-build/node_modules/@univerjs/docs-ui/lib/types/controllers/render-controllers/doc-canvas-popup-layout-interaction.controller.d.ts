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
import type { DocumentDataModel } from '@univerjs/core';
import type { IRenderContext, IRenderModule } from '@univerjs/engine-render';
import { Disposable } from '@univerjs/core';
import { DocLayoutInteractionService } from '../../services/doc-layout-interaction.service';
import { DocCanvasPopManagerService } from '../../services/doc-popup-manager.service';
/** Keeps a document skeleton stable while one of its canvas popups is mounted. */
export declare class DocCanvasPopupLayoutInteractionController extends Disposable implements IRenderModule {
    private readonly _context;
    private readonly _canvasPopupManagerService;
    private readonly _docLayoutInteractionService;
    private _layoutInteraction;
    constructor(_context: Pick<IRenderContext<DocumentDataModel>, 'unitId'>, _canvasPopupManagerService: Pick<DocCanvasPopManagerService, 'popupUnits$'>, _docLayoutInteractionService: DocLayoutInteractionService);
    dispose(): void;
    private _endInteraction;
}
