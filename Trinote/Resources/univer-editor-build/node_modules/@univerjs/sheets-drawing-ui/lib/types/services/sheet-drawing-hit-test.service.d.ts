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
import type { IDrawingParam } from '@univerjs/core';
import type { IMouseEvent, IPointerEvent } from '@univerjs/engine-render';
import type { Observable } from 'rxjs';
import { Disposable, IUniverInstanceService } from '@univerjs/core';
import { IDrawingManagerService } from '@univerjs/drawing';
import { IRenderManagerService } from '@univerjs/engine-render';
export interface ISheetDrawingHitTestResult {
    drawing: IDrawingParam;
    oKey: string;
    offsetX: number;
    offsetY: number;
}
export interface ISheetDrawingDoubleClickEvent extends ISheetDrawingHitTestResult {
    nativeEvent: IPointerEvent | IMouseEvent;
}
/**
 * Resolves sheet canvas pointer coordinates to drawing objects.
 *
 * Callers consume drawing-level events and should not depend on renderer object
 * keys, scene picking, or active sheet filtering.
 */
export declare class SheetDrawingHitTestService extends Disposable {
    private readonly _drawingManagerService;
    private readonly _univerInstanceService;
    private readonly _renderManagerService;
    private readonly _onDoubleClick$;
    readonly onDoubleClick$: Observable<ISheetDrawingDoubleClickEvent>;
    private _doubleClickDisposable;
    private _boundRender;
    private _boundScene;
    constructor(_drawingManagerService: IDrawingManagerService, _univerInstanceService: IUniverInstanceService, _renderManagerService: IRenderManagerService);
    dispose(): void;
    hitTestCurrentSheet(offsetX: number, offsetY: number): ISheetDrawingHitTestResult | null;
    hitTest(unitId: string, subUnitId: string, offsetX: number, offsetY: number): ISheetDrawingHitTestResult | null;
    private _init;
    private _bindDoubleClickListener;
    private _disposeDoubleClickListener;
    private _hitTestScene;
    private _getActiveSheetContext;
}
