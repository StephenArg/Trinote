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
import type { IObjectArrayPrimitiveType, Nullable } from '../shared';
import type { IDocumentData, IDocumentRenderConfig, IPaddingData } from '../types/interfaces';
import type { Styles } from './styles';
import type { ICellData, ICellInfo, ICellWithCoord, IPosition, IRange, ISelectionCell, IWorksheetData } from './typedef';
import type { Worksheet } from './worksheet';
import { Injector } from '@wendellhu/redi';
import { DocumentDataModel } from '../docs/data-model/document-data-model';
import { IConfigService } from '../services/config/config.service';
import { IContextService } from '../services/context/context.service';
import { LocaleService } from '../services/locale/locale.service';
import { ObjectMatrix } from '../shared';
import { ImageCacheMap } from '../shared/cache/image-cache';
import { Skeleton } from '../skeleton';
import { HorizontalAlign } from '../types/enum';
/**
 * Configuration for a single gap (visual separator between rows or columns).
 * The gap area is rendered with a background color and diagonal stripes.
 */
export interface IGapItem {
    /** Gap size in pixels */
    size: number;
    /** Background color of the gap area. Falls back to ISheetGapConfig.defaultBackgroundColor. */
    color?: string;
    /** Diagonal stripe color. Falls back to ISheetGapConfig.defaultStripeColor. */
    stripeColor?: string;
}
/**
 * Configuration for row/column gaps in a sheet.
 * Gaps are visual-only separators that do not affect the data model.
 * They are stored as runtime configuration and are not persisted.
 */
export interface ISheetGapConfig {
    /** Row gaps. Key is the row index; gap appears BEFORE that row. */
    rowGaps?: IObjectArrayPrimitiveType<IGapItem>;
    /** Column gaps. Key is the column index; gap appears BEFORE that column. */
    colGaps?: IObjectArrayPrimitiveType<IGapItem>;
    /** Default diagonal stripe color (theme primary). Used when gap items don't specify stripeColor. */
    defaultStripeColor?: string;
    /** Default background color (lighter primary). Used when gap items don't specify color. */
    defaultBackgroundColor?: string;
}
/**
 * Reusable gap fixture for visual and integration testing.
 */
export declare function createSheetGapTestConfig(overrides?: Partial<ISheetGapConfig>): ISheetGapConfig;
/**
 * Optional gap size getter for coordinate calculation functions.
 */
