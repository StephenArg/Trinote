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
import type { IDisposable, Nullable } from '@univerjs/core';
import type { IFunctionInfo, IFunctionNames } from '../basics/function';
import type { BaseFunction } from '../functions/base-function';
import { Disposable } from '@univerjs/core';
export interface IFunctionService {
    /**
     * Use register to register a function, new CustomFunction(inject, name)
     */
    registerExecutors(...functions: BaseFunction[]): void;
    getExecutors(): Map<IFunctionNames, BaseFunction>;
    /**
     * Obtain the operator of the function to reuse the calculation logic.
     * The argument type accepted by the function is: FunctionVariantType.
     * For instance, the sum formula capability is needed for the statistics bar.
     * You can obtain the calculation result by using
     * const sum = formulaService.getExecutor(FUNCTION_NAMES_MATH.SUM);
     * sum.calculate(new RangeReferenceObject(range, sheetId, unitId), ref2, re3).
     * @param functionName Function name, which can be obtained through the FUNCTION_NAMES enumeration.
     * @returns
     */
    getExecutor(functionToken: IFunctionNames): Nullable<BaseFunction>;
    hasExecutor(functionToken: IFunctionNames): boolean;
    unregisterExecutors(...functionTokens: IFunctionNames[]): void;
    registerDescriptions(...functions: IFunctionInfo[]): IDisposable;
    getDescriptions(): Map<IFunctionNames, IFunctionInfo>;
    getDescription(functionToken: IFunctionNames): IFunctionInfo | undefined;
    hasDescription(functionToken: IFunctionNames): boolean;
    unregisterDescriptions(...functionTokens: IFunctionNames[]): void;
    clearDescriptions(): void;
    deleteFormulaAstCacheKey(...functionToken: IFunctionNames[]): void;
}
export declare const IFunctionService: import("@wendellhu/redi").IdentifierDecorator<IFunctionService>;
export declare class FunctionService extends Disposable implements IFunctionService {
    private _functionExecutors;
    private _functionDescriptions;
    dispose(): void;
    registerExecutors(...functions: BaseFunction[]): void;
    getExecutors(): Map<IFunctionNames, BaseFunction>;
    getExecutor(functionToken: IFunctionNames): BaseFunction | undefined;
    hasExecutor(functionToken: IFunctionNames): boolean;
    unregisterExecutors(...functionTokens: IFunctionNames[]): void;
    registerDescriptions(...descriptions: IFunctionInfo[]): IDisposable;
    getDescriptions(): Map<IFunctionNames, IFunctionInfo>;
    getDescription(functionToken: IFunctionNames): IFunctionInfo | undefined;
    hasDescription(functionToken: IFunctionNames): boolean;
    unregisterDescriptions(...functionTokens: IFunctionNames[]): void;
    clearDescriptions(): void;
    deleteFormulaAstCacheKey(...functionToken: IFunctionNames[]): void;
}
