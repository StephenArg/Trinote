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
import type { IDisposable } from '../../common/di';
import { Subject } from 'rxjs';
export declare const IConfirmService: import("@wendellhu/redi").IdentifierDecorator<IConfirmService<unknown>>;
export interface IConfirmService<T = unknown> {
    readonly confirmOptions$: Subject<T[]>;
    open(params: T): IDisposable;
    confirm(params: T): Promise<boolean>;
    close(id: string): void;
}
/**
 * This is a mock service for testing purposes.
 */
export declare class TestConfirmService<T> implements IConfirmService<T>, IDisposable {
    readonly confirmOptions$: Subject<T[]>;
    dispose(): void;
    open(_params: T): IDisposable;
    confirm(_params: T): Promise<boolean>;
    close(_id: string): IDisposable;
}
