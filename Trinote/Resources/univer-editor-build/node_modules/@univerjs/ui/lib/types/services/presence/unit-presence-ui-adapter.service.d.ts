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
import { Disposable } from '@univerjs/core';
export interface IUnitPresencePoint {
    x: number;
    y: number;
}
export interface ILocalUnitPresenceState {
    unitId: string;
    subUnitId: string;
    selectedIds: readonly string[];
    focusedId: string | null;
    pointer: IUnitPresencePoint | null;
    shareInterval: number;
}
export interface IRemoteUnitPresenceState extends Omit<ILocalUnitPresenceState, 'shareInterval'> {
    memberId: string;
    color: string;
    name: string;
}
export interface IUnitPresenceUIAdapter {
    readonly unitType: UniverInstanceType;
    readonly presenceKind: string;
    readonly active$: Observable<boolean>;
    readonly localPresence$: Observable<ILocalUnitPresenceState>;
    activate(): IDisposable;
    isActive(): boolean;
    getLocalPresence(unitId: string): ILocalUnitPresenceState | null;
    getRemotePresences$(unitId: string): Observable<ReadonlyMap<string, IRemoteUnitPresenceState>>;
    setRemotePresence(state: IRemoteUnitPresenceState): void;
    removeRemotePresence(unitId: string, memberId: string): void;
    clearRemotePresences(unitId: string): void;
    readonly statusUIPart?: string;
}
export interface IUnitPresenceUIAdapterRegistry {
    readonly adapters$: Observable<readonly IUnitPresenceUIAdapter[]>;
    register(adapter: IUnitPresenceUIAdapter): IDisposable;
    get(unitType: UniverInstanceType): IUnitPresenceUIAdapter | null;
    getAll(): readonly IUnitPresenceUIAdapter[];
}
export declare const IUnitPresenceUIAdapterRegistry: import("@wendellhu/redi").IdentifierDecorator<IUnitPresenceUIAdapterRegistry>;
export declare class UnitPresenceUIAdapterRegistry extends Disposable implements IUnitPresenceUIAdapterRegistry {
    private readonly _adapters;
    private readonly _adapters$;
    readonly adapters$: Observable<readonly IUnitPresenceUIAdapter[]>;
    dispose(): void;
    register(adapter: IUnitPresenceUIAdapter): IDisposable;
    get(unitType: UniverInstanceType): IUnitPresenceUIAdapter | null;
    getAll(): readonly IUnitPresenceUIAdapter[];
    private _emitAdapters;
}
