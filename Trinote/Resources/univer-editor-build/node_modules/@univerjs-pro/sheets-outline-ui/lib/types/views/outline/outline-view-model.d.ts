import type { DimensionOutlineAxis, IDimensionOutline, IDimensionOutlineViewModel } from '@univerjs-pro/sheets-outline';
export declare const OUTLINE_LEVEL_SIZE = 20;
export declare const OUTLINE_BUTTON_SIZE = 14;
export declare const OUTLINE_BUTTON_RADIUS = 3;
export declare const OUTLINE_BUTTON_PADDING = 3;
export declare const OUTLINE_LINE_HIT_SIZE = 6;
export interface IOutlineButtonHit {
    id: string;
    axis: DimensionOutlineAxis;
    collapsed: boolean;
    left: number;
    top: number;
    width: number;
    height: number;
}
export interface IOutlineLevelButtonHit {
    axis: DimensionOutlineAxis;
    level: number;
    active: boolean;
    left: number;
    top: number;
    width: number;
    height: number;
}
export interface IGetDimensionOutlineViewModelOptions {
    includeHiddenGroups?: boolean;
}
export interface IGetOutlineGutterSizeOptions {
    includeLevelButtons?: boolean;
}
export declare function getDimensionOutlineViewModels(groups: IDimensionOutline[], unitId: string, subUnitId: string, axis: DimensionOutlineAxis, options?: IGetDimensionOutlineViewModelOptions): IDimensionOutlineViewModel[];
export declare function getMaxDimensionOutlineDepth(groups: IDimensionOutline[], unitId: string, subUnitId: string, axis: DimensionOutlineAxis, options?: IGetDimensionOutlineViewModelOptions): number;
export declare function getOutlineGutterSize(maxDepth: number, options?: IGetOutlineGutterSizeOptions): number;
export declare function getOutlineLevelCount(maxDepth: number): number;
export declare function getNextOutlineLevelCollapsedState(groups: IDimensionOutlineViewModel[], level: number, group: IDimensionOutlineViewModel): boolean;
export declare function hitTestOutlineButton(buttons: IOutlineButtonHit[], x: number, y: number): IOutlineButtonHit | null;
export declare function hitTestOutlineLevelButton(buttons: IOutlineLevelButtonHit[], x: number, y: number): IOutlineLevelButtonHit | null;
