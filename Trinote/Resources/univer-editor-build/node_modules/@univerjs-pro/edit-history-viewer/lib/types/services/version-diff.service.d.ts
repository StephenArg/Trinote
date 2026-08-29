import type { IMutationInfo, IRange } from '@univerjs/core';
import { ISnapshotServerService, ITransformService } from '@univerjs-pro/collaboration';
import { SheetsChartService } from '@univerjs-pro/sheets-chart';
import { SheetsPivotTableConfigModel } from '@univerjs-pro/sheets-pivot';
import { SparklineDataSourceModel } from '@univerjs-pro/sheets-sparkline';
import { Disposable, LocaleService } from '@univerjs/core';
import { RangeProtectionRuleModel } from '@univerjs/sheets';
import { ConditionalFormattingRuleModel } from '@univerjs/sheets-conditional-formatting';
import { SheetDataValidationModel } from '@univerjs/sheets-data-validation';
import { SheetsFilterService } from '@univerjs/sheets-filter';
import { SheetTableService } from '@univerjs/sheets-table';
import { HistoryFetchService } from './history-fetch.service';
import { HistoryManagerService } from './history-manager.service';
export interface ISheetRange {
    unitId: string;
    subUnitId: string;
    range: IRange;
    highlightRow?: boolean;
    highlightColumn?: boolean;
    showText?: string;
}
export interface ISheetDrawing {
    unitId: string;
    subUnitId: string;
    drawingId: string;
    showText?: string;
}
export interface IVersionDiff {
    ranges: Map<string, ISheetRange[]>;
    insertCellRanges?: Map<string, ISheetRange[]>;
    deleteCellRanges?: Map<string, ISheetRange[]>;
    updateCellRanges?: Map<string, ISheetRange[]>;
    insertBorderRanges?: Map<string, ISheetRange[]>;
    deleteBorderRanges?: Map<string, ISheetRange[]>;
    updateBorderRanges?: Map<string, ISheetRange[]>;
    arrowRowRanges?: Map<string, ISheetRange[]>;
    arrowColumnRanges?: Map<string, ISheetRange[]>;
    updateDrawings?: Map<string, ISheetDrawing[]>;
    insertDrawings?: Map<string, ISheetDrawing[]>;
    deleteDrawings?: Map<string, ISheetDrawing[]>;
    subUnitIds: string[];
    active: string | null;
}
export interface IMutationInfoWithMemberId extends IMutationInfo {
    memberId: string;
}
export declare class VersionDiffService extends Disposable {
    private readonly _historyManagerService;
    private readonly _transformService;
    private readonly _snapshotServerService;
    private readonly _rangeProtectionRuleModel;
    private _conditionalFormattingRuleModel;
    private _dataValidationModel;
    private _sheetsFilterService;
    private readonly _sparklineDataSourceModel;
    private readonly _sheetsPivotTableConfigModel;
    private _sheetTableService;
    protected readonly _localeService: LocaleService;
    private readonly _sheetsChartService;
    private readonly _historyFetchService;
    private _diffRangesMap;
    private _currentVersionDiff$;
    readonly currentVersionDiff$: import("rxjs").Observable<IVersionDiff>;
    constructor(_historyManagerService: HistoryManagerService, _transformService: ITransformService, _snapshotServerService: ISnapshotServerService, _rangeProtectionRuleModel: RangeProtectionRuleModel, _conditionalFormattingRuleModel: ConditionalFormattingRuleModel, _dataValidationModel: SheetDataValidationModel, _sheetsFilterService: SheetsFilterService, _sparklineDataSourceModel: SparklineDataSourceModel, _sheetsPivotTableConfigModel: SheetsPivotTableConfigModel, _sheetTableService: SheetTableService, _localeService: LocaleService, _sheetsChartService: SheetsChartService, _historyFetchService: HistoryFetchService);
    private _init;
    ensureVersion(versionId: string): Promise<void>;
    getMutationActionMap(): Map<string, string>;
    categorizeMutationRanges(mutation: IMutationInfo, mutationActionMap: Map<string, string>): {
        allRanges: ISheetRange[];
        insertCellRanges: ISheetRange[];
        deleteCellRanges: ISheetRange[];
        updateCellRanges: ISheetRange[];
        insertBorderRanges: ISheetRange[];
        deleteBorderRanges: ISheetRange[];
        updateBorderRanges: ISheetRange[];
        arrowRowRanges: ISheetRange[];
        arrowColumnRanges: ISheetRange[];
        insertDrawings: ISheetDrawing[];
        deleteDrawings: ISheetDrawing[];
        updateDrawings: ISheetDrawing[];
        subUnitIds: string[];
    };
    private _transformMutationByOrder;
    private _yieldToMain;
    private _getActiveSubUnitId;
    private _extractRanges;
    private _categorizeMutationRanges;
    private _combineRanges;
}
