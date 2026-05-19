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
import type { IRange, Workbook } from '@univerjs/core';
import type { IRenderContext, IRenderModule, SpreadsheetSkeleton } from '@univerjs/engine-render';
import { Disposable, ICommandService } from '@univerjs/core';
import { SheetSkeletonManagerService } from './sheet-skeleton-manager.service';
export interface IAutoHeightTask {
    ranges: IRange[];
    maxTime?: number;
    sheetId: string;
    id: string;
}
export interface IAutoHeightTaskInfo extends IAutoHeightTask {
    startTime: number;
    skeleton: SpreadsheetSkeleton;
}
export declare const IAutoHeightService: import("@wendellhu/redi").IdentifierDecorator<unknown>;
export declare function taskRowsFromRanges(ranges: IRange[], rows: number): {
    result: IRange[];
    lasts: IRange[];
};
export declare class AutoHeightService extends Disposable implements IRenderModule {
    private _context;
    private readonly _sheetSkeletonManagerService;
    private readonly _commandService;
    private _autoHeightTasks;
    private _calculateLoopId;
    constructor(_context: IRenderContext<Workbook>, _sheetSkeletonManagerService: SheetSkeletonManagerService, _commandService: ICommandService);
    private _initMarkDirty;
    private _loopTask;
    private _calculateLoop;
    private _initialCalculateLoop;
    startAutoHeightTask(task: IAutoHeightTask): void;
    cancelTask(taskId: string): void;
}
