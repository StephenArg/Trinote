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
import type { Nullable } from '@univerjs/core';
import type { BaseAstNode } from '../ast-node/base-ast-node';
import type { FunctionVariantType } from '../reference-object/base-reference-object';
import type { IExecuteAstNodeData } from '../utils/ast-node-tool';
import type { PreCalculateNodeType } from '../utils/node-type';
import { Disposable } from '@univerjs/core';
import { IFormulaRuntimeService } from '../../services/runtime.service';
export declare class Interpreter extends Disposable {
    private readonly _runtimeService;
    constructor(_runtimeService: IFormulaRuntimeService);
    executeAsync(nodeData: IExecuteAstNodeData): Promise<FunctionVariantType>;
    execute(nodeData: IExecuteAstNodeData): FunctionVariantType;
    executePreCalculateNode(node: PreCalculateNodeType): Nullable<FunctionVariantType>;
    checkAsyncNode(node: Nullable<BaseAstNode>): boolean;
    private _checkAsyncNode;
    private _executeAsync;
    private _execute;
}
