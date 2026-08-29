import { SheetsOutlineErrorService } from '@univerjs-pro/sheets-outline';
import { Disposable, LocaleService } from '@univerjs/core';
import { IMessageService } from '@univerjs/ui';
export declare class SheetsOutlineErrorController extends Disposable {
    private readonly _sheetsOutlineErrorService;
    private readonly _messageService;
    private readonly _localeService;
    constructor(_sheetsOutlineErrorService: SheetsOutlineErrorService, _messageService: IMessageService, _localeService: LocaleService);
    private _initErrorListener;
    private _showError;
}
