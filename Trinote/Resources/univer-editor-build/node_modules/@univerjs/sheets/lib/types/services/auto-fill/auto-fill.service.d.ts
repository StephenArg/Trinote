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
import type { IDisposable, IRange, Nullable } from '@univerjs/core';
import type { Observable } from 'rxjs';
import type { IAutoFillLocation, IAutoFillRule, ISheetAutoFillHook } from './type';
import { Direction, Disposable, ICommandService, Injector, IUndoRedoService, IUniverInstanceService } from '@univerjs/core';
import { AUTO_FILL_APPLY_TYPE } from './type';
export interface IAutoFillService {
    applyType$: Observable<AUTO_FILL_APPLY_TYPE>;
    applyType: AUTO_FILL_APPLY_TYPE;
    direction: Direction;
    menu$: Observable<IApplyMenuItem[]>;
    menu: IApplyMenuItem[];
    showMenu$: Observable<boolean>;
    setShowMenu: (show: boolean) => void;
    setDisableApplyType: (type: AUTO_FILL_APPLY_TYPE, disable: boolean) => void;
    getRules(): IAutoFillRule[];
    isFillingStyle(): boolean;
    autoFillLocation$: Observable<Nullable<IAutoFillLocation>>;
    autoFillLocation: Nullable<IAutoFillLocation>;
    setFillingStyle(isFillingStyle: boolean): void;
    registerRule(rule: IAutoFillRule): void;
    getAllHooks(): ISheetAutoFillHook[];
    getActiveHooks(): ISheetAutoFillHook[];
    addHook(hook: ISheetAutoFillHook): IDisposable;
    fillData(applyType: AUTO_FILL_APPLY_TYPE): boolean;
    triggerAutoFill(unitId: string, subUnitId: string, source: IRange, target: IRange, manualApplyType?: AUTO_FILL_APPLY_TYPE): Promise<boolean>;
}
export interface IApplyMenuItem {
    label: string;
    value: AUTO_FILL_APPLY_TYPE;
    disable: boolean;
}
export declare class AutoFillService extends Disposable implements IAutoFillService {
    private _commandService;
    private _undoRedoService;
    private _univerInstanceService;
    private readonly _injector;
    private _rules;
    private _hooks;
    private readonly _applyType$;
    private _isFillingStyle;
    private _prevUndos;
    private readonly _autoFillLocation$;
    readonly autoFillLocation$: Observable<Nullable<IAutoFillLocation>>;
    private readonly _showMenu$;
    readonly showMenu$: Observable<boolean>;
    private _direction;
    readonly applyType$: Observable<AUTO_FILL_APPLY_TYPE>;
    private readonly _menu$;
    readonly menu$: Observable<IApplyMenuItem[]>;
    constructor(_commandService: ICommandService, _undoRedoService: IUndoRedoService, _univerInstanceService: IUniverInstanceService, _injector: Injector);
    private _init;
    private _getOneByPriority;
    private _initPrevUndo;
    triggerAutoFill(unitId: string, subUnitId: string, source: IRange, selection: IRange, manualApplyType?: AUTO_FILL_APPLY_TYPE): Promise<boolean>;
    addHook(hook: ISheetAutoFillHook): IDisposable;
    registerRule(rule: IAutoFillRule): void;
    getRules(): IAutoFillRule[];
    getAllHooks(): ISheetAutoFillHook[];
    getActiveHooks(): ISheetAutoFillHook[];
    get applyType(): AUTO_FILL_APPLY_TYPE;
    set applyType(type: AUTO_FILL_APPLY_TYPE);
    get menu(): IApplyMenuItem[];
    get direction(): Direction;
    set direction(direction: Direction);
    isFillingStyle(): boolean;
    setFillingStyle(isFillingStyle: boolean): void;
    get autoFillLocation(): Nullable<IAutoFillLocation>;
    set autoFillLocation(location: Nullable<IAutoFillLocation>);
    setDisableApplyType(type: AUTO_FILL_APPLY_TYPE, disable: boolean): void;
    setShowMenu(show: boolean): void;
    fillData(applyType: AUTO_FILL_APPLY_TYPE): boolean;
    private _getAutoHeightUndoRedos;
}
export declare const IAutoFillService: import("@wendellhu/redi").IdentifierDecorator<IAutoFillService>;
