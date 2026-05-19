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
import type { IDisposable, ISelection, ITextRangeParam, Nullable } from '@univerjs/core';
import type { KeyCode } from '@univerjs/ui';
import { IUniverInstanceService, LocaleService } from '@univerjs/core';
export interface IShortcutExperienceSearch {
    unitId: string;
    sheetId: string;
    keycode: KeyCode;
}
export interface IShortcutExperienceParam extends IShortcutExperienceSearch {
    selection?: ISelection;
    textSelection?: ITextRangeParam;
}
/**
 * This service is prepared for shortcut experience optimization,
 * including the combined use of enter and tab, the highlighting experience of formulas in the editor, and so on.
 *
 */
export declare class ShortcutExperienceService implements IDisposable {
    private readonly _univerInstanceService;
    private readonly _localeService;
    private _current;
    private _shortcutParam;
    constructor(_univerInstanceService: IUniverInstanceService, _localeService: LocaleService);
    dispose(): void;
    getCurrentBySearch(searchParm: Nullable<IShortcutExperienceSearch>): Nullable<IShortcutExperienceParam>;
    getCurrent(): Nullable<IShortcutExperienceParam>;
    addOrUpdate(insertParam: IShortcutExperienceParam): Nullable<IShortcutExperienceParam>;
    remove(searchParm: Nullable<IShortcutExperienceSearch>): Nullable<IShortcutExperienceParam>;
    private _getCurrentBySearch;
}
