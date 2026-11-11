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
import type { BaseAstNode } from '../../../engine/ast-node/base-ast-node';
import type { FunctionVariantType } from '../../../engine/reference-object/base-reference-object';
import { ArrayValueObject } from '../../../engine/value-object/array-value-object';
import { ErrorValueObject } from '../../../engine/value-object/base-value-object';
import { BaseFunction } from '../../base-function';
export declare class Groupby extends BaseFunction {
    minParams: number;
    maxParams: number;
    needsReferenceObject: boolean;
    needsAstChildren: boolean;
    calculateAst(children: BaseAstNode[], getVariant: (node: BaseAstNode) => FunctionVariantType | null): ErrorValueObject | ArrayValueObject;
    private _arrayInput;
    private _aggregators;
    private _normalizedFunctionName;
    private _isAggregatorName;
    private _outputValueColumnCount;
    private _valueColumnForOutput;
    private _aggregatorForOutput;
    private _aggregatorHeader;
    private _applyAggregator;
    private _sum;
    private _numericValue;
    private _numberValue;
    private _truthy;
    private _keysEqual;
    private _keyValue;
    private _sortGroups;
    private _compareKey;
    private _compareValue;
    private _textValue;
}
