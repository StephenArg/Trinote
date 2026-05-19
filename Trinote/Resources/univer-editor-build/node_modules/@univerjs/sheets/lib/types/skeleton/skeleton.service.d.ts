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
import type { Nullable, Styles, Worksheet } from '@univerjs/core';
import type { Scene } from '@univerjs/engine-render';
import { Disposable, Injector, IUniverInstanceService } from '@univerjs/core';
import { SpreadsheetSkeleton } from '@univerjs/engine-render';
export interface ISheetSkeletonManagerParam {
    unitId: string;
    sheetId: string;
    skeleton: SpreadsheetSkeleton;
    dirty: boolean;
    commandId?: string;
}
export declare class SheetSkeletonService extends Disposable {
    readonly _injector: Injector;
    private readonly _univerInstanceService;
    private _sceneMap;
    private _sheetSkeletonParamStore;
    private _buildSkeleton$;
    readonly buildSkeleton$: import("rxjs").Observable<SpreadsheetSkeleton>;
    constructor(_injector: Injector, _univerInstanceService: IUniverInstanceService);
    dispose(): void;
    private _disposeByUnitId;
    private _init;
    private _initWorkbookSkeleton;
    private _initSheetsSkeleton;
    private _buildSkeleton;
    setScene(unitId: string, scene: Scene): void;
    getSkeletonsByUnitId(unitId: string): SpreadsheetSkeleton[];
    getSkeleton(unitId: string, subUnitId: string): Nullable<SpreadsheetSkeleton>;
    getSkeletonParam(unitId: string, subUnitId: string): Nullable<ISheetSkeletonManagerParam>;
    newSkeleton(unitId: string, subUnitId: string, worksheet: Worksheet, styles: Styles): SpreadsheetSkeleton;
    newSkeletonParam(unitId: string, subUnitId: string, worksheet: Worksheet, styles: Styles): ISheetSkeletonManagerParam;
    ensureSkeleton(unitId: string, subUnitId: string): SpreadsheetSkeleton | undefined;
}
