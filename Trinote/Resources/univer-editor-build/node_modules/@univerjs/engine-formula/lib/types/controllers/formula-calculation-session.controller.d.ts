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
import { Disposable, ICommandService, IUniverInstanceService } from '@univerjs/core';
import { FormulaCalculationSessionService } from '../services/formula/formula-calculation-session.service';
import { RegisterOtherFormulaService } from '../services/register-other-formula.service';
export declare class FormulaCalculationSessionController extends Disposable {
    private readonly _commandService;
    private readonly _univerInstanceService;
    private readonly _sessionService;
    private readonly _registerOtherFormulaService;
    constructor(_commandService: ICommandService, _univerInstanceService: IUniverInstanceService, _sessionService: FormulaCalculationSessionService, _registerOtherFormulaService: RegisterOtherFormulaService);
    private _initialize;
    private _handleNotification;
    private _handleResult;
    private _hasSheetResultToApply;
    private _hasBaseResultToApply;
    private _hasUnitResultToApply;
    private _hasOtherFormulaResultToApply;
}
