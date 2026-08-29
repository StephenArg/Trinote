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
import type { ISheetDataValidationRule } from '@univerjs/core';
import { Disposable, Injector } from '@univerjs/core';
import { DataValidatorRegistryService } from '@univerjs/data-validation';
import { RefRangeService } from '@univerjs/sheets';
import { FormulaRefRangeService } from '@univerjs/sheets-formula';
import { SheetDataValidationModel } from '../models/sheet-data-validation-model';
import { DataValidationFormulaService } from '../services/dv-formula.service';
export declare class DataValidationRefRangeController extends Disposable {
    private _dataValidationModel;
    private _injector;
    private _refRangeService;
    private _dataValidationFormulaService;
    private _formulaRefRangeService;
    private _validatorRegistryService;
    private _disposableMap;
    constructor(_dataValidationModel: SheetDataValidationModel, _injector: Injector, _refRangeService: RefRangeService, _dataValidationFormulaService: DataValidationFormulaService, _formulaRefRangeService: FormulaRefRangeService, _validatorRegistryService: DataValidatorRegistryService);
    private _getIdWithUnitId;
    registerRule: (unitId: string, subUnitId: string, rule: ISheetDataValidationRule) => void;
    registerFormula(unitId: string, subUnitId: string, rule: ISheetDataValidationRule): void;
    register(unitId: string, subUnitId: string, rule: ISheetDataValidationRule): void;
    private _initRefRange;
}
