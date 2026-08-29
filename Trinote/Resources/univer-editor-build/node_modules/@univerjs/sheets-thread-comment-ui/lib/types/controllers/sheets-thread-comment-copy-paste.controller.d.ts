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
import { SheetsThreadCommentModel } from '@univerjs/sheets-thread-comment';
import { ISheetClipboardService } from '@univerjs/sheets-ui';
import { IThreadCommentDataSourceService } from '@univerjs/thread-comment';
export declare class SheetsThreadCommentCopyPasteController extends Disposable {
    private _sheetClipboardService;
    private _sheetsThreadCommentModel;
    private _threadCommentDataSourceService;
    private _copyInfo;
    constructor(_sheetClipboardService: ISheetClipboardService, _sheetsThreadCommentModel: SheetsThreadCommentModel, _threadCommentDataSourceService: IThreadCommentDataSourceService);
    private _initClipboardHook;
}
