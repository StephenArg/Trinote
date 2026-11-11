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
import type { ICommand } from '@univerjs/core';
import { Disposable, ICommandService, IConfigService, IContextService, Injector, IUniverInstanceService } from '@univerjs/core';
import { IRenderManagerService } from '@univerjs/engine-render';
import { ILayoutService, IMenuManagerService, IShortcutService, IUIPartsService } from '@univerjs/ui';
import { IEditorBridgeService } from '../../services/editor-bridge.service';
export declare const MobileFormulaBarBreakLineCommand: ICommand;
export declare const MobileFormulaBarSubmitCommand: ICommand;
export declare class SheetUIMobileController extends Disposable {
    protected readonly _injector: Injector;
    protected readonly _layoutService: ILayoutService;
    protected readonly _commandService: ICommandService;
    protected readonly _menuManagerService: IMenuManagerService;
    protected readonly _uiPartsService: IUIPartsService;
    protected readonly _shortcutService: IShortcutService;
    protected readonly _configService: IConfigService;
    protected readonly _editorBridgeService: IEditorBridgeService;
    protected readonly _contextService: IContextService;
    protected readonly _renderManagerService: IRenderManagerService;
    protected readonly _univerInstanceService: IUniverInstanceService;
    constructor(_injector: Injector, _layoutService: ILayoutService, _commandService: ICommandService, _menuManagerService: IMenuManagerService, _uiPartsService: IUIPartsService, _shortcutService: IShortcutService, _configService: IConfigService, _editorBridgeService: IEditorBridgeService, _contextService: IContextService, _renderManagerService: IRenderManagerService, _univerInstanceService: IUniverInstanceService);
    private _init;
    private _initCommands;
    private _initMenus;
    private _initWorkbenchParts;
    private _initFocusHandler;
    private _focusCellEditorInput;
    private _initKeyboardViewportState;
    private _initMobileFxShortcut;
}
export declare function isMobileKeyboardVisible(stableHeight: number, visibleBottom: number): boolean;
