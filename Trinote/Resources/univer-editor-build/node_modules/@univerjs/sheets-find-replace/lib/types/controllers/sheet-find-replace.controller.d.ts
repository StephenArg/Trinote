/**
 * Copyright 2023-present DreamNum Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import type { ICellData, IDisposable, IRange, Nullable, Workbook, Worksheet } from '@univerjs/core';
import type { IFindComplete, IFindMatch, IFindMoveParams, IFindQuery, IReplaceAllResult } from '@univerjs/find-replace';
import { Disposable, ICommandService, IContextService, Injector, IUniverInstanceService, ThemeService } from '@univerjs/core';
import { IRenderManagerService } from '@univerjs/engine-render';
import { FindModel, FindReplaceController, IFindReplaceService } from '@univerjs/find-replace';
import { SheetsSelectionsService } from '@univerjs/sheets';
import { SheetSkeletonManagerService } from '@univerjs/sheets-ui';
export declare class SheetsFindReplaceController extends Disposable implements IDisposable {
    private readonly _injector;
    private readonly _findReplaceController;
    private readonly _contextService;
    private readonly _findReplaceService;
    private readonly _commandService;
    private _provider;
    constructor(_injector: Injector, _findReplaceController: FindReplaceController, _contextService: IContextService, _findReplaceService: IFindReplaceService, _commandService: ICommandService);
    dispose(): void;
    private _init;
    private _initCommands;
}
declare const SHEETS_FIND_REPLACE_PROVIDER_NAME = "sheets-find-replace-provider";
export interface ISheetCellMatch extends IFindMatch {
    isFormula: boolean;
    provider: typeof SHEETS_FIND_REPLACE_PROVIDER_NAME;
    range: {
        subUnitId: string;
        range: IRange;
    };
}
/**
 * This class executes finding in a workbook and subscribe to the content change event so when its results changes
 * FindReplaceService would know that and update searching results. Also this class in responsible for
 * highlighting matched cells.
 */
export declare class SheetFindModel extends FindModel {
    private readonly _workbook;
    private readonly _sheetSkeletonManagerService;
    private readonly _univerInstanceService;
    private readonly _renderManagerService;
    private readonly _commandService;
    private readonly _contextService;
    private readonly _themeService;
    private readonly _matchesUpdate$;
    readonly matchesUpdate$: import("rxjs").Observable<ISheetCellMatch[]>;
    private readonly _activelyChangingMatch$;
    readonly activelyChangingMatch$: import("rxjs").Observable<ISheetCellMatch>;
    /** Hold matches by the worksheet they are in. Make it easier to track the next (or previous) match when searching in the whole workbook. */
    private _matchesByWorksheet;
    /** Hold all matches in the currently searching scope. */
    private _matches;
    /** Position of the current focused ISheetCellMatch, starting from 1. */
    private _matchesPosition;
    private _activeHighlightIndex;
    private _highlightShapes;
    private _currentHighlightShape;
    /** This properties holds the query params during this searching session. */
    private _query;
    private get _matchesCount();
    get unitId(): string;
    get matchesCount(): number;
    get matchesPosition(): number;
    get currentMatch(): Nullable<ISheetCellMatch>;
    private _workbookSelections;
    constructor(_workbook: Workbook, _sheetSkeletonManagerService: SheetSkeletonManagerService, _univerInstanceService: IUniverInstanceService, _renderManagerService: IRenderManagerService, _commandService: ICommandService, _contextService: IContextService, _themeService: ThemeService, _selectionManagerService: SheetsSelectionsService);
    dispose(): void;
    getMatches(): IFindMatch[];
    start(query: IFindQuery): void;
    focusSelection(): void;
    private _toggleDisplayRawFormula;
    /**
     * Find all matches in the current workbook no matter which worksheet is activated.
     * @param query the query object
     * @returns the query complete event
     */
    findInWorkbook(query: IFindQuery): IFindComplete;
    /**
     * This method is used in `findInWorkbook`. When the active sheet changes, this method helps to find the next match
     * in the new worksheet.
     */
    private _findNextMatchOnActiveSheetChange;
    /**
     * Find all matches (only) in the currently activated worksheet.
     * @param query the query object
     * @returns the query complete event
     */
    findInActiveWorksheet(query: IFindQuery): IFindComplete;
    private _findInRange;
    private _findInSelections;
    /** Find matches in a given worksheet. */
    private _findInWorksheet;
    private _disposeHighlights;
    private _updateFindHighlight;
    private _updateCurrentHighlightShape;
    private _getSheetObject;
    private _focusMatch;
    private _tryRestoreLastMatchesPosition;
    moveToNextMatch(params?: IFindMoveParams): ISheetCellMatch | null;
    moveToPreviousMatch(params?: IFindMoveParams): ISheetCellMatch | null;
    private _findPreviousMatch;
    private _findNextMatch;
    private _findPreviousWorksheetThatHasAMatch;
    private _findNextWorksheetThatHasAMatch;
    private _findNextMatchByRange;
    private _findPreviousMatchByRange;
    replace(replaceString: string): Promise<boolean>;
    replaceAll(replaceString: string): Promise<IReplaceAllResult>;
    private _getReplacedCellData;
}
interface IValuePassingObject {
    hit: boolean;
    replaceable: boolean;
    isFormula: boolean;
    rawData: Nullable<ICellData>;
}
/**
 * This function determines if a cell's content matches what is searched for.
 * @param worksheet worksheet the Worksheet to search
 * @param row the row index
 * @param col the column index
 * @param query the parsed query object
 * @returns if the cell is hit, replaceable and is a formula
 */
export declare function hitCell(worksheet: Worksheet, row: number, col: number, query: IFindQuery, cellData: ICellData): IValuePassingObject;
export {};
