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
import type { Observable } from 'rxjs';
import { Disposable } from '../../shared/lifecycle';
import { ILogService } from '../log/log.service';
import { LifecycleStages } from './lifecycle';
/**
 * An error that indicates a lifecycle stage will never be reached, mostly due to the Univer instance is
 * disposed.
 */
export declare class LifecycleUnreachableError extends Error {
    constructor(stage: LifecycleStages);
}
/**
 * This service controls the lifecycle of a Univer instance. Other modules can
 * inject this service to read the current lifecycle stage or subscribe to
 * lifecycle changes.
 */
export declare class LifecycleService extends Disposable {
    private readonly _logService;
    private _lifecycle$;
    readonly lifecycle$: Observable<LifecycleStages>;
    private _lock;
    constructor(_logService: ILogService);
    get stage(): LifecycleStages;
    set stage(stage: LifecycleStages);
    dispose(): void;
    /**
     * Wait for a specific lifecycle stage to be reached.
     * @param stage The lifecycle stage to wait for.
     * If the current stage is already at or beyond the specified stage, it will
     * resolve immediately.
     * If the specified stage is unreachable, it will reject with a
     * `LifecycleUnreachableError`.
     * @returns A promise that resolves when the specified stage is reached.
     */
    onStage(stage: LifecycleStages): Promise<void>;
    /**
     * Subscribe to lifecycle changes and all previous stages and the current
     * stage will be emitted immediately.
     * @returns An observable that emits the lifecycle stages, including the current
     */
    subscribeWithPrevious(): Observable<LifecycleStages>;
    private _reportProgress;
}
export declare function getLifecycleStagesAndBefore(lifecycleStage: LifecycleStages): Observable<LifecycleStages>;
