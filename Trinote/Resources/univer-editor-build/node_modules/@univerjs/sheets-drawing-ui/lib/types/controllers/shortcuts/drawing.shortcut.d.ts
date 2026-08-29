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
import type { IContextService } from '@univerjs/core';
import type { IShortcutItem } from '@univerjs/ui';
import type { IMoveDrawingsCommandParams } from '../../commands/commands/move-drawings.command';
export declare function whenSheetDrawingFocused(contextService: IContextService): boolean;
export declare const MoveDrawingDownShortcutItem: IShortcutItem<IMoveDrawingsCommandParams>;
export declare const MoveDrawingUpShortcutItem: IShortcutItem<IMoveDrawingsCommandParams>;
export declare const MoveDrawingLeftShortcutItem: IShortcutItem<IMoveDrawingsCommandParams>;
export declare const MoveDrawingRightShortcutItem: IShortcutItem<IMoveDrawingsCommandParams>;
export declare const DeleteDrawingsShortcutItem: IShortcutItem;
