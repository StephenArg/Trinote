import { SheetsPivotTableService } from '@univerjs-pro/sheets-pivot';
import { Disposable, IConfigService, IConfirmService, Injector, LocaleService } from '@univerjs/core';
import { SheetInterceptorService, SheetPermissionCheckController } from '@univerjs/sheets';
export declare class SheetsPivotTableUIInterceptController extends Disposable {
    private readonly _localeService;
    private readonly _sheetInterceptorService;
    private readonly _injector;
    private readonly _confirmService;
    private readonly _sheetsPivotTableService;
    private readonly _configService;
    private readonly _sheetPermissionCheckController;
    private _defaultOverride;
    constructor(_localeService: LocaleService, _sheetInterceptorService: SheetInterceptorService, _injector: Injector, _confirmService: IConfirmService, _sheetsPivotTableService: SheetsPivotTableService, _configService: IConfigService, _sheetPermissionCheckController: SheetPermissionCheckController);
    private _getPivotAppliedRanges;
    private _initUIInterceptListener;
}
