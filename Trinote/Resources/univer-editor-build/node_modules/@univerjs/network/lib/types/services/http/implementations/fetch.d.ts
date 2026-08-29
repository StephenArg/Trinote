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
import type { HTTPEvent } from '../response';
import type { IHTTPImplementation } from './implementation';
import { ILogService } from '@univerjs/core';
import { Observable } from 'rxjs';
/**
 * An HTTP implementation using Fetch API. This implementation can both run in browser and Node.js.
 *
 * It does not support streaming response yet (May 12, 2024).
 */
export declare class FetchHTTPImplementation implements IHTTPImplementation {
    private readonly _logService;
    constructor(_logService: ILogService);
    send(request: HTTPRequest): Observable<HTTPEvent<any>>;
    private _send;
    private _readBody;
}
