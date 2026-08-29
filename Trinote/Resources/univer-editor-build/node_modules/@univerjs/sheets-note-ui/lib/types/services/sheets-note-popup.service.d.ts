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
import type { Nullable } from '@univerjs/core';
import type { ISheetLocationBase } from '@univerjs/sheets';
import { Disposable } from '@univerjs/core';
import { CellPopupManagerService } from '@univerjs/sheets-ui';
import { IZenZoneService } from '@univerjs/ui';
interface INotePopup extends ISheetLocationBase {
    noteId?: string;
    temp?: boolean;
    trigger?: string;
}
export declare class SheetsNotePopupService extends Disposable {
    private readonly _zenZoneService;
    private readonly _cellPopupManagerService;
    private _lastPopup;
    private _activePopup;
    private _activePopup$;
    activePopup$: import("rxjs").Observable<Nullable<INotePopup>>;
    get activePopup(): Nullable<INotePopup>;
    constructor(_zenZoneService: IZenZoneService, _cellPopupManagerService: CellPopupManagerService);
    private _initZenVisible;
    dispose(): void;
    showPopup(location: INotePopup, onHide?: () => void): void;
    hidePopup(force?: boolean): void;
    persistPopup(): void;
}
export {};
