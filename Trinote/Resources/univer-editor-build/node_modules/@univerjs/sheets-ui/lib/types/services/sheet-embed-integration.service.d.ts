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
import { Subject } from 'rxjs';
export declare const SHEET_EMBED_INTERACTION_BOUNDARY_OWNER_ATTRIBUTE = "data-embed-interaction-boundary-owner";
export declare const SHEET_EMBED_RUNTIME_FOCUS_ROLE_ATTRIBUTE = "data-embed-runtime-focus-role";
export declare const EMBED_INTERACTION_BOUNDARY_OWNER_ATTRIBUTE = "data-embed-interaction-boundary-owner";
export declare const EMBED_RUNTIME_FOCUS_ROLE_ATTRIBUTE = "data-embed-runtime-focus-role";
export declare const SHEET_EMBED_FLOAT_DOM_ATTRIBUTE = "data-embed-float-dom";
export declare const SHEET_EMBED_ID_ATTRIBUTE = "data-embed-id";
export declare const SHEET_EMBED_HOST_UNIT_ID_ATTRIBUTE = "data-embed-host-unit-id";
export declare const SHEET_EMBED_CHILD_UNIT_ID_ATTRIBUTE = "data-embed-child-unit-id";
export declare const SHEET_EMBED_CHILD_TYPE_ATTRIBUTE = "data-embed-child-type";
export type SheetEmbedRuntimeSessionMode = 'host-passive' | 'child-keyboard' | 'child-fullscreen' | 'child-tab';
export interface ISheetEmbedRuntimeDomScope {
    embedId: string;
    hostUnitId?: string;
    childUnitId?: string;
    childType?: UniverInstanceType;
    sessionMode?: SheetEmbedRuntimeSessionMode;
}
export interface ISheetEmbedInteractionBoundaryService {
    registerOwnedElement(embedId: string, element: HTMLElement): IDisposable;
}
export declare const ISheetEmbedInteractionBoundaryService: import("@wendellhu/redi").IdentifierDecorator<ISheetEmbedInteractionBoundaryService>;
export interface ISheetEmbedRuntimeFocusCoordinator {
    readonly runtimeSessionChanged$: Observable<void>;
    acquireLease(options: {
        embedId: string;
        role: string;
        owner?: string;
        hostUnitId?: string;
        childUnitId?: string;
        childType?: UniverInstanceType;
        associatedChildUnitIds?: string[];
        sessionMode?: SheetEmbedRuntimeSessionMode;
    }): IDisposable;
    registerElement(options: {
        embedId: string;
        role: string;
        element: HTMLElement;
    }): IDisposable;
    resolveRuntimeScopeByChildUnitId(childUnitId: string | undefined): ISheetEmbedRuntimeDomScope | undefined;
    resolveActiveChildSessionRuntimeScope(): ISheetEmbedRuntimeDomScope | undefined;
    isChildUnitInActiveSession(unitId: string | undefined): boolean;
    isChildUnitRuntimeEvent(unitId: string | undefined, target: EventTarget | null | undefined, event?: Event): boolean;
}
export declare const ISheetEmbedRuntimeFocusCoordinator: import("@wendellhu/redi").IdentifierDecorator<ISheetEmbedRuntimeFocusCoordinator>;
export interface ISheetEmbedFloatingGeometryService {
    readonly geometryInvalidated$: Observable<unknown>;
    getRegistrationByChildUnitId(childUnitId: string): {
        root: HTMLElement;
        viewport?: HTMLElement | null;
        contentRoot?: HTMLElement | null;
    } | undefined;
}
export declare const ISheetEmbedFloatingGeometryService: import("@wendellhu/redi").IdentifierDecorator<ISheetEmbedFloatingGeometryService>;
export declare class EmbedInteractionBoundaryService implements ISheetEmbedInteractionBoundaryService {
    private readonly _roots;
    registerOwnedElement(embedId: string, element: HTMLElement): IDisposable;
    contains(embedId: string | undefined, target: EventTarget | null | undefined): boolean;
    private _mark;
}
export declare class EmbedRuntimeFocusCoordinator implements ISheetEmbedRuntimeFocusCoordinator {
    private readonly _leases;
    private readonly _elements;
    readonly runtimeSessionChanged$: Subject<void>;
    acquireLease(options: {
        embedId: string;
        role: string;
        owner?: string;
        childUnitId?: string;
        hostUnitId?: string;
        childType?: UniverInstanceType;
        associatedChildUnitIds?: string[];
        sessionMode?: SheetEmbedRuntimeSessionMode;
    }): IDisposable;
    registerElement(options: {
        embedId: string;
        role: string;
        element: HTMLElement;
    }): IDisposable;
    containsElement(embedId: string, element: HTMLElement | null | undefined): boolean;
    registerRuntimeScope(options: {
        embedId: string;
        hostUnitId?: string;
        childUnitId?: string;
        childType?: UniverInstanceType;
        sessionMode?: SheetEmbedRuntimeSessionMode;
    }): IDisposable;
    hasChildInteractionLease(embedId: string | undefined): boolean;
    hasHostPreservingChildFocusLeaseForHost(hostUnitId: string | undefined): boolean;
    resolveRuntimeScopeByChildUnitId(childUnitId: string | undefined): ISheetEmbedRuntimeDomScope | undefined;
    resolveActiveChildSessionRuntimeScope(): ISheetEmbedRuntimeDomScope | undefined;
    isChildUnitInActiveSession(unitId: string | undefined): boolean;
    isChildUnitRuntimeEvent(unitId: string | undefined, target: EventTarget | null | undefined): boolean;
}
export declare class EmbedFloatingGeometryService implements ISheetEmbedFloatingGeometryService {
    private readonly _registrations;
    private readonly _geometryInvalidated$;
    readonly geometryInvalidated$: Observable<unknown>;
    register(registration: {
        embedId: string;
        childUnitId?: string;
        root: HTMLElement;
        viewport?: HTMLElement | null;
        contentRoot?: HTMLElement | null;
    }): IDisposable;
    getRegistrationByChildUnitId(childUnitId: string): {
        childUnitId?: string;
        root: HTMLElement;
        viewport?: HTMLElement | null;
        contentRoot?: HTMLElement | null;
    } | undefined;
}
export declare function resolveSheetEmbedRuntimeDomScope(element: HTMLElement | null | undefined): ISheetEmbedRuntimeDomScope | undefined;
export declare function resolveActiveSheetEmbedRuntimeDomScope(ownerDocument?: Document): ISheetEmbedRuntimeDomScope | undefined;
