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
import type { IRange, Nullable } from '@univerjs/core';
import type { ISheetRangeLocation } from '@univerjs/sheets';
import { Disposable, ICommandService, IConfirmService, IUniverInstanceService, LocaleService } from '@univerjs/core';
import { SheetsSelectionsService } from '@univerjs/sheets';
import { SheetsSortService } from '@univerjs/sheets-sort';
export declare enum EXTEND_TYPE {
    KEEP = "keep",
    EXTEND = "extend",
    CANCEL = "cancel"
}
export interface ICustomSortState {
    location?: ISheetSortLocation;
    show: boolean;
}
export interface ISheetSortLocation extends ISheetRangeLocation {
    colIndex: number;
}
export declare class SheetsSortUIService extends Disposable {
    private readonly _univerInstanceService;
    private readonly _confirmService;
    private readonly _selectionManagerService;
    private readonly _sheetsSortService;
    private readonly _localeService;
    private readonly _commandService;
    private readonly _customSortState$;
    readonly customSortState$: import("rxjs").Observable<Nullable<ICustomSortState>>;
    constructor(_univerInstanceService: IUniverInstanceService, _confirmService: IConfirmService, _selectionManagerService: SheetsSelectionsService, _sheetsSortService: SheetsSortService, _localeService: LocaleService, _commandService: ICommandService);
    triggerSortDirectly(asc: boolean, extend: boolean, sheetRangeLocation?: ISheetSortLocation): Promise<boolean>;
    triggerSortCustomize(): Promise<boolean>;
    customSortState(): Nullable<ICustomSortState>;
    getTitles(hasTitle: boolean): {
        index: number;
        label: string;
    }[];
    setSelection(unitId: string, subUnitId: string, range: IRange): void;
    showCheckError(content: string): Promise<boolean>;
    showExtendConfirm(): Promise<EXTEND_TYPE>;
    showCustomSortPanel(location: ISheetSortLocation): void;
    closeCustomSortPanel(): void;
    private _check;
    private _detectSortLocation;
}
