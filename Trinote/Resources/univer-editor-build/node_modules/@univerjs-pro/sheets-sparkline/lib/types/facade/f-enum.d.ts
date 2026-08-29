import { SparklineTypeEnum } from '@univerjs-pro/sheets-sparkline';
import { FEnum } from '@univerjs/core/facade';
/**
 * @ignore
 */
export interface IFSheetsSparklineEnumMixin {
    SparklineTypeEnum: typeof SparklineTypeEnum;
}
export declare class FSheetsSparklineEnumMixin extends FEnum implements IFSheetsSparklineEnumMixin {
    get SparklineTypeEnum(): typeof SparklineTypeEnum;
}
declare module '@univerjs/core/facade' {
    interface FEnum extends IFSheetsSparklineEnumMixin {
    }
}
