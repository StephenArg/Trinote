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
import { Disposable } from '@univerjs/core';
import { SheetPermissionCheckController } from '@univerjs/sheets';
import { SheetsThreadCommentModel } from '@univerjs/sheets-thread-comment';
import { HoverManagerService } from '@univerjs/sheets-ui';
import { SheetsThreadCommentPopupService } from '../services/sheets-thread-comment-popup.service';
export declare class SheetsThreadCommentHoverController extends Disposable {
    private readonly _hoverManagerService;
    private readonly _sheetsThreadCommentPopupService;
    private readonly _sheetsThreadCommentModel;
    private readonly _sheetPermissionCheckController;
    constructor(_hoverManagerService: HoverManagerService, _sheetsThreadCommentPopupService: SheetsThreadCommentPopupService, _sheetsThreadCommentModel: SheetsThreadCommentModel, _sheetPermissionCheckController: SheetPermissionCheckController);
    private _initHoverEvent;
}
