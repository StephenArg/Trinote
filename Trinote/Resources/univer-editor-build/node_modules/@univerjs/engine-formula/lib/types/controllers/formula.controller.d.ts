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
import { Disposable, ICommandService, IConfigService } from '@univerjs/core';
import { DataSyncPrimaryController } from '@univerjs/rpc';
import { IFunctionService } from '../services/function.service';
export declare class FormulaController extends Disposable {
    private readonly _commandService;
    private readonly _functionService;
    private readonly _configService;
    private readonly _dataSyncPrimaryController?;
    constructor(_commandService: ICommandService, _functionService: IFunctionService, _configService: IConfigService, _dataSyncPrimaryController?: DataSyncPrimaryController | undefined);
    private _initialize;
    private _registerCommands;
    private _registerFunctions;
}
