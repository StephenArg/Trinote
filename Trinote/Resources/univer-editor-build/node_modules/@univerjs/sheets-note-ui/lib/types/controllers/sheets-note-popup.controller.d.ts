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
import { IRenderManagerService } from '@univerjs/engine-render';
import { SheetsSelectionsService } from '@univerjs/sheets';
import { SheetsNoteModel } from '@univerjs/sheets-note';
import { HoverManagerService, IEditorBridgeService } from '@univerjs/sheets-ui';
import { SheetsNotePopupService } from '../services/sheets-note-popup.service';
export declare class SheetsNotePopupController extends Disposable {
    private readonly _sheetsNotePopupService;
    private readonly _sheetsNoteModel;
    private readonly _sheetSelectionService;
    private readonly _editorBridgeService;
    private readonly _renderManagerService;
    private readonly _hoverManagerService;
    private _isSwitchingSheet;
    constructor(_sheetsNotePopupService: SheetsNotePopupService, _sheetsNoteModel: SheetsNoteModel, _sheetSelectionService: SheetsSelectionsService, _editorBridgeService: IEditorBridgeService, _renderManagerService: IRenderManagerService, _hoverManagerService: HoverManagerService);
    private _handleSelectionChange;
    private _initSelectionUpdateListener;
    private _initEditorBridge;
    private _initHoverEvent;
    private _initDeleteNoteListener;
}
