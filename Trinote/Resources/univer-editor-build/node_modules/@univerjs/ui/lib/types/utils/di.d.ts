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
import type { RefObject } from 'react';
import type { Observable } from 'rxjs';
export { connectDependencies, connectInjector, RediConsumer, RediContext, RediProvider, useDependency, useInjector, useObservable, useUpdateBinder, WithDependency, } from '@wendellhu/redi/react-bindings';
type ObservableOrFn<T> = Observable<T> | (() => Observable<T>);
declare module '@univerjs/ui' {
    function useObservable<T>(observable: ObservableOrFn<T>, defaultValue: T | undefined, shouldHaveSyncValue?: true): T;
    function useObservable<T>(observable: Nullable<ObservableOrFn<T>>, defaultValue: T): T;
    function useObservable<T>(observable: Nullable<ObservableOrFn<T>>, defaultValue?: undefined): T | undefined;
    function useObservable<T>(observable: Nullable<ObservableOrFn<T>>, defaultValue: T, shouldHaveSyncValue?: boolean, deps?: any[]): T;
    function useObservable<T>(observable: Nullable<ObservableOrFn<T>>, defaultValue: undefined, shouldHaveSyncValue: true, deps?: any[]): T;
    function useObservable<T>(observable: Nullable<ObservableOrFn<T>>, defaultValue?: T, shouldHaveSyncValue?: boolean, deps?: any[]): T | undefined;
}
export declare function useObservableRef<T>(observable: Nullable<ObservableOrFn<T>>, defaultValue?: T): RefObject<Nullable<T>>;
