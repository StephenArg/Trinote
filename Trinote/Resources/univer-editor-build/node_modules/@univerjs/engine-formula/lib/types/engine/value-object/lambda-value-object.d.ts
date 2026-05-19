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
import type { Interpreter } from '../interpreter/interpreter';
import type { FunctionVariantType } from '../reference-object/base-reference-object';
import type { PrimitiveValueType } from './primitive-object';
import { AsyncObject } from '../reference-object/base-reference-object';
import { BaseValueObject } from './base-value-object';
export declare class LambdaValueObjectObject extends BaseValueObject {
    private _lambdaNode;
    private _interpreter;
    private _lambdaPrivacyVarKeys;
    static create(lambdaNode: BaseAstNode, interpreter: Interpreter, lambdaPrivacyVarKeys: string[]): LambdaValueObjectObject;
    private _lambdaPrivacyValueMap;
    constructor(_lambdaNode: Nullable<BaseAstNode>, _interpreter: Nullable<Interpreter>, _lambdaPrivacyVarKeys: string[]);
    dispose(): void;
    isLambda(): boolean;
    execute(...variants: FunctionVariantType[]): BaseValueObject | AsyncObject;
    /**
     * Execute custom lambda function, handle basic types
     * @param variants
     */
    executeCustom(...variants: PrimitiveValueType[]): BaseValueObject | AsyncObject;
    private _setLambdaNodeValue;
    private _setLambdaPrivacyValueMap;
    getLambdaPrivacyVarKeys(): string[];
}
