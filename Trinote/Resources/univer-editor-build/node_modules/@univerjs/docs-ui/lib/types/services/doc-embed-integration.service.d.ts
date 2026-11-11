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
import type { Observable } from 'rxjs';
import { Subject } from 'rxjs';
export declare const DOC_EMBED_INTERACTION_BOUNDARY_OWNER_ATTRIBUTE = "data-embed-interaction-boundary-owner";
export declare const EMBED_INTERACTION_BOUNDARY_OWNER_ATTRIBUTE = "data-embed-interaction-boundary-owner";
export interface IDocEmbedInteractionBoundaryService {
    contains(embedId: string | undefined, target: EventTarget | null | undefined, event?: Event): boolean;
    hasRecentInteraction(ownerDocument?: Document): boolean;
    hasRecentInteractionFor?(embedId: string | undefined, ownerDocument?: Document): boolean;
}
export interface IDocEmbedRuntimeFocusCoordinator {
    readonly runtimeSessionChanged$: Observable<void>;
    isChildUnitRuntimeEvent(unitId: string | undefined, target: EventTarget | null | undefined, event?: Event): boolean;
    isChildUnitInActiveSession(unitId: string | undefined): boolean;
    shouldSuppressHostInteraction(unitId: string | undefined, target?: EventTarget | null, event?: Event): boolean;
}
export declare class EmbedInteractionBoundaryService implements IDocEmbedInteractionBoundaryService {
    private readonly _roots;
    registerOwnedElement(embedId: string, element: HTMLElement): IDisposable;
    contains(embedId: string | undefined, target: EventTarget | null | undefined): boolean;
    hasRecentInteraction(): boolean;
    hasRecentInteractionFor(): boolean;
}
export declare const IDocEmbedInteractionBoundaryService: typeof EmbedInteractionBoundaryService;
export declare class EmbedRuntimeFocusCoordinator implements IDocEmbedRuntimeFocusCoordinator {
    private readonly _leases;
    private readonly _elements;
    readonly runtimeSessionChanged$: Subject<void>;
    acquireLease(options: {
        embedId?: string;
        role: string;
        owner?: string;
        childUnitId?: string;
        hostUnitId?: string;
    }): IDisposable;
    registerElement(options: {
        embedId: string;
        role: string;
        element: HTMLElement;
    }): IDisposable;
    registerRuntimeScope(_options: {
        embedId: string;
        hostUnitId?: string;
        childUnitId?: string;
    }): IDisposable;
    isChildUnitRuntimeEvent(_unitId: string | undefined, target: EventTarget | null | undefined): boolean;
    isChildUnitInActiveSession(unitId: string | undefined): boolean;
    shouldSuppressHostInteraction(unitId: string | undefined, target?: EventTarget | null): boolean;
}
export declare const IDocEmbedRuntimeFocusCoordinator: typeof EmbedRuntimeFocusCoordinator;
