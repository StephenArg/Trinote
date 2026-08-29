import { SheetsShapeService } from '@univerjs-pro/sheets-shape';
import { Disposable } from '@univerjs/core';
import { SheetSkeletonService } from '@univerjs/sheets';
import { ISheetDrawingService } from '@univerjs/sheets-drawing';
import { SheetsDrawingGroupCopyPasteController } from '@univerjs/sheets-drawing-ui';
import { ISheetClipboardService } from '@univerjs/sheets-ui';
export declare class SheetShapeClipboardController extends Disposable {
    private readonly _sheetSkeletonService;
    private _sheetClipboardService;
    private readonly _sheetDrawingService;
    private readonly _shapeService;
    private readonly _groupCopyPasteController;
    private _copyInfo;
    constructor(_sheetSkeletonService: SheetSkeletonService, _sheetClipboardService: ISheetClipboardService, _sheetDrawingService: ISheetDrawingService, _shapeService: SheetsShapeService, _groupCopyPasteController: SheetsDrawingGroupCopyPasteController);
    private get _focusedDrawings();
    private _registerGroupFeaturePasteHook;
    private _initCopyPaste;
    private _createCopyInfoByRange;
    private _generatePasteMutations;
    private _generateCutPasteMutations;
    private _generateCopyPasteMutations;
    private _updateTransform;
}
