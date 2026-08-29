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
import type { IShapeProps, SpreadsheetSkeleton, UniverRenderingContext, Vector2 } from '@univerjs/engine-render';
import type { ITableControlHitRegion } from './table-controls-util';
import { Shape } from '@univerjs/engine-render';
export interface ITableControlRenderItem {
    tableId: string;
    tableName: string;
    range: {
        startRow: number;
        endRow: number;
        startColumn: number;
        endColumn: number;
    };
    fill: string;
    text: string;
}
export interface ITableControlMenuLabels {
    rename: string;
    'update-range': string;
    'set-theme': string;
    delete: string;
}
export declare class SheetTableControlsShape extends Shape<IShapeProps> {
    private readonly _getSkeleton;
    private _items;
    private _regions;
    private _openedMenuTableId;
    private _hoveredRegion;
    private _hoveredInsertRegion;
    private _menuLabels;
    constructor(key: string, _getSkeleton: () => SpreadsheetSkeleton | null | undefined);
    setItems(items: ITableControlRenderItem[]): void;
    setMenuLabels(labels: ITableControlMenuLabels): void;
    setOpenedMenuTableId(tableId: string | null): void;
    getOpenedMenuTableId(): string | null;
    setHoveredRegion(region: ITableControlHitRegion | null): void;
    setHoveredInsertRegion(region: ITableControlHitRegion | null): void;
    hitTest(x: number, y: number): ITableControlHitRegion | null;
    isHit(coord: Vector2): boolean;
    refreshBounds(): void;
    protected _draw(ctx: UniverRenderingContext): void;
    private _drawAnchor;
    private _drawAnchorToggle;
    private _drawTopRoundedRect;
    private _drawRightTopRoundedRect;
    private _drawMenu;
    private _drawInsertButton;
    private _isSameRegion;
}
