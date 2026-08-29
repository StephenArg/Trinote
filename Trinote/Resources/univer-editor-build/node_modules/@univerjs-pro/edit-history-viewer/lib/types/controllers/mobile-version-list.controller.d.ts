import { Disposable, Injector } from '@univerjs/core';
import { IUIPartsService } from '@univerjs/ui';
export declare class MobileVersionListController extends Disposable {
    private readonly _uiPartsService;
    private readonly _injector;
    constructor(_uiPartsService: IUIPartsService, _injector: Injector);
}
