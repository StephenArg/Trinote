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
import { IFormulaCurrentConfigService } from '../../services/current-data.service';
import { IFunctionService } from '../../services/function.service';
import { IFormulaRuntimeService } from '../../services/runtime.service';
import { ISuperTableService } from '../../services/super-table.service';
import { LexerNode } from '../analysis/lexer-node';
import { TableReferenceObject } from '../reference-object/table-reference-object';
import { ReferenceObjectType } from '../utils/value-object';
import { BaseAstNode } from './base-ast-node';
import { BaseAstNodeFactory } from './base-ast-node-factory';
import { NodeType } from './node-type';
export declare class ReferenceNode extends BaseAstNode {
    private _currentConfigService;
    private _runtimeService;
    private _referenceObjectType;
    private _isPrepareMerge;
    private _tableReferenceObject?;
    private _refOffsetX;
    private _refOffsetY;
    constructor(_currentConfigService: IFormulaCurrentConfigService, _runtimeService: IFormulaRuntimeService, operatorString: string, _referenceObjectType: ReferenceObjectType, _isPrepareMerge?: boolean, _tableReferenceObject?: TableReferenceObject | undefined);
    get nodeType(): NodeType;
    execute(): void;
    setRefOffset(x?: number, y?: number): void;
    getRefOffset(): {
        x: number;
        y: number;
    };
}
export declare class ReferenceNodeFactory extends BaseAstNodeFactory {
    private readonly _currentConfigService;
    private readonly _formulaRuntimeService;
    private readonly _functionService;
    private readonly _superTableService;
    constructor(_currentConfigService: IFormulaCurrentConfigService, _formulaRuntimeService: IFormulaRuntimeService, _functionService: IFunctionService, _superTableService: ISuperTableService);
    get zIndex(): number;
    checkAndCreateNodeType(param: LexerNode | string): ReferenceNode | undefined;
    private _getTableMap;
    private _getNode;
    private _getTableReferenceNode;
    private _checkTokenIsTableReference;
    private _checkParentIsUnionOperator;
}
