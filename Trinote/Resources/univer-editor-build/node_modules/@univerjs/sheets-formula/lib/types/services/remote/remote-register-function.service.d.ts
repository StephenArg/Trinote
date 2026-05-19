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
import { IFunctionService } from '@univerjs/engine-formula';
export interface IRemoteRegisterFunctionService {
    registerFunctions(serializedFuncs: Array<[string, string]>): Promise<void>;
    registerAsyncFunctions(serializedFuncs: Array<[string, string]>): Promise<void>;
    unregisterFunctions(names: string[]): Promise<void>;
}
export declare const RemoteRegisterFunctionServiceName = "sheets-formula.remote-register-function.service";
export declare const IRemoteRegisterFunctionService: import("@wendellhu/redi").IdentifierDecorator<IRemoteRegisterFunctionService>;
/**
 * This class should resident in the remote process.
 */
export declare class RemoteRegisterFunctionService implements IRemoteRegisterFunctionService {
    private readonly _functionService;
    constructor(_functionService: IFunctionService);
    registerFunctions(serializedFuncs: Array<[string, string]>): Promise<void>;
    registerAsyncFunctions(serializedFuncs: Array<[string, string]>): Promise<void>;
    unregisterFunctions(names: string[]): Promise<void>;
}
