import type { ICommandInfo, IUndoRedoCommandInfosByInterceptor } from '@univerjs/core';
import type { IDimensionOutline, IOutlineMutationError } from '../common/type';
import { Disposable, IUniverInstanceService } from '@univerjs/core';
import { SheetInterceptorService } from '@univerjs/sheets';
import { SheetsOutlineModel } from '../models/sheets-outline-model';
import { SheetsOutlineErrorService } from '../services/sheets-outline-error.service';
interface ICommandScope {
    unitId: string;
    subUnitId: string;
}
type GetOutlines = (unitId: string, subUnitId: string) => IDimensionOutline[];
type OnInvalidOutlineMutation = (error: IOutlineMutationError) => void;
export declare class DimensionOutlineCommandInterceptorController extends Disposable {
    private readonly _univerInstanceService;
    private readonly _sheetInterceptorService;
    private readonly _sheetsOutlineModel;
    private readonly _sheetsOutlineErrorService;
    constructor(_univerInstanceService: IUniverInstanceService, _sheetInterceptorService: SheetInterceptorService, _sheetsOutlineModel: SheetsOutlineModel, _sheetsOutlineErrorService: SheetsOutlineErrorService);
    private _initCommandInterceptor;
    private _getCommandScope;
}
export declare function getDimensionOutlineCommandMutations(command: ICommandInfo, getOutlines: GetOutlines, fallbackScope?: ICommandScope, onInvalid?: OnInvalidOutlineMutation): IUndoRedoCommandInfosByInterceptor;
export {};
