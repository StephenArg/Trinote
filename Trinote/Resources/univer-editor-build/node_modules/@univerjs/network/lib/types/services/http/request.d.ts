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
import type { HTTPHeaders } from './headers';
import type { HTTPResponseType } from './http';
export type HTTPRequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export declare function __TEST_ONLY_RESET_REQUEST_UID_DO_NOT_USE_IN_PRODUCTION(): void;
export declare class HTTPRequest {
    readonly method: HTTPRequestMethod;
    readonly url: string;
    readonly requestParams?: IHTTPRequestParams | undefined;
    get headers(): HTTPHeaders;
    get withCredentials(): boolean;
    get responseType(): HTTPResponseType;
    readonly uid: number;
    constructor(method: HTTPRequestMethod, url: string, requestParams?: IHTTPRequestParams | undefined);
    getUrlWithParams(): string;
    getBody(): string | FormData | null;
    getHeadersInit(): HeadersInit;
}
