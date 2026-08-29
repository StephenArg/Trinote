import type { IUnitRange } from '@univerjs/core';
import type { IFormulaData } from '@univerjs/engine-formula';
export type SharedFormulaFallbackReason = 'small-group' | 'non-rectangular-fill-range' | 'missing-anchor-formula' | 'ambiguous-anchor-formula' | 'unsupported-dynamic-reference' | 'volatile-function' | 'self-overlap' | 'array-formula' | 'spill-formula' | 'external-reference' | 'unsupported-range-pattern';
export interface ISharedFormulaAnalyzerConfig {
    minSharedGroupSize?: number;
}
export interface ISharedFormulaCellAddress {
    unitId: string;
    sheetId: string;
    row: number;
    col: number;
}
export interface ISharedFormulaGroupSummary {
    groupId: string;
    unitId: string;
    sheetId: string;
    si: string;
    anchor?: ISharedFormulaCellAddress;
    fillRange?: IUnitRange;
    width: number;
    height: number;
    size: number;
    virtualFormulaCount: number;
    mode: 'candidate' | 'expanded';
    fallbackReason?: SharedFormulaFallbackReason;
}
export interface ISharedFormulaCompressionMetrics {
    totalFormulaNodes: number;
    totalSharedFormulaGroups: number;
    compressedSharedFormulaGroups: number;
    compressibleSharedFormulaGroups: number;
    expandedSharedFormulaGroups: number;
    totalVirtualFormulaNodesInCompressedGroups: number;
    totalVirtualFormulaNodesInCompressibleGroups: number;
    skippedExpandedDependencyRegistrationCount: number;
    sharedPatternCount: number;
    sharedSourceCoverageEntryCount: number;
    fallbackReasonCounts: Partial<Record<SharedFormulaFallbackReason, number>>;
}
export interface ISharedFormulaAnalysisResult {
    groups: ISharedFormulaGroupSummary[];
    metrics: ISharedFormulaCompressionMetrics;
}
export declare function createEmptySharedFormulaCompressionMetrics(): ISharedFormulaCompressionMetrics;
export declare function analyzeSharedFormulaGroups(formulaData: IFormulaData, config?: ISharedFormulaAnalyzerConfig): ISharedFormulaAnalysisResult;
