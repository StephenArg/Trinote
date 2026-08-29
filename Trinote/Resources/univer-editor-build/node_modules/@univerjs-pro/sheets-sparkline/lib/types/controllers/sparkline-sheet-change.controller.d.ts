import { Disposable, IUniverInstanceService } from '@univerjs/core';
import { SheetInterceptorService } from '@univerjs/sheets';
import { SparklineDataSourceModel } from '../models/sparkline-data-source.model';
export declare class SparklineSheetChangeController extends Disposable {
    private _univerInstanceService;
    private readonly _sheetInterceptorService;
    private readonly _sparklineDataSourceModel;
    constructor(_univerInstanceService: IUniverInstanceService, _sheetInterceptorService: SheetInterceptorService, _sparklineDataSourceModel: SparklineDataSourceModel);
    private _initSheetChange;
}
