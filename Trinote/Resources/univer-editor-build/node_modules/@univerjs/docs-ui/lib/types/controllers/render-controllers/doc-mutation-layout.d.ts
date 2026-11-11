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
import type { IDocumentData, JSONXActions } from '@univerjs/core';
import type { IDocumentLayoutInvalidation } from '@univerjs/engine-render';
interface IDocumentLayoutRange {
    end: number;
    start: number;
}
export interface IDocumentMutationLayoutImpact {
    global: boolean;
    range?: IDocumentLayoutRange;
    unresolvedLocal?: boolean;
}
export declare function getBodyTextXActions(actions: JSONXActions, segmentId?: string): unknown[] | undefined;
export declare function getSingleBodyTextXActions(actions: JSONXActions, segmentId?: string): unknown[] | undefined;
export declare function getDocumentMutationLayoutImpact(actions: JSONXActions, snapshot: Pick<IDocumentData, 'body' | 'styles'>): IDocumentMutationLayoutImpact;
export declare function mergeMutationLayoutInvalidation(textInvalidation: IDocumentLayoutInvalidation | undefined, structuralRange: IDocumentLayoutRange | undefined): IDocumentLayoutInvalidation | undefined;
export declare function resolveMutationLayoutRequest(textInvalidation: IDocumentLayoutInvalidation | undefined, impact: IDocumentMutationLayoutImpact, bodyRangeStarts: number[]): {
    anchor: number | undefined;
    invalidation: IDocumentLayoutInvalidation | undefined;
};
export {};
