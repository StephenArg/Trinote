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
import type { ErrorType } from '../../basics/error-type';
import type { FunctionVariantType } from '../reference-object/base-reference-object';
import { AstNodePromiseType } from '../../basics/common';
import { ErrorValueObject } from '../value-object/base-value-object';
import { NodeType } from './node-type';
export interface IAstNodeNodeJson {
    token: string;
    children?: IAstNodeNodeJson[];
    nodeType: number;
}
export type LambdaPrivacyVarType = Map<string, Nullable<BaseAstNode>>;
export declare class BaseAstNode {
    private _token;
    private _children;
    private _definedNames;
    private _parent;
    private _valueObject;
    private _calculateState;
    private _async;
    private _address;
    private _isForcedCalculateFunction;
    constructor(_token: string);
    dispose(): void;
    get nodeType(): NodeType;
    resetCalculationState(): void;
    isAsync(): boolean;
    isAddress(): boolean;
    isForcedCalculateFunction(): boolean;
    setAsync(): void;
    setAddress(): void;
    getParent(): Nullable<BaseAstNode>;
    setParent(node: BaseAstNode): void;
    setForcedCalculateFunction(): void;
    getChildren(): BaseAstNode[];
    addChildren(...astNode: BaseAstNode[]): void;
    getToken(): string;
    setValue(value: Nullable<FunctionVariantType>): void;
    getValue(): Nullable<FunctionVariantType>;
    isCalculated(): boolean;
    setCalculated(): void;
    execute(): void;
    setNotEmpty(state?: boolean): void;
    executeAsync(): Promise<AstNodePromiseType>;
    serialize(): IAstNodeNodeJson;
    hasDefinedName(definedName: string): boolean;
    setDefinedNames(definedNames: Array<string>): void;
    getDefinedNames(): Nullable<string[]>;
}
export declare class ErrorNode extends BaseAstNode {
    private _errorValueObject;
    constructor(errorType: ErrorType);
    get nodeType(): NodeType;
    static create(errorType: ErrorType): ErrorNode;
    getValue(): ErrorValueObject;
}
