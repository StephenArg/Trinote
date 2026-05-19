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
import { Disposable } from '../../shared/lifecycle';
export declare enum LogLevel {
    SILENT = 0,
    ERROR = 1,
    WARN = 2,
    INFO = 3,
    VERBOSE = 4
}
type ArgsType = any[];
export interface ILogService {
    debug(...args: ArgsType): void;
    log(...args: ArgsType): void;
    warn(...args: ArgsType): void;
    error(...args: ArgsType): void;
    deprecate(...args: ArgsType): void;
    setLogLevel(enabled: LogLevel): void;
}
export declare const ILogService: import("@wendellhu/redi").IdentifierDecorator<ILogService>;
export declare class DesktopLogService extends Disposable implements ILogService {
    private _logLevel;
    private _deduction;
    dispose(): void;
    debug(...args: ArgsType): void;
    log(...args: ArgsType): void;
    warn(...args: ArgsType): void;
    error(...args: ArgsType): void;
    deprecate(...args: ArgsType): void;
    setLogLevel(logLevel: LogLevel): void;
    private _log;
    private _logWithDeduplication;
}
export {};
