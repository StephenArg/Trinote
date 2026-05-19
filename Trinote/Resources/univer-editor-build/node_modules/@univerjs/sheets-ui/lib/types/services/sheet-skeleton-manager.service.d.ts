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
import type { Nullable, Workbook } from '@univerjs/core';
import type { IRender, IRenderContext, IRenderModule, SpreadsheetSkeleton } from '@univerjs/engine-render';
import type { ISheetSkeletonManagerParam } from '@univerjs/sheets';
import { Disposable } from '@univerjs/core';
import { SheetSkeletonService } from '@univerjs/sheets';
export interface ISheetSkeletonManagerSearch {
    sheetId: string;
    commandId?: string;
}
/**
 * SheetSkeletonManagerService is registered in a render unit
 */
export declare class SheetSkeletonManagerService extends Disposable implements IRenderModule {
    private readonly _context;
    private readonly _sheetSkeletonService;
    private _sheetId;
    private readonly _currentSkeleton$;
    readonly currentSkeleton$: import("rxjs").Observable<Nullable<ISheetSkeletonManagerParam>>;
    /**
     * CurrentSkeletonBefore for pre-triggered logic during registration
     */
    private readonly _currentSkeletonBefore$;
    readonly currentSkeletonBefore$: import("rxjs").Observable<Nullable<ISheetSkeletonManagerParam>>;
    constructor(_context: IRenderContext<Workbook>, _sheetSkeletonService: SheetSkeletonService);
    private _initSkeletonsRegisterGetCellHeight;
    dispose(): void;
    getCurrentSkeleton(): Nullable<SpreadsheetSkeleton>;
    /**
     * get ISheetSkeletonManagerParam from _currentSkeletonSearchParam
     */
    getCurrentParam(): Nullable<ISheetSkeletonManagerParam>;
    /**
     * Get skeleton by sheetId
     */
    getSkeleton(sheetId: string): Nullable<SpreadsheetSkeleton>;
    /**
     * Get SkeletonParam by sheetId
     */
    getSkeletonParam(sheetId: string): Nullable<ISheetSkeletonManagerParam>;
    /**
     * Command in COMMAND_LISTENER_SKELETON_CHANGE would cause setCurrent, see @packages/sheets-ui/src/controllers/render-controllers/sheet.render-controller.ts
     */
    setCurrent(searchParam: ISheetSkeletonManagerSearch): void;
    private _setCurrent;
    reCalculate(param?: Nullable<ISheetSkeletonManagerParam>): void;
    /**
     * Make param dirty, if param is dirty, then the skeleton will be makeDirty in _reCalculate()
     * @param searchParm
     * @param state
     */
    makeDirty(searchParm: ISheetSkeletonManagerSearch, state?: boolean): void;
    ensureSkeleton(sheetId: string): SpreadsheetSkeleton | undefined;
    private _getSkeletonParam;
    private _getSkeleton;
    setColumnHeaderSize(render: Nullable<IRender>, sheetId: string, size: number): void;
    setRowHeaderSize(render: Nullable<IRender>, sheetId: string, size: number): void;
}
