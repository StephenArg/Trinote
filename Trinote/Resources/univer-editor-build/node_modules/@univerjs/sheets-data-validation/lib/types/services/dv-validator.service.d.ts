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
import type { IDataValidationRule, IRange, Nullable, ObjectMatrix } from '@univerjs/core';
import { DataValidationStatus, Disposable, IUniverInstanceService, LifecycleService } from '@univerjs/core';
import { SheetDataValidationModel } from '../models/sheet-data-validation-model';
import { DataValidationCacheService } from './dv-cache.service';
export declare class SheetsDataValidationValidatorService extends Disposable {
    private readonly _univerInstanceService;
    private readonly _sheetDataValidationModel;
    private readonly _dataValidationCacheService;
    private readonly _lifecycleService;
    constructor(_univerInstanceService: IUniverInstanceService, _sheetDataValidationModel: SheetDataValidationModel, _dataValidationCacheService: DataValidationCacheService, _lifecycleService: LifecycleService);
    private _initRecalculate;
    private _validatorByCell;
    validatorCell(unitId: string, subUnitId: string, row: number, col: number): Promise<DataValidationStatus>;
    validatorRanges(unitId: string, subUnitId: string, ranges: IRange[]): Promise<DataValidationStatus[][]>;
    validatorWorksheet(unitId: string, subUnitId: string): Promise<ObjectMatrix<Nullable<DataValidationStatus>>>;
    validatorWorkbook(unitId: string): Promise<Record<string, ObjectMatrix<Nullable<DataValidationStatus>>>>;
    getDataValidations(unitId: string, subUnitId: string, ranges: IRange[]): IDataValidationRule[];
    getDataValidation(unitId: string, subUnitId: string, ranges: IRange[]): Nullable<IDataValidationRule>;
}
