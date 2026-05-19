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
import { FormulaDataModel } from '../models/formula-data.model';
import { ICalculateFormulaService } from '../services/calculate-formula.service';
export declare class CalculateController extends Disposable {
    private readonly _commandService;
    private readonly _calculateFormulaService;
    private readonly _formulaDataModel;
    constructor(_commandService: ICommandService, _calculateFormulaService: ICalculateFormulaService, _formulaDataModel: FormulaDataModel);
    private _initialize;
    private _commandExecutedListener;
    private _calculate;
    private _queryFormulaDependencyJson;
    private _queryFormulaDependencyAllJson;
    private _generateAllDependencyTreeJson;
    private _generateCellDependencyTreeJson;
    private _calculateFormulaString;
    private _initialExecuteFormulaListener;
    private _applyTreeResult;
    private _applyResult;
}
