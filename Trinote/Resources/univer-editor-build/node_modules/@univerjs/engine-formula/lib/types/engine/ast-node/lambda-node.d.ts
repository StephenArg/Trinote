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
import { IFormulaRuntimeService } from '../../services/runtime.service';
import { LexerNode } from '../analysis/lexer-node';
import { Interpreter } from '../interpreter/interpreter';
import { BaseAstNode } from './base-ast-node';
import { BaseAstNodeFactory } from './base-ast-node-factory';
import { NodeType } from './node-type';
export declare class LambdaNode extends BaseAstNode {
    private _lambdaId;
    private _interpreter;
    private _lambdaPrivacyVarKeys;
    private _runtimeService;
    private _isNotEmpty;
    constructor(token: string, _lambdaId: string, _interpreter: Interpreter, _lambdaPrivacyVarKeys: string[], _runtimeService: IFormulaRuntimeService);
    get nodeType(): NodeType;
    setNotEmpty(state?: boolean): void;
    isEmptyParamFunction(): boolean;
    isFunctionParameter(): boolean;
    getLambdaId(): string;
    execute(): void;
}
export declare class LambdaNodeFactory extends BaseAstNodeFactory {
    private readonly _runtimeService;
    private readonly _interpreter;
    constructor(_runtimeService: IFormulaRuntimeService, _interpreter: Interpreter);
    get zIndex(): number;
    create(param: LexerNode): BaseAstNode;
    checkAndCreateNodeType(param: LexerNode | string): BaseAstNode | undefined;
    private _updateLambdaStatement;
}
