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
import type { IDisposable } from '@univerjs/core';
import type { IRegisterFunctionParams } from '@univerjs/sheets-formula';
import { FUniver } from '@univerjs/core/facade';
/**
 * @ignore
 */
export interface IFUniverSheetsFormulaMixin {
    /**
     * Register a function to the spreadsheet.
     * @deprecated Use `univerAPI.getFormula().registerFunction` instead.
     * @param {IRegisterFunctionParams} config The configuration of the function.
     * @returns {IDisposable} The disposable instance.
     */
    registerFunction(config: IRegisterFunctionParams): IDisposable;
}
/**
 * @ignore
 */
export declare class FUniverSheetsFormulaMixin extends FUniver implements IFUniverSheetsFormulaMixin {
    /**
     * RegisterFunction may be executed multiple times, triggering multiple formula forced refreshes.
     */
    private _debouncedFormulaCalculation;
    /**
     * Initialize the FUniver instance.
     * @ignore
     */
    _initialize(): void;
    registerFunction(config: IRegisterFunctionParams): IDisposable;
}
declare module '@univerjs/core/facade' {
    interface FUniver extends IFUniverSheetsFormulaMixin {
    }
}
