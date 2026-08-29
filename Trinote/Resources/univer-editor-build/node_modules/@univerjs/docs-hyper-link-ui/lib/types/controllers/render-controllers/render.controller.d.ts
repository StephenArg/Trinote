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
import { DocInterceptorService } from '@univerjs/docs';
import { DocRenderController } from '@univerjs/docs-ui';
import { DocHyperLinkPopupService } from '../../services/hyper-link-popup.service';
export declare class DocHyperLinkRenderController extends Disposable implements IRenderModule {
    private readonly _context;
    private readonly _docInterceptorService;
    private readonly _hyperLinkService;
    private readonly _docRenderController;
    constructor(_context: IRenderContext<DocumentDataModel>, _docInterceptorService: DocInterceptorService, _hyperLinkService: DocHyperLinkPopupService, _docRenderController: DocRenderController);
    private _init;
    private _initReRender;
}
