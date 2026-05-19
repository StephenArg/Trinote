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
import type { IDisposable } from '@univerjs/core';
import { IContextService, IUniverInstanceService, RxDisposable, ThemeService } from '@univerjs/core';
import { IRenderManagerService } from '@univerjs/engine-render';
/**
 * This controller is responsible for managing units of a specific kind (UniverSheet) to be rendered on the canvas.
 */
export declare class SheetsRenderService extends RxDisposable {
    private readonly _contextService;
    private readonly _instanceSrv;
    private readonly _renderManagerService;
    private readonly _themeService;
    private _skeletonChangeMutations;
    constructor(_contextService: IContextService, _instanceSrv: IUniverInstanceService, _renderManagerService: IRenderManagerService, _themeService: ThemeService);
    /**
     * Register a mutation id that will trigger the skeleton change.
     *
     * @param mutationId the id of the mutation
     * @returns a disposable to unregister the mutation
     */
    registerSkeletonChangingMutations(mutationId: string): IDisposable;
    /**
     * Examine if a mutation would make the skeleton to change.
     */
    checkMutationShouldTriggerRerender(id: string): boolean;
    private _init;
    private _initWorkbookListener;
    private _createRenderer;
    private _disposeRenderer;
    private _initContextListener;
}
