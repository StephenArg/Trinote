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
import { Disposable, Injector, IUniverInstanceService } from '@univerjs/core';
import { IAutoFillService } from '../services/auto-fill/auto-fill.service';
export declare class AutoFillController extends Disposable {
    private readonly _univerInstanceService;
    private readonly _autoFillService;
    private readonly _injector;
    private _beforeApplyData;
    private _copyData;
    constructor(_univerInstanceService: IUniverInstanceService, _autoFillService: IAutoFillService, _injector: Injector);
    private _init;
    quit(): void;
    private _initDefaultHook;
    private _presetAndCacheData;
    private _getApplyData;
    private _applyFunctions;
    private _getCopyData;
    private _getEmptyCopyDataPiece;
    private _getMergeApplyData;
    private _fillData;
    private _shouldDisableSeries;
    private _getPreferredApplyType;
}
