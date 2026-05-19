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
import type { DocumentDataModel, Nullable } from '@univerjs/core';
import type { IRenderContext, IRenderModule } from '@univerjs/engine-render';
import { IUniverInstanceService, RxDisposable } from '@univerjs/core';
import { DocumentViewModel } from '@univerjs/engine-render';
export interface IDocumentViewModelManagerParam {
    unitId: string;
    docViewModel: DocumentViewModel;
}
/**
 * The view model manager is used to manage Doc view model. Each view model has a one-to-one correspondence
 * with the doc skeleton.
 */
export declare class DocViewModelManagerService extends RxDisposable implements IRenderModule {
    private readonly _context;
    private readonly _univerInstanceService;
    private _docViewModelMap;
    private readonly _currentDocViewModel$;
    readonly currentDocViewModel$: import("rxjs").Observable<Nullable<IDocumentViewModelManagerParam>>;
    private readonly _docViewModelAdd$;
    readonly docViewModelAdd$: import("rxjs").Observable<DocumentViewModel>;
    constructor(_context: IRenderContext<DocumentDataModel>, _univerInstanceService: IUniverInstanceService);
    private _initialize;
    dispose(): void;
    private _init;
    private _create;
    getAllModel(): Map<string, IDocumentViewModelManagerParam>;
    getViewModel(unitId: string): DocumentViewModel | undefined;
    private _setCurrent;
    private _buildDocViewModel;
}
