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
import { Disposable } from '@univerjs/core';
import { IFormulaRuntimeService } from '../../services/runtime.service';
import { AstRootNodeFactory } from '../ast-node/ast-root-node';
import { FunctionNodeFactory } from '../ast-node/function-node';
import { LambdaNodeFactory } from '../ast-node/lambda-node';
import { LambdaParameterNodeFactory } from '../ast-node/lambda-parameter-node';
import { OperatorNodeFactory } from '../ast-node/operator-node';
import { PrefixNodeFactory } from '../ast-node/prefix-node';
import { ReferenceNodeFactory } from '../ast-node/reference-node';
import { SuffixNodeFactory } from '../ast-node/suffix-node';
import { UnionNodeFactory } from '../ast-node/union-node';
import { ValueNodeFactory } from '../ast-node/value-node';
import { LexerNode } from './lexer-node';
export declare class AstTreeBuilder extends Disposable {
    private readonly _runtimeService;
    private readonly _astRootNodeFactory;
    private readonly _functionNodeFactory;
    private readonly _lambdaNodeFactory;
    private readonly _lambdaParameterNodeFactory;
    private readonly _operatorNodeFactory;
    private readonly _prefixNodeFactory;
    private readonly _referenceNodeFactory;
    private readonly _suffixNodeFactory;
    private readonly _unionNodeFactory;
    private readonly _valueNodeFactory;
    private _astNodeFactoryList;
    constructor(_runtimeService: IFormulaRuntimeService, _astRootNodeFactory: AstRootNodeFactory, _functionNodeFactory: FunctionNodeFactory, _lambdaNodeFactory: LambdaNodeFactory, _lambdaParameterNodeFactory: LambdaParameterNodeFactory, _operatorNodeFactory: OperatorNodeFactory, _prefixNodeFactory: PrefixNodeFactory, _referenceNodeFactory: ReferenceNodeFactory, _suffixNodeFactory: SuffixNodeFactory, _unionNodeFactory: UnionNodeFactory, _valueNodeFactory: ValueNodeFactory);
    dispose(): void;
    parse(lexerNode: LexerNode): Nullable<BaseAstNode>;
    private _lambdaParameterHandler;
    private _changeLetToLambda;
    private _parse;
    private _checkAstNode;
    private _initializeAstNode;
}
