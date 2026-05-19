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
import { Disposable } from '@univerjs/core';
import { IFormulaCurrentConfigService } from '../../services/current-data.service';
import { IDefinedNamesService } from '../../services/defined-names.service';
import { LexerTreeBuilder } from './lexer-tree-builder';
export declare class Lexer extends Disposable {
    private readonly _definedNamesService;
    private readonly _lexerTreeBuilder;
    private readonly _formulaCurrentConfigService;
    constructor(_definedNamesService: IDefinedNamesService, _lexerTreeBuilder: LexerTreeBuilder, _formulaCurrentConfigService: IFormulaCurrentConfigService);
    treeBuilder(formulaString: string, transformSuffix?: boolean): import("../..").ErrorType.VALUE | import("./lexer-node").LexerNode | (string | import("./lexer-node").LexerNode)[] | undefined;
}
