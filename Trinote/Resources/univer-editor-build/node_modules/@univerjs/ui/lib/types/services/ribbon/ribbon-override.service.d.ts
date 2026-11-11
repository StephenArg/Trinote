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
import type { Injector } from '@univerjs/core';
import type { Observable } from 'rxjs';
import type { IRibbonService } from './ribbon.service';
import { Disposable } from '@univerjs/core';
export interface IRibbonOverride {
    id: string;
    ribbonService: IRibbonService;
    injector?: Pick<Injector, 'get' | 'has' | 'invoke'>;
    portalContainer?: HTMLElement | null;
    placeholderTitle?: string;
    hideToolbar?: boolean;
}
export interface IRibbonOverrideService {
    readonly override$: Observable<IRibbonOverride | null>;
    getOverride(): IRibbonOverride | null;
    activate(override: IRibbonOverride): void;
    clear(id?: string): void;
}
export declare const IRibbonOverrideService: import("@wendellhu/redi").IdentifierDecorator<IRibbonOverrideService>;
export declare class RibbonOverrideService extends Disposable implements IRibbonOverrideService {
    private readonly _override$;
    readonly override$: Observable<IRibbonOverride | null>;
    getOverride(): IRibbonOverride | null;
    activate(override: IRibbonOverride): void;
    clear(id?: string): void;
    dispose(): void;
}
