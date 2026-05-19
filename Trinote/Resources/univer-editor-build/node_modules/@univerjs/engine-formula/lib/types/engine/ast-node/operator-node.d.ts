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
import type { BaseFunction } from '../../functions/base-function';
import { IFunctionService } from '../../services/function.service';
import { IFormulaRuntimeService } from '../../services/runtime.service';
import { LexerNode } from '../analysis/lexer-node';
import { BaseAstNode } from './base-ast-node';
import { BaseAstNodeFactory } from './base-ast-node-factory';
import { NodeType } from './node-type';
export declare class OperatorNode extends BaseAstNode {
    private _functionExecutor;
    private _runtimeService;
    constructor(operatorString: string, _functionExecutor: BaseFunction, _runtimeService: IFormulaRuntimeService);
    get nodeType(): NodeType;
    execute(): void;
    /**
     * If it contains an array formula, set the current cell to the cache and send itself as a ref outward
     */
    private _setEmbeddedArrayFormulaToResult;
}
export declare class OperatorNodeFactory extends BaseAstNodeFactory {
    private readonly _functionService;
    private readonly _runtimeService;
    constructor(_functionService: IFunctionService, _runtimeService: IFormulaRuntimeService);
    get zIndex(): number;
    create(param: string): BaseAstNode;
    checkAndCreateNodeType(param: LexerNode | string): BaseAstNode | undefined;
}