export interface IGapSizeGetter {
    row: (r: number) => number;
    col: (c: number) => number;
}
export interface IGetRowColByPosOptions {
    closeFirst?: boolean;
    /**
     * For searchArray(rowHeightAccumulation) & searchArray(colWidthAccumulation)
     * true means return first matched index in matched sequence.
     * default return last index in matched sequence.
     */
    firstMatch?: boolean;
}
export declare class SheetSkeleton extends Skeleton {
    readonly worksheet: Worksheet;
    protected _styles: Styles;
    protected readonly _contextService: IContextService;
    protected readonly _configService: IConfigService;
    protected _injector: Injector;
    /**
     * @deprecated avoid use `IWorksheetData` directly, use API provided by `Worksheet`, otherwise
     * `ViewModel` will be not working.
     */
    protected _worksheetData: IWorksheetData;
    protected _renderRawFormula: boolean;
    protected _cellData: ObjectMatrix<Nullable<ICellData>>;
    protected _imageCacheMap: ImageCacheMap;
    /**
     * Whether auto height for merged cells
     */
    protected _skipAutoHeightForMergedCells: boolean;
    constructor(worksheet: Worksheet, _styles: Styles, _localeService: LocaleService, _contextService: IContextService, _configService: IConfigService, _injector: Injector);
    initConfig(): void;
    resetCache(): void;
    /**
     * @deprecated should never expose a property that is provided by another module!
     */
    getWorksheetConfig(): IWorksheetData;
    /**
     * Get which Workbook and Worksheet this skeleton is attached to.
     * @returns [unitId, sheetId]
     */
    getLocation(): [string, string];
    private _rowTotalHeight;
    private _columnTotalWidth;
    private _rowHeaderWidth;
    private _columnHeaderHeight;
    private _rowHeightAccumulation;
    private _columnWidthAccumulation;
    private _marginTop;
    private _marginLeft;
    /**
     * Runtime gap configuration for visual row/column separators.
     */
    private _gapConfig;
    /** Scale of Scene */
    protected _scaleX: number;
    protected _scaleY: number;
    /** Viewport scrolled value */
    protected _scrollX: number;
    /** Viewport scrolled value */
    protected _scrollY: number;
    set columnHeaderHeight(value: number);
    set rowHeaderWidth(value: number);
    get rowHeightAccumulation(): number[];
    get rowTotalHeight(): number;
    get columnWidthAccumulation(): number[];
    get columnTotalWidth(): number;
    get rowHeaderWidth(): number;
    get columnHeaderHeight(): number;
    setMarginLeft(left: number): void;
    setMarginTop(top: number): void;
    setScale(value: number, valueY?: number): void;
    setScroll(scrollX?: number, scrollY?: number): void;
    get scrollX(): number;
    get scrollY(): number;
    get scaleX(): number;
    get scaleY(): number;
    get rowHeaderWidthAndMarginLeft(): number;
    get columnHeaderHeightAndMarginTop(): number;
    get imageCacheMap(): ImageCacheMap;
    get gapConfig(): ISheetGapConfig;
    /**
     * Set runtime gap configuration for visual row/column separators.
     * This triggers a recalculation of the layout (accumulation arrays, etc.).
     */
    setGapConfig(config: ISheetGapConfig): void;
    private _fillDefaultGapThemeColors;
    /**
     * Get the gap size (in px) BEFORE the given row.
     */
    getRowGapSize(row: number): number;
    /**
     * Get the gap size (in px) BEFORE the given column.
     */
    getColGapSize(col: number): number;
    /**
     * Returns a gap size getter object for use with coordinate utility functions.
     */
    getGapSizeGetter(): IGapSizeGetter | undefined;
    /**
     * Check if a Y position (in sheet content coordinates) falls within a row gap.
     * @returns The row index that the gap precedes, or -1 if not in a gap.
     */
    getRowGapAtPosition(y: number): number;
    /**
     * Check if an X position (in sheet content coordinates) falls within a column gap.
     * @returns The column index that the gap precedes, or -1 if not in a gap.
     */
    getColGapAtPosition(x: number): number;
    private _generateRowMatrixCache;
    /**
     * Calc columnWidthAccumulation by columnData
     */
    private _generateColumnMatrixCache;
    intersectMergeRange(row: number, column: number): boolean;
    protected _getOverflowBound(row: number, startColumn: number, endColumn: number, contentWidth: number, horizontalAlign?: HorizontalAlign): number;
    /**
     * Calculate data for row col & cell position.
     * This method should be called whenever a sheet is dirty.
     * Update position value to this._rowHeaderWidth & this._rowHeightAccumulation & this._columnHeaderHeight & this._columnWidthAccumulation.
     */
    protected _updateLayout(): void;
    /**
     * Refresh cache after markDirty by SheetSkeletonManagerService.reCalculate()
     */
    calculate(): Nullable<SheetSkeleton>;
    resetRangeCache(_ranges: IRange[]): void;
    private _dynamicallyUpdateRowHeaderWidth;
    protected _hasUnMergedCellInRow(rowIndex: number, startColumn: number, endColumn: number): boolean;
    /**
     * expand curr range if it's intersect with merge range.
     * @returns {IRange} expanded range because merge info.
     */
    expandRangeByMerge(range: IRange, inRefSelectionMode?: boolean): IRange;
    getColumnCount(): number;
    getRowCount(): number;
    /**
     * New version to get merge data.
     * @returns {ISelectionCell} The cell info with merge data
     */
    protected _getCellMergeInfo(row: number, column: number): ISelectionCell;
    /**
     * Original name: getNoMergeCellPositionByIndex
     */
    getNoMergeCellWithCoordByIndex(rowIndex: number, columnIndex: number, header?: boolean): IPosition;
    /**
     * Get row index by offset y.
     */
    getRowIndexByOffsetY(offsetY: number, scaleY: number, scrollXY: {
        x: number;
        y: number;
    }, options?: IGetRowColByPosOptions): number;
    /**
     * Get column index by offset x.
     */
    getColumnIndexByOffsetX(evtOffsetX: number, scaleX: number, scrollXY: {
        x: number;
        y: number;
    }, options?: IGetRowColByPosOptions): number;
    /**
     * Get cell index by offset(o)
     * @param offsetX position X in viewport.
     * @param offsetY position Y in viewport.
     * @param scaleX render scene scale x-axis, scene.getAncestorScale
     * @param scaleY render scene scale y-axis, scene.getAncestorScale
     * @param scrollXY  render viewport scroll {x, y}, scene.getScrollXYByRelativeCoords, scene.getScrollXY
     * @param scrollXY.x
     * @param scrollXY.y
     */
    getCellIndexByOffset(offsetX: number, offsetY: number, scaleX: number, scaleY: number, scrollXY: {
        x: number;
        y: number;
    }, options?: IGetRowColByPosOptions): {
        row: number;
        column: number;
    };
    /**
     * Unlike getCellWithCoordByOffset, returning data doesn't include coord.
     */
    getCellByOffset(offsetX: number, offsetY: number, scaleX: number, scaleY: number, scrollXY: {
        x: number;
        y: number;
    }): Nullable<ICellInfo>;
    /**
     * Return cell information corresponding to the current coordinates, including the merged cell object.
     * @param row Specified Row Coordinate
     * @param column Specified Column Coordinate
     */
    getCellWithCoordByIndex(row: number, column: number, header?: boolean): ICellWithCoord;
    /**
     * Get cell by pos(offsetX, offsetY). Combine getCellIndexByOffset and then getCellWithCoordByIndex.
     *
     * options.matchFirst true means get cell would skip all invisible cells.
     * @param offsetX position X in viewport.
     * @param offsetY position Y in viewport.
     * @param scaleX render scene scale x-axis, scene.getAncestorScale
     * @param scaleY render scene scale y-axis, scene.getAncestorScale
     * @param scrollXY render viewportScroll {x, y}
     * @param options {IGetRowColByPosOptions}
     * @returns {ICellWithCoord} Selection data with coordinates
     */
    getCellWithCoordByOffset(offsetX: number, offsetY: number, scaleX: number, scaleY: number, scrollXY: {
        x: number;
        y: number;
    }, options?: IGetRowColByPosOptions): ICellWithCoord;
    /**
     * Original name: getOffsetByPositionX
     */
    getOffsetByColumn(column: number): number;
    /**
     * Original name: getOffsetByPositionY
     */
    getOffsetByRow(row: number): number;
    /**
     * Original name: getDecomposedOffset
     * Here, offsetX and offsetY are the coordinates in the main viewport, excluding the rowHeaderWidthAndMarginLeft and columnHeaderHeightAndMarginTop.
     */
    getOffsetRelativeToRowCol(offsetX: number, offsetY: number): {
        row: number;
        column: number;
        columnOffset: number;
        rowOffset: number;
    };
    /**
     * Here, offsetX and offsetY are the coordinates in the viewport, including the rowHeaderWidthAndMarginLeft and columnHeaderHeightAndMarginTop.
     */
    getCellIndexAndOffsetByPosition(offsetX: number, offsetY: number): {
        row: number;
        rowOffset: number;
        column: number;
        columnOffset: number;
    };
    protected _updateConfigAndGetDocumentModel(documentData: IDocumentData, horizontalAlign: HorizontalAlign, paddingData: IPaddingData, renderConfig?: IDocumentRenderConfig): Nullable<DocumentDataModel>;
    dispose(): void;
}
/**
 * Not same as getCellWithCoordByIndex, Only the coordinates of the corresponding cells in rows and columns are considered, without taking into account the merged data.
 *
 * @param row
 * @param column
 * @param rowHeightAccumulation
 * @param columnWidthAccumulation
 * @param rowGapSize Gap size (px) BEFORE this row. The cell startY is shifted by this amount.
 * @param colGapSize Gap size (px) BEFORE this column. The cell startX is shifted by this amount.
 */
