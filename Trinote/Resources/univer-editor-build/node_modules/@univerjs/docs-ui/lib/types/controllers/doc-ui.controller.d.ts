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
import { Disposable, ICommandService, IConfigService, Injector, IUniverInstanceService } from '@univerjs/core';
import { ComponentManager, ILayoutService, IMenuManagerService, IShortcutService, IUIPartsService } from '@univerjs/ui';
export declare class DocUIController extends Disposable {
    protected readonly _injector: Injector;
    protected readonly _componentManager: ComponentManager;
    protected readonly _commandService: ICommandService;
    protected readonly _layoutService: ILayoutService;
    protected readonly _menuManagerService: IMenuManagerService;
    protected readonly _uiPartsService: IUIPartsService;
    protected readonly _univerInstanceService: IUniverInstanceService;
    protected readonly _shortcutService: IShortcutService;
    protected readonly _configService: IConfigService;
    constructor(_injector: Injector, _componentManager: ComponentManager, _commandService: ICommandService, _layoutService: ILayoutService, _menuManagerService: IMenuManagerService, _uiPartsService: IUIPartsService, _univerInstanceService: IUniverInstanceService, _shortcutService: IShortcutService, _configService: IConfigService);
    private _initCustomComponents;
    private _initUiParts;
    private _initMenus;
    private _initShortCut;
    private _init;
    private _initCommands;
    private _initFocusHandler;
}
