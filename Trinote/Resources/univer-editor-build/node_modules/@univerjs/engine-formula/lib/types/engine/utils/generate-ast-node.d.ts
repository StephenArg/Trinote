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
import type { IFormulaCurrentConfigService } from '../../services/current-data.service';
import type { Lexer } from '../analysis/lexer';
import type { AstTreeBuilder } from '../analysis/parser';
import type { AstRootNode } from '../ast-node/ast-root-node';
import type { IFormulaDependencyTree } from '../dependency/dependency-tree';
import { FormulaAstLRU } from '../../basics/cache-lru';
export declare const FORMULA_AST_CACHE: FormulaAstLRU<AstRootNode>;
export declare function generateAstNode(unitId: string, formulaString: string, lexer: Lexer, astTreeBuilder: AstTreeBuilder, currentConfigService: IFormulaCurrentConfigService): AstRootNode;
export declare function includeDefinedName(tree: IFormulaDependencyTree, node: Nullable<AstRootNode>, currentConfigService: IFormulaCurrentConfigService): boolean;
