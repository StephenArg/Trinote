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
import type { DocumentDataModel, IInterceptor, Nullable } from '@univerjs/core';
import type { DocumentViewModel, IRenderContext, IRenderModule } from '@univerjs/engine-render';
import { Disposable, DisposableCollection } from '@univerjs/core';
import { DocSkeletonManagerService } from '../doc-skeleton-manager.service';
export declare class DocInterceptorService extends Disposable implements IRenderModule {
    private readonly _context;
    private readonly _docSkeletonManagerService;
    private _interceptorsByName;
    constructor(_context: IRenderContext<DocumentDataModel>, _docSkeletonManagerService: DocSkeletonManagerService);
    intercept<T extends IInterceptor<any, any>>(name: T, interceptor: T): import("@wendellhu/redi").IDisposable;
    fetchThroughInterceptors<T, C>(name: IInterceptor<T, C>): (initValue: Nullable<T>, initContext: C) => Nullable<T>;
    interceptDocumentViewModel(viewModel: DocumentViewModel): DisposableCollection;
}
