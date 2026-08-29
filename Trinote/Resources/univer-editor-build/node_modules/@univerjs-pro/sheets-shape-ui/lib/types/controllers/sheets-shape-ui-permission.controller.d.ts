import { Disposable, ICommandService, LocaleService } from '@univerjs/core';
import { SheetPermissionCheckController } from '@univerjs/sheets';
export declare class SheetsShapeUIPermissionController extends Disposable {
    private _commandService;
    private _localeService;
    private _sheetPermissionCheckController;
    constructor(_commandService: ICommandService, _localeService: LocaleService, _sheetPermissionCheckController: SheetPermissionCheckController);
    private _initPermission;
}
