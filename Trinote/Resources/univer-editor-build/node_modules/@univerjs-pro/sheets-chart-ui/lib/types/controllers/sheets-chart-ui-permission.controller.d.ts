import { SheetsChartService } from '@univerjs-pro/sheets-chart';
import { Disposable, ICommandService, LocaleService } from '@univerjs/core';
import { SheetPermissionCheckController } from '@univerjs/sheets';
export declare class SheetsChartUIPermissionController extends Disposable {
    private _commandService;
    private _localeService;
    private _sheetPermissionCheckController;
    private _sheetsChartService;
    constructor(_commandService: ICommandService, _localeService: LocaleService, _sheetPermissionCheckController: SheetPermissionCheckController, _sheetsChartService: SheetsChartService);
    private _initPermission;
}
