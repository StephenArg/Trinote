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
import type { ThemeService } from '@univerjs/core';
import type { IRectProps, Scene } from '@univerjs/engine-render';
import type { ISelectionStyle } from '@univerjs/sheets';
import { RANGE_TYPE } from '@univerjs/core';
import { Rect } from '@univerjs/engine-render';
import { SelectionControl } from './selection-control';
export declare class MobileSelectionControl extends SelectionControl {
    protected _scene: Scene;
    protected _zIndex: number;
    protected readonly _themeService: ThemeService;
    /**
     * topLeft controlPointer, it is not visible, just transparent, for handling event.
     */
    private _fillControlTopLeft;
    /**
     * bottomRight controlPointer, it is not visible, just transparent, for handling event.
     */
    private _fillControlBottomRight;
    protected _rangeType: RANGE_TYPE;
    constructor(_scene: Scene, _zIndex: number, _themeService: ThemeService, options?: {
        highlightHeader?: boolean;
        enableAutoFill?: boolean;
        rowHeaderWidth: number;
        columnHeaderHeight: number;
        rowHeaderOffsetX?: number;
        columnHeaderOffsetY?: number;
        rangeType?: RANGE_TYPE;
    });
    initControlPoints(): void;
    get fillControlTopLeft(): Rect<IRectProps> | null;
    set fillControlTopLeft(value: Rect);
    get fillControlBottomRight(): Rect<IRectProps> | null;
    set fillControlBottomRight(value: Rect);
    get rangeType(): RANGE_TYPE;
    set rangeType(value: RANGE_TYPE);
    dispose(): void;
    protected _updateLayoutOfSelectionControl(style: ISelectionStyle): void;
    getViewportMainScrollInfo(): {
        viewportScrollX: number;
        viewportScrollY: number;
        width: number;
        height: number;
    };
    /**
     * Mainly for row & col selection control point position. update control point position by when scrolling.
     * @param viewportScrollX viewportScrollX
     * @param viewportScrollY
     * @param sheetContentWidth
     * @param sheetContentHeight max sheet content height, for very short sheet, control pointer shoud not out of sheet
     */
    transformControlPoint(viewportScrollX?: number, viewportScrollY?: number, sheetContentWidth?: number, sheetContentHeight?: number): void;
}
