import type { ISparklineGroup } from '@univerjs-pro/sheets-sparkline';
import type { IEventBase } from '@univerjs/core/facade';
import type { FWorkbook, FWorksheet } from '@univerjs/sheets/facade';
import { FEventName } from '@univerjs/core/facade';
/**
 * @ignore
 */
export interface IFSheetsSparklineEventNameMixin {
    /**
     * Trigger this event after the sparkline changes.
     * Type of the event parameter is {@link IFSheetSparklineChangedEventParams}
     *
     * @example
     * ```ts
     * const disposable = univerAPI.addEvent(univerAPI.Event.SheetSparklineChanged, (params) => {
     *   console.log('SheetSparklineChanged', params);
     *   const { workbook, worksheet, sparklines } = params;
     * });
     *
     * // Remove the event listener, use `disposable.dispose()`.
     * ```
     */
    readonly SheetSparklineChanged: 'SheetSparklineChanged';
}
export declare class FSheetsSparklineEventNameMixin extends FEventName implements IFSheetsSparklineEventNameMixin {
    get SheetSparklineChanged(): 'SheetSparklineChanged';
}
export interface IFSheetSparklineChangedEventParams extends IEventBase {
    /**
     * The workbook instance currently being operated on. {@link FWorkbook}
     */
    workbook: FWorkbook;
    /**
     * The worksheet instance currently being operated on. {@link FWorksheet}
     */
    worksheet: FWorksheet;
    /**
     * The sparkline array that have been changed. {@link ISparklineGroup}
     */
    sparklines: ISparklineGroup[];
}
/**
 * @ignore
 */
export interface ISheetsSparklineEventParamConfig {
    SheetSparklineChanged: IFSheetSparklineChangedEventParams;
}
declare module '@univerjs/core/facade' {
    interface FEventName extends IFSheetsSparklineEventNameMixin {
    }
    interface IEventParamConfig extends ISheetsSparklineEventParamConfig {
    }
}
