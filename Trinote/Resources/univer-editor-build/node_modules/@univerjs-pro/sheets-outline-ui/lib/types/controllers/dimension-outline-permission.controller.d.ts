import { Disposable, ICommandService, IUniverInstanceService, LocaleService } from '@univerjs/core';
import { SheetPermissionCheckController } from '@univerjs/sheets';
export declare class DimensionOutlinePermissionController extends Disposable {
    private readonly _commandService;
    private readonly _localeService;
    private readonly _sheetPermissionCheckController;
    private readonly _univerInstanceService;
    constructor(_commandService: ICommandService, _localeService: LocaleService, _sheetPermissionCheckController: SheetPermissionCheckController, _univerInstanceService: IUniverInstanceService);
    private _initPermission;
}
