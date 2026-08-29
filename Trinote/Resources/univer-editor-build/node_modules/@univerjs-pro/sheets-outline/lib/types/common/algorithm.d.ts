import type { DimensionOutlineAxis, ICanAddDimensionOutlineResult, IDimensionOutline, IDimensionOutlineInsertRange, IDimensionOutlineMoveRange, IDimensionOutlineRange, IDimensionOutlineViewModel, IHiddenRange } from './type';
interface IBuildTreeOptions {
    maxDepth?: number;
    maxIndex?: number;
}
export interface IAdjacentDimensionOutlineMerge {
    mergedOutline: IDimensionOutline;
    mergedOutlines: IDimensionOutline[];
}
export declare function isSameOutlineScope(outline: IDimensionOutline, range: Pick<IDimensionOutlineRange, 'unitId' | 'subUnitId' | 'axis'>): boolean;
export declare function buildDimensionOutlineTree(outlines: IDimensionOutline[], options?: IBuildTreeOptions): IDimensionOutlineViewModel[];
export declare function canAddDimensionOutline(outlines: IDimensionOutline[], next: IDimensionOutline, options?: IBuildTreeOptions): ICanAddDimensionOutlineResult;
export declare function addDimensionOutlineToList(outlines: IDimensionOutline[], next: IDimensionOutline, options?: IBuildTreeOptions): IDimensionOutline[];
export declare function getAdjacentDimensionOutlineMerge(outlines: IDimensionOutline[], next: IDimensionOutline): IAdjacentDimensionOutlineMerge | null;
export declare function clearDimensionOutlinesInRange(outlines: IDimensionOutline[], range: IDimensionOutlineRange): IDimensionOutline[];
export declare function buildHiddenRanges(outlines: IDimensionOutline[], unitId: string, subUnitId: string, axis: DimensionOutlineAxis): IHiddenRange[];
export declare function mergeRanges(ranges: IHiddenRange[]): IHiddenRange[];
export declare function transformOutlinesByInsert(outlines: IDimensionOutline[], range: IDimensionOutlineInsertRange): IDimensionOutline[];
export declare function transformOutlinesByDelete(outlines: IDimensionOutline[], range: IDimensionOutlineRange): IDimensionOutline[];
export declare function transformOutlinesByMove(outlines: IDimensionOutline[], range: IDimensionOutlineMoveRange): IDimensionOutline[];
export {};
