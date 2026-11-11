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
import type { IDisposable, IDocumentData } from '@univerjs/core';
import { Disposable } from '@univerjs/core';
export interface IDocBlockMoveValidationContext {
    unitId: string;
    sourceRange: {
        startOffset: number;
        endOffset: number;
    };
    targetOffset: number;
}
export type DocBlockMoveValidator = (context: IDocBlockMoveValidationContext) => boolean;
export interface IDocBlockMoveResult {
    nextDocumentData: IDocumentData;
    movedRange: {
        startOffset: number;
        endOffset: number;
    };
}
export interface IDocBlockMoveTransformContext extends IDocBlockMoveValidationContext {
    previousDocumentData: IDocumentData;
    result: IDocBlockMoveResult;
}
export type DocBlockMoveTransformer = (context: IDocBlockMoveTransformContext) => IDocBlockMoveResult;
export declare class DocBlockMoveValidatorService extends Disposable {
    private readonly _validators;
    private readonly _transformers;
    registerValidator(validator: DocBlockMoveValidator): IDisposable;
    registerTransformer(transformer: DocBlockMoveTransformer): IDisposable;
    canMoveBlock(context: IDocBlockMoveValidationContext): boolean;
    transformMoveResult(context: IDocBlockMoveTransformContext): IDocBlockMoveResult;
}
