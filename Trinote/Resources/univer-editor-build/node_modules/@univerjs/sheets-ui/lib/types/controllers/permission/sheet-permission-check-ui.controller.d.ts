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
import { Disposable, DisposableCollection, ICommandService, IContextService, IPermissionService, IUniverInstanceService, LocaleService } from '@univerjs/core';
import { RangeProtectionRuleModel, SheetPermissionCheckController } from '@univerjs/sheets';
import { IDialogService } from '@univerjs/ui';
export declare class SheetPermissionCheckUIController extends Disposable {
    private readonly _commandService;
    private readonly _univerInstanceService;
    private readonly _permissionService;
    private readonly _dialogService;
    private _rangeProtectionRuleModel;
    private readonly _localeService;
    private readonly _contextService;
    private readonly _sheetPermissionCheckController;
    disposableCollection: DisposableCollection;
    constructor(_commandService: ICommandService, _univerInstanceService: IUniverInstanceService, _permissionService: IPermissionService, _dialogService: IDialogService, _rangeProtectionRuleModel: RangeProtectionRuleModel, _localeService: LocaleService, _contextService: IContextService, _sheetPermissionCheckController: SheetPermissionCheckController);
    private _initUIEvent;
    private _haveNotPermissionHandle;
    private _getPermissionCheck;
    private _initialize;
    private _commandExecutedListener;
    private _permissionCheckByPaste;
}
