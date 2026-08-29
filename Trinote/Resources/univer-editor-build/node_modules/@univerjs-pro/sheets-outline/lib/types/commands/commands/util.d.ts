import type { IMutationInfo, IRange, Worksheet } from '@univerjs/core';
import type { IDimensionOutline } from '../../common/type';
import { DimensionOutlineAxis } from '../../common/type';
export declare function toDimensionRange(axis: DimensionOutlineAxis, start: number, end: number, worksheet: Worksheet): IRange;
export declare function getHiddenMutationId(axis: DimensionOutlineAxis): string;
export declare function getVisibleMutationId(axis: DimensionOutlineAxis): string;
export declare function createCollapsedMutations(outline: IDimensionOutline, collapsed: boolean, worksheet: Worksheet, allGroups: IDimensionOutline[]): IMutationInfo[];
export declare function getVisibleRangesForExpand(outline: IDimensionOutline, allGroups: IDimensionOutline[], worksheet: Worksheet): IRange[];
