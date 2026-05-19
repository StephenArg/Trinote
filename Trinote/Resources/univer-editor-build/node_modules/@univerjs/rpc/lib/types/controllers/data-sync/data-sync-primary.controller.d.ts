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
import type { IDisposable, IMutation } from '@univerjs/core';
import { ICommandService, Injector, IUniverInstanceService, RxDisposable } from '@univerjs/core';
import { IRemoteSyncService } from '../../services/remote-instance/remote-instance.service';
import { IRPCChannelService } from '../../services/rpc/channel.service';
/**
 * This controller is responsible for syncing data from the primary thread to
 * the worker thread.
 *
 * Note that only spreadsheets will be synced to the remote calculation instance by default.
 */
export declare class DataSyncPrimaryController extends RxDisposable {
    private readonly _injector;
    private readonly _commandService;
    private readonly _univerInstanceService;
    private readonly _rpcChannelService;
    private readonly _remoteSyncService;
    private _remoteInstanceService;
    private readonly _syncingUnits;
    private readonly _syncingMutations;
    constructor(_injector: Injector, _commandService: ICommandService, _univerInstanceService: IUniverInstanceService, _rpcChannelService: IRPCChannelService, _remoteSyncService: IRemoteSyncService);
    registerSyncingMutations(mutation: IMutation<object>): void;
    /**
     * Only spreadsheets would be synced to the web worker in normal situations. If you would like to
     * sync other types of documents, you should manually call this method with that document's id.
     */
    syncUnit(unitId: string): IDisposable;
    private _initRPCChannels;
    private _init;
}
