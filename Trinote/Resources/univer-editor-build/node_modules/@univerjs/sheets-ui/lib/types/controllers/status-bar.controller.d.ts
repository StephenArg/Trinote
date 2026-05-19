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
import type { IRange, Worksheet } from '@univerjs/core';
import type { ArrayValueObject } from '@univerjs/engine-formula';
import { Disposable, ICommandService, InterceptorManager, IUniverInstanceService } from '@univerjs/core';
import { FormulaDataModel } from '@univerjs/engine-formula';
import { INumfmtService, SheetsSelectionsService } from '@univerjs/sheets';
import { IStatusBarService } from '../services/status-bar.service';
export declare const STATUS_BAR_PERMISSION_CORRECT: import("@univerjs/core").IInterceptor<ArrayValueObject[], ArrayValueObject[]>;
export declare class StatusBarController extends Disposable {
    private readonly _univerInstanceService;
    private readonly _selectionManagerService;
    private readonly _statusBarService;
    private readonly _commandService;
    private _numfmtService;
    private readonly _formulaDataModel;
    interceptor: InterceptorManager<{
        STATUS_BAR_PERMISSION_CORRECT: import("@univerjs/core").IInterceptor<ArrayValueObject[], ArrayValueObject[]>;
    }>;
    constructor(_univerInstanceService: IUniverInstanceService, _selectionManagerService: SheetsSelectionsService, _statusBarService: IStatusBarService, _commandService: ICommandService, _numfmtService: INumfmtService, _formulaDataModel: FormulaDataModel);
    private _init;
    private _registerSelectionListener;
    private _clearResult;
    getRangeStartEndInfo(range: IRange, sheet: Worksheet): IRange;
    private _getCellValue;
    private _calculateSelection;
}
