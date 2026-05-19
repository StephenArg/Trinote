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
import type { IShortcutItem } from '@univerjs/ui';
import { KeyCode } from '@univerjs/ui';
export declare const ARROW_SELECTION_KEYCODE_LIST: KeyCode[];
export declare const MOVE_SELECTION_KEYCODE_LIST: KeyCode[];
export declare function generateArrowSelectionShortCutItem(): IShortcutItem<object>[];
export declare const StartEditWithF2Shortcut: IShortcutItem;
export declare const RepeatLastActionShortcut: IShortcutItem;
export declare const EditorCursorEnterShortcut: IShortcutItem;
export declare const EditorCursorTabShortcut: IShortcutItem;
export declare const EditorCursorEscShortcut: IShortcutItem;
export declare const EditorCursorCtrlEnterShortcut: IShortcutItem;
export declare const EditorBreakLineShortcut: IShortcutItem;
export declare const EditorDeleteLeftShortcut: IShortcutItem;
export declare const EditorDeleteRightShortcut: IShortcutItem;
export declare const ShiftEditorDeleteLeftShortcut: IShortcutItem;
export declare const EditorDeleteLeftShortcutInActive: IShortcutItem;
