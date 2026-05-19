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
import { Disposable, ICommandService, IConfigService, IUniverInstanceService } from '@univerjs/core';
export declare class SheetsFreezeSyncController extends Disposable {
    private readonly _univerInstanceService;
    private readonly _commandService;
    private readonly _configService;
    private _d;
    private _enabled;
    constructor(_univerInstanceService: IUniverInstanceService, _commandService: ICommandService, _configService: IConfigService);
    getEnabled(): boolean;
    setEnabled(enabled: boolean): void;
    private _initOnlyLocalListener;
    private _handleInsertRowMutation;
    private _handleInsertColMutation;
    private _handleRemoveRowMutation;
    private _handleRemoveColMutation;
    private _handleMoveRowsMutation;
    private _handleMoveColsMutation;
    private _getFreeze;
    private _sequenceExecute;
}
