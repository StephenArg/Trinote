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
import type { IUnitRange, Nullable, Worksheet } from '@univerjs/core';
import type { Observable } from 'rxjs';
import { Disposable, IUniverInstanceService } from '@univerjs/core';
export interface IDefinedNamesServiceParam {
    id: string;
    name: string;
    formulaOrRefString: string;
    comment?: string;
    localSheetId?: string;
    hidden?: boolean;
    formulaOrRefStringWithPrefix?: string;
}
export interface IDefinedNamesServiceFocusParam extends IDefinedNamesServiceParam {
    unitId: string;
}
export interface IDefinedNameMap {
    [unitId: string]: IDefinedNameMapItem;
}
export interface IDefinedNameMapItem {
    [id: string]: IDefinedNamesServiceParam;
}
export interface IDefinedNamesUpdateEvent {
    type: 'update' | 'remove';
    unitId: string;
    definedNames: IDefinedNamesServiceParam[];
}
export interface IDefinedNamesService {
    registerDefinedName(unitId: string, param: IDefinedNamesServiceParam): void;
    registerDefinedNames(unitId: string, params: IDefinedNameMapItem): void;
    getDefinedNameMap(unitId: string): Nullable<IDefinedNameMapItem>;
    getValueByName(unitId: string, name: string): Nullable<IDefinedNamesServiceParam>;
    getValueById(unitId: string, id: string): Nullable<IDefinedNamesServiceParam>;
    removeDefinedName(unitId: string, name: string): void;
    removeUnitDefinedName(unitId: string): void;
    hasDefinedName(unitId: string): boolean;
    setCurrentRange(range: IUnitRange): void;
    getCurrentRange(): IUnitRange;
    getCurrentRangeForString(): string;
    currentRange$: Observable<IUnitRange>;
    update$: Observable<IDefinedNamesUpdateEvent>;
    focusRange$: Observable<IDefinedNamesServiceFocusParam>;
    focusRange(unitId: string, id: string): void;
    getWorksheetByRef(unitId: string, ref: string): Nullable<Worksheet>;
    getAllDefinedNames(): IDefinedNameMap;
    getAllDefinedNamesIsEmpty(): boolean;
    getDefinedNameByRefString(unitId: string, formulaOrRefString: string): Nullable<IDefinedNamesServiceParam>;
}
export declare class DefinedNamesService extends Disposable implements IDefinedNamesService {
    private readonly _univerInstanceService;
    private _definedNameMap;
    private _nameCacheMap;
    private _definedNamesIsEmpty;
    private readonly _update$;
    readonly update$: Observable<IDefinedNamesUpdateEvent>;
    private _currentRange;
    private readonly _currentRange$;
    readonly currentRange$: Observable<IUnitRange>;
    private readonly _focusRange$;
    readonly focusRange$: Observable<IDefinedNamesServiceFocusParam>;
    constructor(_univerInstanceService: IUniverInstanceService);
    dispose(): void;
    getWorksheetByRef(unitId: string, ref: string): Nullable<Worksheet>;
    focusRange(unitId: string, id: string): void;
    setCurrentRange(range: IUnitRange): void;
    getCurrentRange(): IUnitRange;
    getCurrentRangeForString(): string;
    registerDefinedNames(unitId: string, params: IDefinedNameMapItem): void;
    registerDefinedName(unitId: string, param: IDefinedNamesServiceParam): void;
    removeDefinedName(unitId: string, id: string): void;
    removeUnitDefinedName(unitId: string): void;
    getDefinedNameMap(unitId: string): IDefinedNameMapItem;
    getValueByName(unitId: string, name: string): IDefinedNamesServiceParam | null;
    getValueById(unitId: string, id: string): IDefinedNamesServiceParam;
    hasDefinedName(unitId: string): boolean;
    getAllDefinedNames(): IDefinedNameMap;
    getAllDefinedNamesIsEmpty(): boolean;
    getDefinedNameByRefString(unitId: string, formulaOrRefString: string): IDefinedNamesServiceParam | undefined;
    private _update;
    private _updateCache;
    private _isDeepDefinedNameMapEmpty;
}
export declare const IDefinedNamesService: import("@wendellhu/redi").IdentifierDecorator<IDefinedNamesService>;
