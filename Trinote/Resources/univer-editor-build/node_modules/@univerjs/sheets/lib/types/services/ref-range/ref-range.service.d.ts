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
import type { IDisposable, IMutationInfo, IRange, Nullable } from '@univerjs/core';
import type { EffectRefRangeParams } from './type';
import { Disposable, ICommandService, InterceptorManager, IUniverInstanceService } from '@univerjs/core';
import { SheetsSelectionsService } from '../selections/selection.service';
import { SheetInterceptorService } from '../sheet-interceptor/sheet-interceptor.service';
type RefRangCallback = (params: EffectRefRangeParams) => {
    redos: IMutationInfo[];
    undos: IMutationInfo[];
    preRedos?: IMutationInfo[];
    preUndos?: IMutationInfo[];
};
export type WatchRangeCallback = (before: IRange, after: Nullable<IRange>) => void;
/**
 * Collect side effects caused by ref range change
 */
export declare class RefRangeService extends Disposable {
    private readonly _commandService;
    private _sheetInterceptorService;
    private _univerInstanceService;
    private _selectionManagerService;
    interceptor: InterceptorManager<{
        MERGE_REDO: import("@univerjs/core").IInterceptor<IMutationInfo<object>[], null>;
        MERGE_UNDO: import("@univerjs/core").IInterceptor<IMutationInfo<object>[], null>;
    }>;
    private _watchRanges;
    constructor(_commandService: ICommandService, _sheetInterceptorService: SheetInterceptorService, _univerInstanceService: IUniverInstanceService, _selectionManagerService: SheetsSelectionsService);
    watchRange(unitId: string, subUnitId: string, range: IRange, callback: WatchRangeCallback, skipIntersects?: boolean): IDisposable;
    private _refRangeManagerMap;
    private _serializer;
    private _onRefRangeChange;
    private _checkRange;
    /**
     * Listens to an area and triggers a fall back when movement occurs
     * @param {IRange} range the area that needs to be monitored
     * @param {RefRangCallback} callback the callback function that is executed when the range changes
     * @param {string} [_unitId]
     * @param {string} [_subUnitId]
     * @memberof RefRangeService
     */
    registerRefRange: (range: IRange, callback: RefRangCallback, _unitId?: string, _subUnitId?: string) => IDisposable;
}
export {};
