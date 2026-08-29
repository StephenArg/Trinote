import { DimensionOutlineErrorReason } from './type';
export declare class DimensionOutlineError extends Error {
    readonly reason: DimensionOutlineErrorReason;
    readonly outlineId?: string | undefined;
    constructor(reason: DimensionOutlineErrorReason, message: string, outlineId?: string | undefined);
}
export declare function getDimensionOutlineErrorReason(error: unknown): DimensionOutlineErrorReason;
export declare function getDimensionOutlineErrorOutlineId(error: unknown): string | undefined;
