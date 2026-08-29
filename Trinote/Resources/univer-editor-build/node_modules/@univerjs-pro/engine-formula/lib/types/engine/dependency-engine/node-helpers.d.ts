import type { CellId, ExternalNodeId, ICalcNodeRef } from './types';
/**
 * Public helpers for creating calculation node references.
 */
export declare function cellFormulaNode(cell: CellId): ICalcNodeRef;
export declare function otherFormulaNode(id: ExternalNodeId): ICalcNodeRef;
export declare function featureCalculationNode(id: ExternalNodeId): ICalcNodeRef;
