import type { IAccessor, ICommand, IRange } from '@univerjs/core';
import type { ISparklineResetCtx, ISparklineSelectorReturns } from '../../type';
export declare const OpenSparklineSelectorOperation: ICommand;
export declare function openSparklineRangeSelector(accessor: IAccessor, selections: IRange[], targetRanges?: IRange[], resetCtx?: ISparklineResetCtx): Promise<ISparklineSelectorReturns | null>;
