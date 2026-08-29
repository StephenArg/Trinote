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
import { Disposable, ICommandService, LocaleService } from '@univerjs/core';
import { SheetPermissionCheckController } from '@univerjs/sheets';
export declare class ConditionalFormattingPermissionController extends Disposable {
    private _localeService;
    private readonly _commandService;
    private readonly _sheetPermissionCheckController;
    constructor(_localeService: LocaleService, _commandService: ICommandService, _sheetPermissionCheckController: SheetPermissionCheckController);
    private _commandExecutedListener;
}
