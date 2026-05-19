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
import { IUniverInstanceService, LocaleService, RxDisposable } from '@univerjs/core';
import { DocumentSkeleton, DocumentViewModel } from '@univerjs/engine-render';
/**
 * This service is for document build and manage doc skeletons. It also manages
 * DocumentViewModels.
 */
export declare class DocSkeletonManagerService extends RxDisposable implements IRenderModule {
    private readonly _context;
    private readonly _localeService;
    private readonly _univerInstanceService;
    private _skeleton;
    private _docViewModel;
    private readonly _currentSkeleton$;
    readonly currentSkeleton$: import("rxjs").Observable<Nullable<DocumentSkeleton>>;
    private readonly _currentSkeletonBefore$;
    readonly currentSkeletonBefore$: import("rxjs").Observable<Nullable<DocumentSkeleton>>;
    private readonly _currentViewModel$;
    readonly currentViewModel$: import("rxjs").Observable<Nullable<DocumentViewModel>>;
    constructor(_context: IRenderContext<DocumentDataModel>, _localeService: LocaleService, _univerInstanceService: IUniverInstanceService);
    dispose(): void;
    getSkeleton(): DocumentSkeleton;
    getViewModel(): DocumentViewModel;
    private _init;
    private _update;
    private _buildSkeleton;
    private _buildDocViewModel;
}
