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
import type { IMouseEvent, IPointerEvent, IShapeProps, UniverRenderingContext2D } from '@univerjs/engine-render';
import type { SheetsTableButtonStateEnum } from '@univerjs/sheets-table';
import { ICommandService } from '@univerjs/core';
import { Shape } from '@univerjs/engine-render';
export declare const FILTER_ICON_SIZE = 16;
export declare const FILTER_ICON_PADDING = 1;
export interface ISheetsTableFilterButtonShapeProps extends IShapeProps {
    cellWidth: number;
    cellHeight: number;
    iconColor: string;
    hoverBackground: string;
    hoverIconColor: string;
    filterParams: {
        row: number;
        col: number;
        unitId: string;
        subUnitId: string;
        buttonState: SheetsTableButtonStateEnum;
        tableId: string;
    };
}
/**
 * The widget to render a filter button on canvas.
 */
export declare class SheetsTableFilterButtonShape extends Shape<ISheetsTableFilterButtonShapeProps> {
    private readonly _commandService;
    private _cellWidth;
    private _cellHeight;
    private _filterParams?;
    private _iconColor;
    private _hoverBackground;
    private _hoverIconColor;
    private _hovered;
    constructor(key: string, props: ISheetsTableFilterButtonShapeProps, _commandService: ICommandService);
    setShapeProps(props: Partial<ISheetsTableFilterButtonShapeProps>): void;
    protected _draw(ctx: UniverRenderingContext2D): void;
    private _drawChevron;
    onPointerDown(evt: IPointerEvent | IMouseEvent): void;
    onPointerEnter(): void;
    onPointerLeave(): void;
}
