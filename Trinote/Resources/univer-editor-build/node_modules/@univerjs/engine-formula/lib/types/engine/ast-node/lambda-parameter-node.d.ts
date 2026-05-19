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
import type { LambdaPrivacyVarType } from './base-ast-node';
import { LexerNode } from '../analysis/lexer-node';
import { BaseAstNode } from './base-ast-node';
import { BaseAstNodeFactory } from './base-ast-node-factory';
import { NodeType } from './node-type';
export declare class LambdaParameterNode extends BaseAstNode {
    private _lambdaParameter;
    private _currentLambdaPrivacyVar;
    constructor(token: string, _lambdaParameter: string, _currentLambdaPrivacyVar: LambdaPrivacyVarType);
    getLambdaParameter(): string;
    getCurrentLambdaPrivacyVar(): LambdaPrivacyVarType;
    get nodeType(): NodeType;
    execute(): void;
}
export declare class LambdaParameterNodeFactory extends BaseAstNodeFactory {
    get zIndex(): number;
    create(param: LexerNode): BaseAstNode;
    checkAndCreateNodeType(param: LexerNode | string): BaseAstNode | undefined;
}
