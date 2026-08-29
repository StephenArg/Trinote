import { SheetsPivotTableAdaptorModel } from '@univerjs-pro/sheets-pivot';
import { Disposable, IUniverInstanceService } from '@univerjs/core';
import { ISheetClipboardService } from '@univerjs/sheets-ui';
export declare class SheetsPivotTableClipboardController extends Disposable {
    private readonly _univerInstanceService;
    private readonly _sheetsPivotTableAdaptorModel;
    private readonly _sheetClipboardService;
    constructor(_univerInstanceService: IUniverInstanceService, _sheetsPivotTableAdaptorModel: SheetsPivotTableAdaptorModel, _sheetClipboardService: ISheetClipboardService);
    private _initialize;
}
