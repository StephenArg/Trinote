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
import type { BaseFunction } from '../../functions/base-function';
import { IFunctionService } from '../../services/function.service';
import { IFormulaRuntimeService } from '../../services/runtime.service';
import { LexerNode } from '../analysis/lexer-node';
import { BaseAstNode, ErrorNode } from './base-ast-node';
import { BaseAstNodeFactory } from './base-ast-node-factory';
import { NodeType } from './node-type';
export declare class PrefixNode extends BaseAstNode {
    private _runtimeService;
    private _operatorString;
    private _functionExecutor?;
    constructor(_runtimeService: IFormulaRuntimeService, _operatorString: string, _functionExecutor?: Nullable<BaseFunction>);
    get nodeType(): NodeType;
    execute(): void;
    private _handlerAT;
}
export declare class PrefixNodeFactory extends BaseAstNodeFactory {
    private readonly _functionService;
    private readonly _runtimeService;
    constructor(_functionService: IFunctionService, _runtimeService: IFormulaRuntimeService);
    get zIndex(): number;
    checkAndCreateNodeType(param: LexerNode | string): ErrorNode | PrefixNode | undefined;
}
