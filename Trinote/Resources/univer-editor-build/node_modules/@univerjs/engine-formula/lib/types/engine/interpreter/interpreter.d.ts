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
import type { DateSystem, Nullable } from '@univerjs/core';
import type { BaseAstNode } from '../ast-node/base-ast-node';
import type { FunctionVariantType } from '../reference-object/base-reference-object';
import type { IExecuteAstNodeData } from '../utils/ast-node-tool';
import type { PreCalculateNodeType } from '../utils/node-type';
import { Disposable } from '@univerjs/core';
import { IFormulaCurrentConfigService } from '../../services/current-data.service';
import { IFormulaRuntimeService } from '../../services/runtime.service';
type InterpreterRuntimeService = Pick<IFormulaRuntimeService, 'currentColumn' | 'currentRow' | 'currentUnitId' | 'isStopExecution'>;
export declare class Interpreter extends Disposable {
    private readonly _runtimeService;
    private readonly _currentConfigService;
    constructor(_runtimeService: InterpreterRuntimeService, _currentConfigService: IFormulaCurrentConfigService);
    executeAsync(nodeData: IExecuteAstNodeData): Promise<FunctionVariantType>;
    execute(nodeData: IExecuteAstNodeData): FunctionVariantType;
    executePreCalculateNode(node: PreCalculateNodeType): Nullable<FunctionVariantType>;
    checkAsyncNode(node: Nullable<BaseAstNode>): boolean;
    private _checkAsyncNode;
    private _executeAsync;
    private _execute;
    private _executeLazyFunctionAsync;
    private _executeLazyFunction;
    private _executeLazyIfAsync;
    private _executeLazyIf;
    private _executeLazyIfErrorAsync;
    private _executeLazyIfError;
    getDateSystem(): DateSystem;
    private _toLazyIfErrorValue;
    private _toLazyIfSelectedValue;
    private _implicitLazyIfReferenceValue;
    private _preserveLazyIfSelectedReferenceArray;
    private _implicitLazyIfArrayValue;
}
export {};
