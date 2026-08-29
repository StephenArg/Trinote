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
import { Disposable, ICommandService } from '@univerjs/core';
import { RefRangeService, SheetsSelectionsService } from '@univerjs/sheets';
import { HyperLinkModel } from '../models/hyper-link.model';
export declare class SheetsHyperLinkRefRangeController extends Disposable {
    private readonly _refRangeService;
    private readonly _hyperLinkModel;
    private readonly _selectionManagerService;
    private readonly _commandService;
    private _disposableMap;
    private _watchDisposableMap;
    private _rangeDisableMap;
    private _rangeWatcherMap;
    constructor(_refRangeService: RefRangeService, _hyperLinkModel: HyperLinkModel, _selectionManagerService: SheetsSelectionsService, _commandService: ICommandService);
    private _handlePositionChange;
    private _registerPosition;
    private _watchPosition;
    private _unregisterPosition;
    private _unwatchPosition;
    private _registerRange;
    private _unregisterRange;
    private _unwatchRange;
    private _initData;
    private _initRefRange;
}
