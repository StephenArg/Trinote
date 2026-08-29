import { Disposable, IResourceManagerService } from '@univerjs/core';
import { SheetsOutlineModel } from '../models/sheets-outline-model';
export declare class SheetsOutlineResourceController extends Disposable {
    private readonly _resourceManagerService;
    private readonly _sheetsOutlineModel;
    constructor(_resourceManagerService: IResourceManagerService, _sheetsOutlineModel: SheetsOutlineModel);
    private _initResource;
}
