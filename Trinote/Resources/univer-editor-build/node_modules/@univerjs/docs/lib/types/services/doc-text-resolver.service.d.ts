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
import type { IDisposable, IDocumentBody } from '@univerjs/core';
import { Disposable } from '@univerjs/core';
export interface IDocTextReplacement {
    endOffset: number;
    replaceable?: boolean;
    startOffset: number;
    text: string;
}
export interface IDocTextResolver {
    resolve(unitId: string, body: IDocumentBody): readonly IDocTextReplacement[];
}
export interface IResolvedDocTextCharacter {
    endOffset: number;
    replaceable: boolean;
    startOffset: number;
}
export interface IResolvedDocText {
    characters: readonly IResolvedDocTextCharacter[];
    text: string;
}
/**
 * Builds a consumer-facing text projection while retaining a mapping back to
 * the native document offsets.
 *
 * Consumers such as find/replace can search the projected text and then use
 * `characters` to focus the native object that supplied a matching character.
 * Resolvers must return half-open, non-overlapping replacements.
 */
export declare class DocTextResolverService extends Disposable {
    private readonly _resolvers;
    private readonly _textChanged$;
    readonly textChanged$: import("rxjs").Observable<string>;
    register(resolver: IDocTextResolver): IDisposable;
    notifyTextChanged(unitId: string): void;
    resolve(unitId: string, body: IDocumentBody): IResolvedDocText;
    private _collectReplacements;
    dispose(): void;
}
