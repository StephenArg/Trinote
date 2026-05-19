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
import type { ISelectionWithStyle } from '@univerjs/sheets';
import { Disposable, IUniverInstanceService, ThemeService } from '@univerjs/core';
import { IRenderManagerService } from '@univerjs/engine-render';
import { SheetSkeletonService } from '@univerjs/sheets';
import { SelectionControl } from '../selection/selection-control';
export interface IMarkSelectionService {
    addShape(selection: ISelectionWithStyle, exits?: string[], zIndex?: number): string | null;
    addShapeWithNoFresh(selection: ISelectionWithStyle, exits?: string[], zIndex?: number): string | null;
    removeShape(id: string): void;
    removeAllShapes(): void;
    refreshShapes(): void;
    getShapeMap(): Map<string, IMarkSelectionInfo>;
}
interface IMarkSelectionInfo {
    unitId: string;
    subUnitId: string;
    selection: ISelectionWithStyle;
    zIndex: number;
    control: SelectionControl | null;
    exits: string[];
}
export declare const IMarkSelectionService: import("@wendellhu/redi").IdentifierDecorator<IMarkSelectionService>;
/**
 * For copy and cut selection.
 * also for selection when hover on conditional format items in the cf panel on the right.
 * NOT FOR hovering on panel in data validation.
 */
export declare class MarkSelectionService extends Disposable implements IMarkSelectionService {
    private readonly _currentService;
    private readonly _sheetSkeletonService;
    private readonly _renderManagerService;
    private readonly _themeService;
    private _shapeMap;
    constructor(_currentService: IUniverInstanceService, _sheetSkeletonService: SheetSkeletonService, _renderManagerService: IRenderManagerService, _themeService: ThemeService);
    addShape(selection: ISelectionWithStyle, exits?: string[], zIndex?: number): string | null;
    addShapeWithNoFresh(selection: ISelectionWithStyle, exits?: string[], zIndex?: number): string | null;
    refreshShapes(): void;
    getShapeMap(): Map<string, IMarkSelectionInfo>;
    removeShape(id: string): void;
    removeAllShapes(): void;
}
export {};
