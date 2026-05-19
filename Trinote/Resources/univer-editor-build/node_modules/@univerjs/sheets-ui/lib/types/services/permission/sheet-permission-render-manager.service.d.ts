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
import { Disposable, IConfigService } from '@univerjs/core';
import { IRenderManagerService } from '@univerjs/engine-render';
export type ProtectedRangeShadowStrategy = 'always' | 'non-editable' | 'non-viewable' | 'none';
export interface ISheetPermissionRenderManagerService {
    /**
     * Set the global shadow strategy for protected ranges
     * This will apply to all workbooks
     * @param strategy The shadow strategy
     */
    setProtectedRangeShadowStrategy(strategy: ProtectedRangeShadowStrategy): void;
    /**
     * Get the current global shadow strategy
     */
    getProtectedRangeShadowStrategy(): ProtectedRangeShadowStrategy;
    /**
     * Get an observable of the global shadow strategy
     */
    getProtectedRangeShadowStrategy$(): Observable<ProtectedRangeShadowStrategy>;
}
/**
 * Service to manage the rendering of sheet permissions (range protection shadows)
 * This is a global service that applies the strategy to all workbooks
 */
export declare class SheetPermissionRenderManagerService extends Disposable implements ISheetPermissionRenderManagerService {
    private readonly _configService;
    private readonly _renderManagerService;
    private _currentStrategy;
    private _strategySubject;
    constructor(_configService: IConfigService, _renderManagerService: IRenderManagerService);
    private _updateAllWorkbooks;
    setProtectedRangeShadowStrategy(strategy: ProtectedRangeShadowStrategy): void;
    getProtectedRangeShadowStrategy(): ProtectedRangeShadowStrategy;
    getProtectedRangeShadowStrategy$(): Observable<ProtectedRangeShadowStrategy>;
    dispose(): void;
}
