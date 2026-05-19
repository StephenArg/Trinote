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
import type { IExecutionOptions, IMutationInfo, IWorkbookData } from '@univerjs/core';
import { ICommandService, ILogService, IUniverInstanceService, UniverInstanceType } from '@univerjs/core';
export interface IRemoteSyncMutationOptions extends IExecutionOptions {
    /** If this mutation is executed after it was sent from the peer univer instance (e.g. in a web worker). */
    fromSync?: boolean;
}
export declare const RemoteSyncServiceName = "rpc.remote-sync.service";
/**
 * This service is provided by the primary Univer.
 *
 * Replica Univer could call this service to update mutations back to the primary Univer.
 */
export declare const IRemoteSyncService: import("@wendellhu/redi").IdentifierDecorator<IRemoteSyncService>;
export interface IRemoteSyncService {
    syncMutation(params: {
        mutationInfo: IMutationInfo;
    }, options?: IExecutionOptions): Promise<boolean>;
}
export declare class RemoteSyncPrimaryService implements IRemoteSyncService {
    private readonly _commandService;
    constructor(_commandService: ICommandService);
    syncMutation(params: {
        mutationInfo: IMutationInfo;
    }, options?: IExecutionOptions): Promise<boolean>;
}
export declare const RemoteInstanceServiceName = "univer.remote-instance-service";
/**
 * This service is provided by the replica Univer.
 *
 * Primary univer could call this service to init and dispose univer business instances
 * and sync mutations to replica univer.
 */
export declare const IRemoteInstanceService: import("@wendellhu/redi").IdentifierDecorator<IRemoteInstanceService>;
export interface IRemoteInstanceService {
    /** Tell other modules if the `IRemoteInstanceService` is ready to load files. */
    whenReady(): Promise<true>;
    createInstance(params: {
        unitID: string;
        type: UniverInstanceType;
        snapshot: IWorkbookData;
    }): Promise<boolean>;
    disposeInstance(params: {
        unitID: string;
    }): Promise<boolean>;
    syncMutation(params: {
        mutationInfo: IMutationInfo;
    }, options?: IExecutionOptions): Promise<boolean>;
}
export declare class WebWorkerRemoteInstanceService implements IRemoteInstanceService {
    protected readonly _univerInstanceService: IUniverInstanceService;
    protected readonly _commandService: ICommandService;
    protected readonly _logService: ILogService;
    constructor(_univerInstanceService: IUniverInstanceService, _commandService: ICommandService, _logService: ILogService);
    whenReady(): Promise<true>;
    syncMutation(params: {
        mutationInfo: IMutationInfo;
    }, options?: IExecutionOptions): Promise<boolean>;
    createInstance(params: {
        unitID: string;
        type: UniverInstanceType;
        snapshot: IWorkbookData;
    }): Promise<boolean>;
    disposeInstance(params: {
        unitID: string;
    }): Promise<boolean>;
    protected _applyMutation(mutationInfo: IMutationInfo, options?: IExecutionOptions): boolean;
}
