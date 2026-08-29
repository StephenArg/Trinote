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
import type { IDisposable, Nullable } from '@univerjs/core';
import { Disposable, IUniverInstanceService } from '@univerjs/core';
import { DocSelectionManagerService } from '@univerjs/docs';
import { DocCanvasPopManagerService } from '@univerjs/docs-ui';
export interface ILinkInfo {
    unitId: string;
    linkId: string;
    segmentId?: string;
    segmentPage?: number;
    startIndex: number;
    endIndex: number;
}
export declare class DocHyperLinkPopupService extends Disposable {
    private readonly _docCanvasPopupManagerService;
    private readonly _textSelectionManagerService;
    private readonly _univerInstanceService;
    private readonly _editingLink$;
    private readonly _showingLink$;
    readonly editingLink$: import("rxjs").Observable<Nullable<ILinkInfo>>;
    readonly showingLink$: import("rxjs").Observable<Nullable<ILinkInfo>>;
    private _editPopup;
    private _infoPopup;
    constructor(_docCanvasPopupManagerService: DocCanvasPopManagerService, _textSelectionManagerService: DocSelectionManagerService, _univerInstanceService: IUniverInstanceService);
    get editing(): Nullable<ILinkInfo>;
    get showing(): Nullable<ILinkInfo>;
    showEditPopup(unitId: string, linkInfo: Nullable<ILinkInfo>): Nullable<IDisposable>;
    hideEditPopup(): void;
    showInfoPopup(info: ILinkInfo): Nullable<IDisposable>;
    hideInfoPopup(): void;
}
