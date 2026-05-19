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
import type { Observer as RxObserver, Subscription } from 'rxjs';
import { Observable, Subject } from 'rxjs';
/**
 * A class serves as a medium between the observable and its observers
 */
export declare class EventState {
    /**
     * An WorkBookObserver can set this property to true to prevent subsequent observers of being notified
     */
    skipNextObservers: boolean;
    /**
     * This will be populated with the return value of the last function that was executed.
     * If it is the first function in the callback chain it will be the event data.
     */
    lastReturnValue?: unknown;
    isStopPropagation: boolean;
    stopPropagation(): void;
}
interface INotifyObserversReturn {
    /** If the event has been handled by any event handler. */
    handled: boolean;
    lastReturnValue: unknown;
    stopPropagation: boolean;
}
export interface IEventObserver<T> extends Partial<RxObserver<[T, EventState]>> {
    next?: (value: [T, EventState]) => unknown;
    priority?: number;
}
/**
 * This is a custom implementation of RxJS subject. It handles events on canvas elements.
 * In addition to the event, it also emits a state object that can be used to controls the
 * propagation of the event.
 *
 */
export declare class EventSubject<T> extends Subject<[T, EventState]> {
    private _sortedObservers;
    unsubscribe(): void;
    complete(): void;
    subscribeEvent(observer: IEventObserver<T> | ((evt: T, state: EventState) => unknown)): Subscription;
    clearObservers(): void;
    emitEvent(event: T): INotifyObserversReturn;
}
export declare function fromEventSubject<T>(subject$: EventSubject<T>): Observable<T>;
export {};
