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
import { IFormulaCurrentConfigService } from '../../services/current-data.service';
import { IFunctionService } from '../../services/function.service';
import { Lexer } from '../analysis/lexer';
import { LexerNode } from '../analysis/lexer-node';
import { BaseAstNode, ErrorNode } from './base-ast-node';
import { BaseAstNodeFactory } from './base-ast-node-factory';
import { NodeType } from './node-type';
export declare class SuffixNode extends BaseAstNode {
    private _currentConfigService;
    private _lexer;
    private _operatorString;
    private _functionExecutor?;
    constructor(_currentConfigService: IFormulaCurrentConfigService, _lexer: Lexer, _operatorString: string, _functionExecutor?: BaseFunction | undefined);
    get nodeType(): NodeType;
    execute(): void;
    private _handlerPound;
}
export declare class SuffixNodeFactory extends BaseAstNodeFactory {
    private readonly _functionService;
    private readonly _lexer;
    private readonly _currentConfigService;
    constructor(_functionService: IFunctionService, _lexer: Lexer, _currentConfigService: IFormulaCurrentConfigService);
    get zIndex(): number;
    checkAndCreateNodeType(param: LexerNode | string): ErrorNode | SuffixNode | undefined;
}
