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
import type { IDisposable, IPosition, Nullable } from '@univerjs/core';
import type { Observable } from 'rxjs';
export interface ICellEditorManagerParam extends Partial<IPosition> {
    show: boolean;
}
export interface ICellEditorBoundingClientRect {
    left: number;
    top: number;
    width: number;
    height: number;
}
export interface ICellEditorManagerService {
    state$: Observable<Nullable<ICellEditorManagerParam>>;
    rect$: Observable<Nullable<ICellEditorBoundingClientRect>>;
    focus$: Observable<boolean>;
    dispose(): void;
    setState(param: ICellEditorManagerParam): void;
    getState(): Readonly<Nullable<ICellEditorManagerParam>>;
    setRect(param: ICellEditorBoundingClientRect): void;
    getRect(): Readonly<Nullable<ICellEditorBoundingClientRect>>;
    setFocus(param: boolean): void;
}
export declare class CellEditorManagerService implements ICellEditorManagerService, IDisposable {
    private _state;
    private _rect;
    private readonly _state$;
    readonly state$: Observable<Nullable<ICellEditorManagerParam>>;
    private readonly _rect$;
    readonly rect$: Observable<Nullable<ICellEditorBoundingClientRect>>;
    private _focus;
    private readonly _focus$;
    readonly focus$: Observable<boolean>;
    dispose(): void;
    setState(param: ICellEditorManagerParam): void;
    getRect(): Readonly<Nullable<ICellEditorBoundingClientRect>>;
    setRect(param: ICellEditorBoundingClientRect): void;
    getState(): Readonly<Nullable<ICellEditorManagerParam>>;
    setFocus(param?: boolean): void;
    private _refresh;
}
export declare const ICellEditorManagerService: import("@wendellhu/redi").IdentifierDecorator<ICellEditorManagerService>;
