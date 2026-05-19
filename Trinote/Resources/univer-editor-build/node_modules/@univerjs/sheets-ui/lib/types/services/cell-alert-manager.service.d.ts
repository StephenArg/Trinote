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
import { Disposable } from '@univerjs/core';
import { IRenderManagerService } from '@univerjs/engine-render';
import { CellPopupManagerService } from './cell-popup-manager.service';
export declare enum CellAlertType {
    INFO = 0,
    WARNING = 1,
    ERROR = 2
}
export interface ICellAlert {
    type: CellAlertType;
    title: React.ReactNode;
    message: React.ReactNode;
    location: ISheetLocationBase;
    width: number;
    height: number;
    key: string;
}
export declare class CellAlertManagerService extends Disposable {
    private readonly _renderManagerService;
    private readonly _cellPopupManagerService;
    private _currentAlert$;
    private _currentAlert;
    get currentAlert(): Map<string, {
        alert: ICellAlert;
        dispose: IDisposable;
    }>;
    currentAlert$: import("rxjs").Observable<[string, {
        alert: ICellAlert;
        dispose: IDisposable;
    }][]>;
    constructor(_renderManagerService: IRenderManagerService, _cellPopupManagerService: CellPopupManagerService);
    showAlert(alert: ICellAlert): void;
    removeAlert(key: string): void;
    clearAlert(): void;
}