export declare function getCellCoordByIndexSimple(row: number, column: number, rowHeightAccumulation: number[], columnWidthAccumulation: number[], rowGapSize?: number, colGapSize?: number): IPosition;
/**
 * @description Get the cell position information of the specified row and column, including the position of the cell and the merge info
 * @param {number} row The row index of the cell
 * @param {number} column The column index of the cell
 * @param {number[]} rowHeightAccumulation The accumulated height of each row
 * @param {number[]} columnWidthAccumulation The accumulated width of each column
 * @param {ICellInfo} mergeDataInfo The merge information of the cell
 * @param {IGapSizeGetter} gapSizeGetter Optional getter for gap sizes before specific rows/columns
 * @returns {ICellWithCoord} The cell position information of the specified row and column, including the position information of the cell and the merge information of the cell
 */
export declare function getCellWithCoordByIndexCore(row: number, column: number, rowHeightAccumulation: number[], columnWidthAccumulation: number[], mergeDataInfo: Nullable<ICellInfo>, gapSizeGetter?: IGapSizeGetter): ICellWithCoord;
/**
 * Get x in sheet coordinate. Already handled scrolling and zooming.
 * @param offsetX Offset value from PointerEvent in canvas element.
 * @param scaleX from scene.getAncestorScale
 * @param scrollXY Scroll value of viewport
 * @returns {number} x in sheet coordinate.
 */
export declare function getTransformOffsetX(offsetX: number, scaleX: number, scrollXY: {
    x: number;
    y: number;
}, rowHeaderWidth: number): number;
/**
 * @param offsetY
 * @param scaleY
 * @param scrollXY
 */
export declare function getTransformOffsetY(offsetY: number, scaleY: number, scrollXY: {
    x: number;
    y: number;
}, columnHeight: number): number;
