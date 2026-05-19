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
import type { IShortcutItem } from '../services/shortcut/shortcut.service';
import { Disposable, ICommandService } from '@univerjs/core';
import { IShortcutService } from '../services/shortcut/shortcut.service';
export declare const CopyShortcutItem: IShortcutItem;
export declare const CutShortcutItem: IShortcutItem;
/**
 * This shortcut item is just for displaying shortcut info, do not use it.
 */
export declare const OnlyDisplayPasteShortcutItem: IShortcutItem;
export declare const UndoShortcutItem: IShortcutItem;
export declare const RedoShortcutItem: IShortcutItem;
/**
 * Define shared UI behavior across Univer business. Including undo / redo and clipboard operations.
 */
export declare class SharedController extends Disposable {
    private readonly _shortcutService;
    private readonly _commandService;
    constructor(_shortcutService: IShortcutService, _commandService: ICommandService);
    initialize(): void;
    private _registerCommands;
    private _registerShortcuts;
}
