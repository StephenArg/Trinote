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
import type { IMutationInfo } from '@univerjs/core';
import type { ISetRangeValuesMutationParams } from '../commands/mutations/set-range-values.mutation';
import { Disposable, ICommandService, IUniverInstanceService } from '@univerjs/core';
/**
 * Service to schedule and execute remaining SetRangeValuesMutation tasks
 * during browser idle time after a sheet copy operation.
 *
 * This improves user experience by:
 * 1. Immediately showing the copied sheet with first chunk of data
 * 2. Filling remaining data in background during idle time
 * 3. Automatically canceling tasks if the sheet is deleted
 * 4. Warning user if they try to close while tasks are pending
 */
export declare class SheetLazyExecuteScheduleService extends Disposable {
    private readonly _commandService;
    private readonly _univerInstanceService;
    private _tasks;
    private _idleCallbackId;
    private _beforeUnloadHandler;
    constructor(_commandService: ICommandService, _univerInstanceService: IUniverInstanceService);
    /**
     * Check if there are any pending tasks
     */
    hasPendingTasks(): boolean;
    /**
     * Get the count of pending mutations across all tasks
     */
    getPendingMutationsCount(): number;
    /**
     * Schedule mutations to be executed during idle time
     * @param unitId - The workbook unit ID
     * @param subUnitId - The sheet ID (newly created sheet)
     * @param mutations - Remaining SetRangeValuesMutation to execute
     */
    scheduleMutations(unitId: string, subUnitId: string, mutations: IMutationInfo<ISetRangeValuesMutationParams>[]): void;
    /**
     * Cancel scheduled mutations for a specific sheet
     * Called when the sheet is deleted
     */
    cancelScheduledMutations(unitId: string, subUnitId: string): void;
    private _cancelTask;
    private _cancelAllTasks;
    private _scheduleNextIdle;
    private _processIdleTasks;
    private _isSheetExist;
    private _setupBeforeUnloadListener;
    private _removeBeforeUnloadListener;
}
