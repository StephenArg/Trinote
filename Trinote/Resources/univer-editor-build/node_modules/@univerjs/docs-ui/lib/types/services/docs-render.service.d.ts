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
import { DocumentFlavor, IUniverInstanceService, RxDisposable } from '@univerjs/core';
import { IRenderManagerService } from '@univerjs/engine-render';
export declare function getDocsCanvasBackgroundColor(documentFlavor?: DocumentFlavor): "#fff" | "#fafafa";
export declare class DocsRenderService extends RxDisposable {
    private readonly _instanceSrv;
    private readonly _renderManagerService;
    constructor(_instanceSrv: IUniverInstanceService, _renderManagerService: IRenderManagerService);
    private _init;
    private _createRenderer;
    private _createRenderWithId;
    private _disposeRenderer;
}
