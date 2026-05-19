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
import type { ISheetLocationBase } from '@univerjs/sheets';
import type { ICanvasPopup } from './canvas-pop-manager.service';
import { Disposable } from '@univerjs/core';
import { SheetCanvasPopManagerService } from './canvas-pop-manager.service';
export interface ICellPopup extends Omit<ICanvasPopup, 'direction' | 'offset' | 'mask'> {
    direction?: 'horizontal' | 'vertical';
    id?: string;
    priority: number;
}
export interface ICellPopupDirectionCache {
    popups: ICellPopup[];
    disposable?: IDisposable;
}
export interface ICellPopupCache {
    horizontal?: ICellPopupDirectionCache;
    vertical?: ICellPopupDirectionCache;
}
export interface ICellPopupChange extends ISheetLocationBase {
    direction: 'horizontal' | 'vertical';
}
export declare class CellPopupManagerService extends Disposable {
    private readonly _sheetCanvasPopManagerService;
    private readonly _cellPopupMap;
    private readonly _change$;
    readonly change$: import("rxjs").Observable<ICellPopupChange>;
    constructor(_sheetCanvasPopManagerService: SheetCanvasPopManagerService);
    private _ensureCellPopupMap;
    showPopup(location: ISheetLocationBase, popup: ICellPopup): IDisposable;
    getPopups(unitId: string, subUnitId: string, row: number, col: number, direction: 'horizontal' | 'vertical'): ICellPopup[];
    hidePopup(unitId: string, subUnitId: string, row: number, col: number): void;
}
