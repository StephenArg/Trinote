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
import type { SubscriptionLike } from 'rxjs';
import type { IDisposable } from '../common/di';
import { Subject } from 'rxjs';
type DisposableLike = IDisposable | SubscriptionLike | (() => void);
export declare function toDisposable(disposable: IDisposable): IDisposable;
export declare function toDisposable(subscription: SubscriptionLike): IDisposable;
export declare function toDisposable(callback: () => void): IDisposable;
export declare function toDisposable(v: DisposableLike): IDisposable;
export declare class DisposableCollection implements IDisposable {
    private readonly _disposables;
    add(disposable: DisposableLike): {
        dispose: (notDisposeSelf?: boolean) => void;
    };
    dispose(): void;
}
export declare class Disposable implements IDisposable {
    protected _disposed: boolean;
    private readonly _collection;
    disposeWithMe(disposable: DisposableLike): IDisposable;
    protected ensureNotDisposed(): void;
    dispose(): void;
}
export declare class RxDisposable extends Disposable implements IDisposable {
    protected dispose$: Subject<void>;
    dispose(): void;
}
export declare class RCDisposable extends Disposable {
    private readonly _rootDisposable;
    private _ref;
    constructor(_rootDisposable: IDisposable);
    inc(): void;
    dec(): void;
}
export {};
