import type { ICommand } from '@univerjs/core';
import type { IChartSourceMultiRangeItem, ISheetChartSourceSingleRange } from '../../models/types';
export interface IChartUpdateSourceCommandParams {
    unitId: string;
    chartModelId: string;
    range: ISheetChartSourceSingleRange | IChartSourceMultiRangeItem[];
}
export declare const ChartUpdateSourceCommand: ICommand<IChartUpdateSourceCommandParams>;
