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
import type { HTTPHandlerFn } from '../interceptor';
import type { HTTPRequest } from '../request';
import { Observable } from 'rxjs';
export declare const MergeInterceptorFactory: <T, C>(config: {
    /**
     *  Filter requests that need to be merged
     */
    isMatch: (requestConfig: HTTPRequest) => boolean;
    /**
     * Pre-process request parameters, the return value will be used as input parameters for subsequent operations
     * The result is used as an index key
     */
    getParamsFromRequest: (requestConfig: HTTPRequest) => T;
    /**
     * The request parameters are merged to initiate the request
     */
    mergeParamsToRequest: (list: T[], requestConfig: HTTPRequest) => HTTPRequest;
}, options?: {
    /**
     * Determine when to initiate a request
     * By default, requests up to 300ms are automatically aggregated
     */
    fetchCheck?: (currentConfig: HTTPRequest) => Promise<boolean>;
    /**
     * The result of the request is dispatched based on the request parameters.
     * By default each request gets the full result of the batch request
     */
    distributeResult?: (result: C, list: T[]) => {
        config: T;
        result: C;
    }[];
}) => (requestConfig: HTTPRequest, next: HTTPHandlerFn) => Observable<import("../response").HTTPEvent<unknown>>;
