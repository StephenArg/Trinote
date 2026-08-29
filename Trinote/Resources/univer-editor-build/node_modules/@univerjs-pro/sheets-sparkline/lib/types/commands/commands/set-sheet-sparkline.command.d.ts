import type { ICommand, IRange, ISelectionCell } from '@univerjs/core';
import type { ISparklineGroup } from '../../common/type';
export interface ISetSheetSparklineCommandProps {
    config: ISparklineGroup;
    isChangeDataSource: boolean;
    combine?: boolean;
    unCombine?: boolean;
    ranges?: IRange[];
    changeDataSourceInfo?: {
        sourceRanges: IRange[];
        targetRanges: IRange[];
        groupId: string;
        resetType: 'item' | 'group';
        primary: ISelectionCell;
    };
}
export declare const SetSheetSparklineCommand: ICommand<ISetSheetSparklineCommandProps>;
