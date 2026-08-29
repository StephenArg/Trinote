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
import { SheetsFilterController } from './sheets-filter.controller';
export declare class SheetsFilterSyncController extends Disposable {
    private readonly _sheetsFilterController;
    protected readonly _commandService: ICommandService;
    private readonly _configService;
    private _d;
    private readonly _visible$;
    readonly visible$: import("rxjs").Observable<boolean>;
    get visible(): boolean;
    private readonly _enabled$;
    readonly enabled$: import("rxjs").Observable<boolean>;
    get enabled(): boolean;
    constructor(_sheetsFilterController: SheetsFilterController, _commandService: ICommandService, _configService: IConfigService);
    setEnabled(enabled: boolean): void;
    private _initOnlyLocalListener;
}
