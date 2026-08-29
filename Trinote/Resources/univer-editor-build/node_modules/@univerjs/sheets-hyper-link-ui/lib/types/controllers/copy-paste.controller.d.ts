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
import { Disposable, Injector } from '@univerjs/core';
import { HyperLinkModel } from '@univerjs/sheets-hyper-link';
import { ISheetClipboardService } from '@univerjs/sheets-ui';
import { SheetsHyperLinkResolverService } from '../services/resolver.service';
export declare class SheetsHyperLinkCopyPasteController extends Disposable {
    private _sheetClipboardService;
    private _hyperLinkModel;
    private _injector;
    private _resolverService;
    private _plainTextFilter;
    registerPlainTextFilter(filter: (text: string) => boolean): void;
    removePlainTextFilter(filter: (text: string) => boolean): void;
    private _filterPlainText;
    private _copyInfo;
    constructor(_sheetClipboardService: ISheetClipboardService, _hyperLinkModel: HyperLinkModel, _injector: Injector, _resolverService: SheetsHyperLinkResolverService);
    private _initCopyPaste;
    private _collect;
    private _generateMutations;
}
