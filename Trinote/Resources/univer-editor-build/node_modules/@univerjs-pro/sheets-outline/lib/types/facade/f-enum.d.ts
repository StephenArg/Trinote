import { DimensionOutlineAxis, DimensionOutlineErrorReason } from '@univerjs-pro/sheets-outline';
import { FEnum } from '@univerjs/core/facade';
/**
 * @ignore
 */
export interface IFSheetsOutlineEnumMixin {
    /**
     * Row or column axis for dimension outline facade APIs.
     */
    DimensionOutlineAxis: typeof DimensionOutlineAxis;
    /**
     * Error reason values emitted by dimension outline commands.
     */
    DimensionOutlineErrorReason: typeof DimensionOutlineErrorReason;
}
export declare class FSheetsOutlineEnumMixin extends FEnum implements IFSheetsOutlineEnumMixin {
    get DimensionOutlineAxis(): typeof DimensionOutlineAxis;
    get DimensionOutlineErrorReason(): typeof DimensionOutlineErrorReason;
}
declare module '@univerjs/core/facade' {
    interface FEnum extends IFSheetsOutlineEnumMixin {
    }
}
