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
import { Disposable, DisposableCollection, IUniverInstanceService, LocaleService } from '@univerjs/core';
import { SheetPermissionCheckController, SheetsSelectionsService } from '@univerjs/sheets';
import { ISheetClipboardService } from '../../services/clipboard/clipboard.service';
export declare const SHEET_PERMISSION_PASTE_PLUGIN = "SHEET_PERMISSION_PASTE_PLUGIN";
export declare class SheetPermissionInterceptorClipboardController extends Disposable {
    private readonly _univerInstanceService;
    private readonly _selectionManagerService;
    private readonly _localService;
    private _sheetClipboardService;
    private readonly _sheetPermissionCheckController;
    disposableCollection: DisposableCollection;
    constructor(_univerInstanceService: IUniverInstanceService, _selectionManagerService: SheetsSelectionsService, _localService: LocaleService, _sheetClipboardService: ISheetClipboardService, _sheetPermissionCheckController: SheetPermissionCheckController);
    private _initClipboardHook;
}
