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
import { Disposable, ICommandService, IUniverInstanceService, ThemeService } from '@univerjs/core';
import { IDefinedNamesService } from '@univerjs/engine-formula';
import { SheetsSelectionsService } from '@univerjs/sheets';
export declare class SheetsDefinedNameController extends Disposable {
    private readonly _selectionManagerService;
    private readonly _themeService;
    private readonly _instanceSrv;
    private readonly _cmdSrv;
    private readonly _definedNamesService;
    constructor(_selectionManagerService: SheetsSelectionsService, _themeService: ThemeService, _instanceSrv: IUniverInstanceService, _cmdSrv: ICommandService, _definedNamesService: IDefinedNamesService);
    private _init;
    private _syncDefinedNameRange;
    private _getSelections;
}
