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
import { RxDisposable } from '@univerjs/core';
import { Observable } from 'rxjs';
/** This protocol is for transferring data from the two peer univer instance running in different locations. */
export interface IMessageProtocol {
    send(message: any): void;
    onMessage: Observable<any>;
}
/**
 * Channel is a combination of methods and event sources. These methods and
 * event sources are usually provided by the same service or controller.
 */
export interface IChannel {
    call<T>(method: string, args?: any): Promise<T>;
    subscribe<T>(event: string, args?: any): Observable<T>;
}
/**
 * Wrapper a service or a controller into a channel so it could be invoked by
 * a remote client. When the protocol is called, it would forward to the
 * underlying service or controller.
 *
 * @param module the wrapper service or controller
 * @returns the channel instance
 */
export declare function fromModule(module: unknown): IChannel;
/**
 * Wrap a channel into a service or a controller so it could be invoked by
 * the upper layer modules. When the service or controller is called, it would
 * request the remote server by calling the channel.
 *
 * @param channel
 * @returns A proxy object that forwards calls/subscriptions to the remote channel.
 */
export declare function toModule<T extends object>(channel: IChannel): T;
export interface IChannelClient {
    getChannel<T extends IChannel>(channelName: string): T;
}
export interface IChannelServer {
    registerChannel<T extends IChannel>(channelName: string, channel: T): void;
}
/**
 * This method provides implementation for `IChannel` and is responsible for
 * transforming a local calling to a RPC calling.
 */
export declare class ChannelClient extends RxDisposable implements IChannelClient {
    private readonly _protocol;
    private _initialized;
    private _lastRequestCounter;
    private _pendingRequests;
    constructor(_protocol: IMessageProtocol);
    dispose(): void;
    getChannel<T extends IChannel>(channelName: string): T;
    private _whenReady;
    private _remoteCall;
    private _doRemoteCall;
    private _remoteSubscribe;
    private _sendRequest;
    private _onMessage;
}
export declare class ChannelServer extends RxDisposable implements IChannelServer {
    private readonly _protocol;
    private _channels;
    private _subscriptions;
    constructor(_protocol: IMessageProtocol);
    dispose(): void;
    registerChannel(channelName: string, channel: IChannel): void;
    private _onRequest;
    private _sendInitialize;
    private _onMethodCall;
    private _onSubscribe;
    private _onUnsubscribe;
    private _sendResponse;
}
