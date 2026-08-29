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
import { Disposable, IUniverInstanceService } from '@univerjs/core';
import { SheetsNoteModel } from '@univerjs/sheets-note';
import { CellPopupManagerService } from '@univerjs/sheets-ui';
import { SheetsNotePopupService } from '../services/sheets-note-popup.service';
export declare class SheetsNoteAttachmentController extends Disposable {
    private readonly _sheetsNoteModel;
    private readonly _univerInstanceService;
    private readonly _cellPopupManagerService;
    private readonly _sheetsNotePopupService;
    private _noteMatrix;
    constructor(_sheetsNoteModel: SheetsNoteModel, _univerInstanceService: IUniverInstanceService, _cellPopupManagerService: CellPopupManagerService, _sheetsNotePopupService: SheetsNotePopupService);
    private _showPopup;
    dispose(): void;
    private _initSheet;
    private _initNoteChangeListener;
}
