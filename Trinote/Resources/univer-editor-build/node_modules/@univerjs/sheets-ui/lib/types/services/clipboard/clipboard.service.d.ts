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
import type { ICellDataWithSpanAndDisplay, IDisposable, IRange, Nullable } from '@univerjs/core';
import type { IDiscreteRange } from '@univerjs/sheets';
import type { Observable } from 'rxjs';
import type { ICopyOptions, IPasteHookKeyType, IPasteOptionCache, ISheetClipboardHook } from './type';
import { Disposable, ErrorService, ICommandService, ILogService, Injector, IUndoRedoService, IUniverInstanceService, LocaleService, ObjectMatrix, ThemeService } from '@univerjs/core';
import { IRenderManagerService } from '@univerjs/engine-render';
import { SheetsSelectionsService } from '@univerjs/sheets';
import { IClipboardInterfaceService, INotificationService, IPlatformService } from '@univerjs/ui';
import { IMarkSelectionService } from '../mark-selection/mark-selection.service';
import { CopyContentCache } from './copy-content-cache';
export declare const PREDEFINED_HOOK_NAME_COPY: {
    readonly DEFAULT_COPY: "default-copy";
    readonly SPECIAL_COPY_FORMULA_ONLY: "special-copy-formula-only";
};
export declare const PREDEFINED_HOOK_NAME_PASTE: {
    readonly DEFAULT_PASTE: "default-paste";
    readonly DEFAULT_PASTE_ROWS: "default-paste-rows";
    readonly DEFAULT_PASTE_COLUMNS: "default-paste-columns";
    readonly SPECIAL_PASTE_VALUE: "special-paste-value";
    readonly SPECIAL_PASTE_FORMAT: "special-paste-format";
    readonly SPECIAL_PASTE_COL_WIDTH: "special-paste-col-width";
    readonly SPECIAL_PASTE_BESIDES_BORDER: "special-paste-besides-border";
    readonly SPECIAL_PASTE_FORMULA: "special-paste-formula";
};
export declare const PREDEFINED_HOOK_NAME: {
    readonly DEFAULT_PASTE: "default-paste";
    readonly DEFAULT_PASTE_ROWS: "default-paste-rows";
    readonly DEFAULT_PASTE_COLUMNS: "default-paste-columns";
    readonly SPECIAL_PASTE_VALUE: "special-paste-value";
    readonly SPECIAL_PASTE_FORMAT: "special-paste-format";
    readonly SPECIAL_PASTE_COL_WIDTH: "special-paste-col-width";
    readonly SPECIAL_PASTE_BESIDES_BORDER: "special-paste-besides-border";
    readonly SPECIAL_PASTE_FORMULA: "special-paste-formula";
    readonly DEFAULT_COPY: "default-copy";
    readonly SPECIAL_COPY_FORMULA_ONLY: "special-copy-formula-only";
};
interface ICopyContent {
    copyId: string;
    plain: string;
    html: string;
    matrixFragment: ObjectMatrix<ICellDataWithSpanAndDisplay>;
    discreteRange: IDiscreteRange;
}
export interface ISheetClipboardService {
    showMenu$: Observable<boolean>;
    setShowMenu: (show: boolean) => void;
    getPasteMenuVisible: () => boolean;
    pasteOptionsCache$: Observable<IPasteOptionCache | null>;
    getPasteOptionsCache: () => IPasteOptionCache | null;
    updatePasteOptionsCache(cache: IPasteOptionCache | null): void;
    copy(options?: ICopyOptions): Promise<boolean>;
    cut(): Promise<boolean>;
    paste(item: ClipboardItem, pasteType?: string): Promise<boolean>;
    pasteByCopyId(copyId: string, pasteType?: string): Promise<boolean>;
    legacyPaste(html?: string, text?: string, files?: File[]): Promise<boolean>;
    rePasteWithPasteType(type: IPasteHookKeyType): boolean;
    disposePasteOptionsCache(): void;
    generateCopyContent(workbookId: string, worksheetId: string, range: IRange, options?: ICopyOptions): Nullable<ICopyContent>;
    copyContentCache(): CopyContentCache;
    addClipboardHook(hook: ISheetClipboardHook): IDisposable;
    getClipboardHooks(): ISheetClipboardHook[];
    removeMarkSelection(): void;
}
export declare const ISheetClipboardService: import("@wendellhu/redi").IdentifierDecorator<ISheetClipboardService>;
export declare class SheetClipboardService extends Disposable implements ISheetClipboardService {
    private readonly _logService;
    private readonly _univerInstanceService;
    private readonly _selectionManagerService;
    private readonly _clipboardInterfaceService;
    private readonly _undoRedoService;
    private readonly _commandService;
    private readonly _markSelectionService;
    private readonly _notificationService;
    private readonly _platformService;
    private readonly _renderManagerService;
    private readonly _themeService;
    private readonly _localeService;
    private readonly _errorService;
    private readonly _injector;
    private _clipboardHooks;
    private readonly _clipboardHooks$;
    readonly clipboardHooks$: Observable<ISheetClipboardHook[]>;
    private _htmlToUSM;
    private _usmToHtml;
    private _copyContentCache;
    private _copyMarkId;
    private _pasteOptionsCache$;
    readonly pasteOptionsCache$: Observable<IPasteOptionCache | null>;
    private readonly _showMenu$;
    readonly showMenu$: Observable<boolean>;
    constructor(_logService: ILogService, _univerInstanceService: IUniverInstanceService, _selectionManagerService: SheetsSelectionsService, _clipboardInterfaceService: IClipboardInterfaceService, _undoRedoService: IUndoRedoService, _commandService: ICommandService, _markSelectionService: IMarkSelectionService, _notificationService: INotificationService, _platformService: IPlatformService, _renderManagerService: IRenderManagerService, _themeService: ThemeService, _localeService: LocaleService, _errorService: ErrorService, _injector: Injector);
    setShowMenu(show: boolean): void;
    getPasteMenuVisible(): boolean;
    getPasteOptionsCache(): IPasteOptionCache | null;
    copyContentCache(): CopyContentCache;
    generateCopyContent(workbookId: string, worksheetId: string, range: IRange, options?: ICopyOptions): Nullable<ICopyContent>;
    copy(options?: ICopyOptions): Promise<boolean>;
    cut(): Promise<boolean>;
    paste(item: ClipboardItem, pasteType?: "default-paste"): Promise<boolean>;
    pasteByCopyId(copyId: string, pasteType?: "default-paste"): Promise<boolean>;
    legacyPaste(html?: string, text?: string, files?: File[]): Promise<boolean>;
    rePasteWithPasteType(type: IPasteHookKeyType): boolean;
    updatePasteOptionsCache(cache: IPasteOptionCache | null): void;
    addClipboardHook(hook: ISheetClipboardHook): IDisposable;
    getClipboardHooks(): ISheetClipboardHook[];
    private _generateCopyContent;
    private _notifyClipboardHook;
    private _executePaste;
    private _pasteFiles;
    private _pastePlainText;
    private _pasteUnrecognized;
    private _pasteHTML;
    private _pasteExternal;
    private _pasteInternal;
    private _pasteUSM;
    private _getPastedRangeAutoHeightMutation;
    private _getSetSelectionOperation;
    private _getPastingTarget;
    /**
     * Handles copying one range to another range, obtained by the following rules
     *
     * [Content to be assigned] => [Target range]
     *
     * I. There are no merged cells in the upper left corner of the pasted area
     *
     * 1. 1 -> 1: 1 => 1
     * 2. N -> 1: N => N
     * 3. 1 -> N: N => N
     * 4. N1 -> N2:
     *     1) N1 <N2: If N2 is a multiple of N1 (X), N1 * X => N2; If not, N1 => N1 (refer to office excel, different from google sheet)
     *     2) N1> N2: N1 => N1
     *
     * The above four cases can be combined and processed as
     *
     * Case 1, 1/2/4-2 merged into N1 => N1
     * Case 2, 3/4-1 merge into N1 * X => N2 or Case 1
     *
     * In the end we only need to judge whether N2 is a multiple of N1
     *
     * II. The pasted area contains merged cells
     *
     * 1. If N2 is a multiple of N1,
     *   1) If N2 === N1, paste this area directly and the range remains unchanged.
     *   2) Otherwise, determine whether other cells are included
     *     1] If included, tile, the range remains unchanged
     *     2] If not included, determine whether the source data is a combined cell
     *       1} If yes, tile, the range remains unchanged
     *       2} If not, only the content will be pasted, the original style will be discarded, and the scope will remain unchanged.
     *
     * 2. If N2 is not a multiple of N1, determine whether the upper left corner cell (merged or non-merged or combined) is consistent with the size of the original data.
     *   1) If consistent, only paste this area;
     *   2) If inconsistent, then determine whether the pasted area contains other cells.
     *     1] If yes, pasting is not allowed and an error will pop up;
     *     2] If not, only the content will be pasted and the original style will be discarded.
     *
     * @param rowCount
     * @param colCount
     * @param cellMatrix
     * @param range
     */
    private _transformPastedData;
    private _getPastedRange;
    private _expandOrShrinkRowsCols;
    /**
     * Determine whether the cells starting from the upper left corner of the range (merged or non-merged or combined) are consistent with the size of the original data
     * @param cellMatrix
     * @param range
     */
    private _topLeftCellsMatch;
    removeMarkSelection(): void;
    private _initUnitDisposed;
    disposePasteOptionsCache(): void;
}
export declare function getMatrixPlainText(matrix: ObjectMatrix<ICellDataWithSpanAndDisplay>): string;
export declare const escapeSpecialCode: (cellStr: string) => string;
export {};
