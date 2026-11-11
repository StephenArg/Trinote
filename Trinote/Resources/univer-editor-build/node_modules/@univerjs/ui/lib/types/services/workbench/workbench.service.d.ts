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
import type { IDisposable, UniverInstanceType } from '@univerjs/core';
import type { Observable } from 'rxjs';
import { Disposable, IUniverInstanceService } from '@univerjs/core';
export interface IWorkbenchService {
    readonly rootUnitType$: Observable<UniverInstanceType | null>;
    readonly skeletonVisible$: Observable<boolean>;
    acquireSkeleton(): IDisposable;
}
export declare const IWorkbenchService: import("@wendellhu/redi").IdentifierDecorator<IWorkbenchService>;
export declare class WorkbenchService extends Disposable implements IWorkbenchService {
    private readonly _tokens;
    private readonly _subscriptions;
    private _rootUnitId;
    private readonly _rootUnitType$;
    private readonly _skeletonVisible$;
    readonly rootUnitType$: Observable<UniverInstanceType | null>;
    readonly skeletonVisible$: Observable<boolean>;
    constructor(univerInstanceService: IUniverInstanceService);
    private _setRootUnit;
    acquireSkeleton(): IDisposable;
    dispose(): void;
}
