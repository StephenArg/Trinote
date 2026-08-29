export declare enum DimensionOutlineAxis {
    ROW = "row",
    COLUMN = "column"
}
export interface IDimensionOutline {
    id: string;
    unitId: string;
    subUnitId: string;
    axis: DimensionOutlineAxis;
    /** Zero-based inclusive start index of the grouped rows or columns. */
    start: number;
    /** Zero-based inclusive end index of the grouped rows or columns. */
    end: number;
    collapsed: boolean;
}
export interface IDimensionOutlineViewModel extends IDimensionOutline {
    depth: number;
    parentId?: string;
    anchor: number;
    children: IDimensionOutlineViewModel[];
}
export declare enum DimensionOutlineErrorReason {
    INVALID_RANGE = "invalid-range",
    OUT_OF_BOUNDS = "out-of-bounds",
    CROSSING = "crossing",
    MAX_DEPTH = "max-depth",
    MOVE_SPLITS_OUTLINE = "move-splits-outline",
    CLEAR_RANGE_NOT_CONTAIN_OUTLINE = "clear-range-not-contain-outline",
    UNKNOWN = "unknown"
}
export interface IOutlineMutationError {
    reason: DimensionOutlineErrorReason;
    commandId?: string;
    unitId?: string;
    subUnitId?: string;
    axis?: DimensionOutlineAxis;
    outlineId?: string;
}
export interface IHiddenRange {
    /** Zero-based inclusive start index of the hidden rows or columns. */
    start: number;
    /** Zero-based inclusive end index of the hidden rows or columns. */
    end: number;
}
export interface ISheetDimensionOutlineResource {
    outlineList: IDimensionOutline[];
}
export interface ISheetsOutlineResource {
    [subUnitId: string]: ISheetDimensionOutlineResource;
}
export interface IDimensionOutlineRange {
    unitId: string;
    subUnitId: string;
    axis: DimensionOutlineAxis;
    /** Zero-based inclusive start index of the rows or columns in the range. */
    start: number;
    /** Zero-based inclusive end index of the rows or columns in the range. */
    end: number;
}
export interface IDimensionOutlineInsertRange {
    unitId: string;
    subUnitId: string;
    axis: DimensionOutlineAxis;
    index: number;
    count: number;
}
export interface IDimensionOutlineMoveRange {
    unitId: string;
    subUnitId: string;
    axis: DimensionOutlineAxis;
    /** Zero-based inclusive start index of the moved rows or columns. */
    sourceStart: number;
    /** Zero-based inclusive end index of the moved rows or columns. */
    sourceEnd: number;
    destinationIndex: number;
}
export interface ICanAddDimensionOutlineResult {
    valid: boolean;
    reason?: DimensionOutlineErrorReason.INVALID_RANGE | DimensionOutlineErrorReason.OUT_OF_BOUNDS | DimensionOutlineErrorReason.CROSSING | DimensionOutlineErrorReason.MAX_DEPTH;
}
