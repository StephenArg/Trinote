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
import type { HTTPRequest } from '../request';
import type { HTTPEvent, HTTPResponseError } from '../response';
import { Disposable, Injector } from '@univerjs/core';
import { Observable } from 'rxjs';
import { IHTTPImplementation } from '../implementations/implementation';
/**
 * A mocked HTTP implementation service for testing purposes. Besides methods in the interface, it
 * provides several public methods to control the process of http request.
 */
export declare class MockHTTPImplementation extends Disposable implements IHTTPImplementation {
    private readonly _newRequest$;
    readonly newRequest$: Observable<HTTPRequest>;
    private readonly _handlers;
    dispose(): void;
    send(request: HTTPRequest): Observable<HTTPEvent<any>>;
    /**
     * Get a handler to interact with the request.
     * @param uid the request's unique identifier
     * @returns the handler for the request
     */
    getHandler(uid: number): IMockHTTPHandler;
}
export interface IMockHTTPHandler {
    /**
     * Emit a response event to the observer.
     */
    emitResponse<T>(response: HTTPEvent<T>): void;
    /**
     * Emit an error event to the observer.
     */
    emitError(error: HTTPResponseError): void;
}
export declare function createHTTPTestBed(): {
    injector: Injector;
};
