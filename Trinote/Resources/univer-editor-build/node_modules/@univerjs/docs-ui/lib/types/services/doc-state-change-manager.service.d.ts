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
import type { IDocStateChangeParams } from '@univerjs/docs';
import { ICommandService, IUndoRedoService, IUniverInstanceService, RxDisposable } from '@univerjs/core';
import { DocStateEmitService } from '@univerjs/docs';
import { IRenderManagerService } from '@univerjs/engine-render';
interface IStateCache {
    history: IDocStateChangeParams[];
    collaboration: IDocStateChangeParams[];
}
export declare class DocStateChangeManagerService extends RxDisposable {
    private _undoRedoService;
    private readonly _commandService;
    private readonly _univerInstanceService;
    private readonly _docStateEmitService;
    private readonly _renderManagerService;
    private readonly _docStateChange$;
    readonly docStateChange$: import("rxjs").Observable<Nullable<IDocStateChangeParams>>;
    private _historyStateCache;
    private _changeStateCache;
    private _historyTimer;
    private _changeStateCacheTimer;
    constructor(_undoRedoService: IUndoRedoService, _commandService: ICommandService, _univerInstanceService: IUniverInstanceService, _docStateEmitService: DocStateEmitService, _renderManagerService: IRenderManagerService);
    getStateCache(unitId: string): {
        history: IDocStateChangeParams[];
        collaboration: IDocStateChangeParams[];
    };
    setStateCache(unitId: string, cache: IStateCache): void;
    private _setChangeState;
    private _initialize;
    private _listenDocStateChange;
    private _cacheChangeState;
    private _pushHistory;
    private _emitChangeState;
}
export {};
