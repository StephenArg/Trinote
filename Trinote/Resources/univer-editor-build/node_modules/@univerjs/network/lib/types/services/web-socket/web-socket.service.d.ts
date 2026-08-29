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
import { Disposable } from '@univerjs/core';
import { Observable } from 'rxjs';
export type SocketBodyType = Parameters<WebSocket['send']>[0];
/**
 * This service is responsible for establishing bidi-directional connection to a remote server.
 */
export declare const ISocketService: import("@wendellhu/redi").IdentifierDecorator<ISocketService>;
export interface ISocketService {
    createSocket(url: string): Nullable<ISocket>;
}
/**
 * An interface that represents a socket connection.
 */
export interface ISocket {
    URL: string;
    close(code?: number, reason?: string): void;
    /**
     * Send a message to the remote server.
     */
    send(data: SocketBodyType): void;
    close$: Observable<Event>;
    error$: Observable<Event>;
    message$: Observable<MessageEvent>;
    open$: Observable<Event>;
}
/**
 * This service create a WebSocket connection to a remote server.
 */
export declare class WebSocketService extends Disposable implements ISocketService {
    createSocket(URL: string): Nullable<ISocket>;
}
