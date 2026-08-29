import { SheetsShapeService } from '@univerjs-pro/sheets-shape';
import { Disposable, IUniverInstanceService } from '@univerjs/core';
import { SheetInterceptorService } from '@univerjs/sheets';
import { ISheetDrawingService } from '@univerjs/sheets-drawing';
export declare class ShapeSheetChangeController extends Disposable {
    private _univerInstanceService;
    private readonly _sheetInterceptorService;
    private readonly _sheetDrawingService;
    private readonly _sheetsShapeService;
    constructor(_univerInstanceService: IUniverInstanceService, _sheetInterceptorService: SheetInterceptorService, _sheetDrawingService: ISheetDrawingService, _sheetsShapeService: SheetsShapeService);
    private _initSheetChange;
}
