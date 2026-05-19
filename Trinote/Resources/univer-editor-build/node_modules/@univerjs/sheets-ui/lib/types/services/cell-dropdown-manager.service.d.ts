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
import type { ISheetLocation } from '@univerjs/sheets';
import type { ICellDropdown } from '../views/dropdown';
import { Disposable } from '@univerjs/core';
import { IRenderManagerService } from '@univerjs/engine-render';
import { ComponentManager, IZenZoneService } from '@univerjs/ui';
import { SheetCanvasPopManagerService } from './canvas-pop-manager.service';
export type IDropdownParam = {
    location: ISheetLocation;
    onHide?: () => void;
    closeOnOutSide?: boolean;
} & ICellDropdown;
export interface IDropdownComponentProps {
    componentKey: string;
    location: ISheetLocation;
    hideFn: () => void;
}
export interface ISheetCellDropdownManagerService {
    showDropdown(param: IDropdownParam): IDisposable;
}
export declare const ISheetCellDropdownManagerService: import("@wendellhu/redi").IdentifierDecorator<ISheetCellDropdownManagerService>;
export declare class SheetCellDropdownManagerService extends Disposable implements ISheetCellDropdownManagerService {
    private readonly _canvasPopupManagerService;
    private readonly _zenZoneService;
    private readonly _renderManagerService;
    private readonly _componentManager;
    constructor(_canvasPopupManagerService: SheetCanvasPopManagerService, _zenZoneService: IZenZoneService, _renderManagerService: IRenderManagerService, _componentManager: ComponentManager);
    showDropdown(param: IDropdownParam): IDisposable;
}
