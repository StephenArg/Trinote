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
import type { IMessageProtocol } from '../rpc.service';
/**
 * Generate an `IMessageProtocol` on the web worker.
 * @returns A protocol wrapper around worker global messaging APIs.
 */
export declare function createWebWorkerMessagePortOnWorker(): IMessageProtocol;
/**
 * Generate an `IMessageProtocol` on the main thread side.
 * @param worker The Web Worker object
 * @returns A protocol wrapper around the given worker messaging APIs.
 */
export declare function createWebWorkerMessagePortOnMain(worker: Worker): IMessageProtocol;
