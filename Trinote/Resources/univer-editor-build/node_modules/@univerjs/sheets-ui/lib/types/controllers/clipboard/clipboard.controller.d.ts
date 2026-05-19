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
import { ICommandService, IConfigService, IContextService, Injector, IUniverInstanceService, LocaleService, RxDisposable } from '@univerjs/core';
import { IRenderManagerService } from '@univerjs/engine-render';
import { IMessageService, IUIPartsService } from '@univerjs/ui';
import { ISheetClipboardService } from '../../services/clipboard/clipboard.service';
export declare class SheetClipboardController extends RxDisposable {
    private readonly _injector;
    private readonly _instanceService;
    private readonly _renderManagerService;
    private readonly _commandService;
    private readonly _contextService;
    private readonly _configService;
    private readonly _sheetClipboardService;
    private readonly _messageService;
    private readonly _localService;
    protected readonly _uiPartsService: IUIPartsService;
    private _refreshOptionalPaste$;
    refreshOptionalPaste$: import("rxjs").Observable<unknown>;
    constructor(_injector: Injector, _instanceService: IUniverInstanceService, _renderManagerService: IRenderManagerService, _commandService: ICommandService, _contextService: IContextService, _configService: IConfigService, _sheetClipboardService: ISheetClipboardService, _messageService: IMessageService, _localService: LocaleService, _uiPartsService: IUIPartsService);
    refreshOptionalPaste(): void;
    private _pasteWithDoc;
    private _resolveClipboardFiles;
    private _init;
    private _initCopyingHooks;
    private _initPastingHook;
    private _initPastingRowsHook;
    private _initPastingColumnsHook;
    private _generateDocumentDataModelSnapshot;
    private _onPastePlainText;
    private _onPasteCells;
    private _initSpecialPasteHooks;
    private _getWorksheet;
    private _initCommandListener;
    private _initUIComponents;
}
