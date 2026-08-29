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
import type { INeedCheckDisposable, ITextRangeParam } from '@univerjs/core';
import type { BaseObject, IBoundRectNoAngle, IRender, Scene } from '@univerjs/engine-render';
import type { IPopup } from '@univerjs/ui';
import { Disposable, ICommandService, IUniverInstanceService } from '@univerjs/core';
import { IRenderManagerService } from '@univerjs/engine-render';
import { ICanvasPopupService } from '@univerjs/ui';
export declare function transformBound2OffsetBound(originBound: IBoundRectNoAngle, scene: Scene): IBoundRectNoAngle;
export declare function transformPosition2Offset(x: number, y: number, scene: Scene): {
    x: number;
    y: number;
};
export declare function transformOffset2Bound(offsetX: number, offsetY: number, scene: Scene): {
    x: number;
    y: number;
};
export interface IDocCanvasPopup extends Omit<IPopup, 'anchorRect$' | 'children' | 'unitId' | 'subUnitId' | 'canvasElement'> {
    mask?: boolean;
    extraProps?: Record<string, unknown>;
    multipleDirection?: IPopup['direction'];
}
export declare const calcDocRangePositions: (range: ITextRangeParam, currentRender: IRender) => IBoundRectNoAngle[] | undefined;
export declare class DocCanvasPopManagerService extends Disposable {
    private readonly _globalPopupManagerService;
    private readonly _renderManagerService;
    private readonly _univerInstanceService;
    private readonly _commandService;
    constructor(_globalPopupManagerService: ICanvasPopupService, _renderManagerService: IRenderManagerService, _univerInstanceService: IUniverInstanceService, _commandService: ICommandService);
    private _createRectPositionObserver;
    private _createObjectPositionObserver;
    private _createRangePositionObserver;
    attachPopupToRect(rect: IBoundRectNoAngle | (() => IBoundRectNoAngle), popup: IDocCanvasPopup, unitId: string): INeedCheckDisposable;
    /**
     * attach a popup to canvas object
     * @param targetObject target canvas object
     * @param popup popup item
     * @returns disposable
     */
    attachPopupToObject(targetObject: BaseObject, popup: IDocCanvasPopup, unitId: string): INeedCheckDisposable;
    /**
     * attach a popup to doc range
     * @param range doc range
     * @param popup popup item
     * @param unitId unit id
     * @returns disposable
     */
    attachPopupToRange(range: ITextRangeParam, popup: IDocCanvasPopup, unitId: string): INeedCheckDisposable;
}
