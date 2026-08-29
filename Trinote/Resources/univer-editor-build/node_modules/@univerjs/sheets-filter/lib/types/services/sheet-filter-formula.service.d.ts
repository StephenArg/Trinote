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
import { Disposable, IUniverInstanceService } from '@univerjs/core';
import { IActiveDirtyManagerService, ISheetRowFilteredService } from '@univerjs/engine-formula';
import { SheetsFilterService } from './sheet-filter.service';
/**
 * Hidden rows after filtering affect formula calculations, such as SUBTOTAL
 */
export declare class SheetsFilterFormulaService extends Disposable {
    private _activeDirtyManagerService;
    private _sheetRowFilteredService;
    private _sheetsFilterService;
    private readonly _univerInstanceService;
    constructor(_activeDirtyManagerService: IActiveDirtyManagerService, _sheetRowFilteredService: ISheetRowFilteredService, _sheetsFilterService: SheetsFilterService, _univerInstanceService: IUniverInstanceService);
    private _initFormulaDirtyRange;
    private _getHideRowMutation;
    private _registerSheetRowFiltered;
}
