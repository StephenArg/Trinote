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
import { DocSelectionManagerService } from '@univerjs/docs';
import { ISidebarService } from '@univerjs/ui';
export declare class DocSectionSettingController extends Disposable {
    private readonly _sidebarService;
    private readonly _selectionManager;
    private readonly _panelId;
    constructor(_sidebarService: ISidebarService, _selectionManager: DocSelectionManagerService);
    openPanel(): void;
    closePanel(): void;
    navigateToSectionEnd(unitId: string, sectionStart: number, sectionEnd: number): void;
}
