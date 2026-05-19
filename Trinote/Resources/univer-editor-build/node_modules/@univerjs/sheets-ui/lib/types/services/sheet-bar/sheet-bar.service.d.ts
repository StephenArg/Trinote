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
import type { IScrollState } from '../../views/sheet-bar/sheet-bar-tabs/utils/slide-tab-bar';
import { Disposable } from '@univerjs/core';
export interface ISheetBarMenuHandler {
    handleSheetBarMenu(): void;
}
export interface ISheetBarService {
    renameId$: Observable<string>;
    removeId$: Observable<string>;
    scroll$: Observable<IScrollState>;
    scrollX$: Observable<number>;
    addSheet$: Observable<number>;
    setRenameId(id: string): void;
    setRemoveId(id: string): void;
    setScroll(state: IScrollState): void;
    setScrollX(x: number): void;
    setAddSheet(index: number): void;
    triggerSheetBarMenu(): void;
    registerSheetBarMenuHandler(handler: ISheetBarMenuHandler): IDisposable;
}
export declare const ISheetBarService: import("@wendellhu/redi").IdentifierDecorator<ISheetBarService>;
export declare class SheetBarService extends Disposable implements ISheetBarService {
    readonly renameId$: Observable<string>;
    readonly removeId$: Observable<string>;
    readonly scroll$: Observable<IScrollState>;
    readonly scrollX$: Observable<number>;
    readonly addSheet$: Observable<number>;
    private readonly _renameId$;
    private readonly _removeId$;
    private readonly _scroll$;
    private readonly _scrollX$;
    private readonly _addSheet$;
    private _currentHandler;
    constructor();
    setRenameId(renameId: string): void;
    setRemoveId(removeId: string): void;
    setScroll(state: IScrollState): void;
    setScrollX(x: number): void;
    setAddSheet(index: number): void;
    triggerSheetBarMenu(): void;
    registerSheetBarMenuHandler(handler: ISheetBarMenuHandler): IDisposable;
}
