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
import type { IDisposable, Injector, IUniverInstanceService, LifecycleService } from '@univerjs/core';
import type { IRenderManagerService } from '@univerjs/engine-render';
import type { ILayoutService } from '../../services/layout/layout.service';
import { Disposable } from '@univerjs/core';
/**
 * @ignore
 */
export declare abstract class SingleUnitUIController extends Disposable {
    protected readonly _injector: Injector;
    protected readonly _instanceService: IUniverInstanceService;
    protected readonly _layoutService: ILayoutService;
    protected readonly _lifecycleService: LifecycleService;
    protected readonly _renderManagerService: IRenderManagerService;
    protected _steadyTimeout: number;
    protected _renderTimeout: number;
    constructor(_injector: Injector, _instanceService: IUniverInstanceService, _layoutService: ILayoutService, _lifecycleService: LifecycleService, _renderManagerService: IRenderManagerService);
    dispose(): void;
    protected _bootstrapWorkbench(): void;
    private _currentRenderId;
    private _changeRenderUnit;
    abstract bootstrap(callback: (contentElement: HTMLElement, containerElement: HTMLElement) => void): IDisposable;
}
