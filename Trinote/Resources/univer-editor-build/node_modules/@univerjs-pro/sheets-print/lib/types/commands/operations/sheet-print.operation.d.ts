import type { ICommand } from '@univerjs/core';
import type { ISheetPrintLayoutConfig, ISheetPrintRenderConfig } from '../../common/types';
export declare const SheetPrintOpenOperation: ICommand;
export declare const CancelSheetPrintOperation: ICommand;
export declare const ConfirmSheetPrintOperation: ICommand;
export interface ISheetPrintOperationParams {
    layoutConfig: ISheetPrintLayoutConfig;
    renderConfig: ISheetPrintRenderConfig;
}
export declare const SheetPrintOperation: ICommand<ISheetPrintOperationParams>;
