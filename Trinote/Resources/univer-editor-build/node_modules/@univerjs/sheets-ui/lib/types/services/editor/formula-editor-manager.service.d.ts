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
import type { Observable } from 'rxjs';
import { Disposable } from '@univerjs/core';
export interface IFormulaEditorManagerService {
    position$: Observable<Nullable<DOMRect>>;
    focus$: Observable<boolean>;
    fxBtnClick$: Observable<boolean>;
    foldBtnStatus$: Observable<boolean>;
    setPosition(param: DOMRect): void;
    getPosition(): Readonly<Nullable<DOMRect>>;
    setFocus(param: boolean): void;
    handleFxBtnClick(params: boolean): void;
    handleFoldBtnClick(params: boolean): void;
}
export declare class FormulaEditorManagerService extends Disposable implements IFormulaEditorManagerService {
    private _position;
    private readonly _position$;
    readonly position$: Observable<Nullable<DOMRect>>;
    private _focus;
    private readonly _focus$;
    readonly focus$: Observable<boolean>;
    private readonly _fxBtnClick$;
    readonly fxBtnClick$: Observable<boolean>;
    private readonly _foldBtnStatus$;
    readonly foldBtnStatus$: Observable<boolean>;
    dispose(): void;
    setPosition(param: DOMRect): void;
    getPosition(): Readonly<Nullable<DOMRect>>;
    setFocus(param?: boolean): void;
    handleFxBtnClick(params: boolean): void;
    handleFoldBtnClick(params: boolean): void;
    private _refresh;
}
export declare const IFormulaEditorManagerService: import("@wendellhu/redi").IdentifierDecorator<IFormulaEditorManagerService>;
