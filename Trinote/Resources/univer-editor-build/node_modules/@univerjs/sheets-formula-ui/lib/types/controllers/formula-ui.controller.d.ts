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
import { Disposable, ICommandService, Injector } from '@univerjs/core';
import { IRenderManagerService } from '@univerjs/engine-render';
import { ComponentManager, IMenuManagerService, IShortcutService, IUIPartsService } from '@univerjs/ui';
export declare class FormulaUIController extends Disposable {
    private readonly _injector;
    private readonly _menuManagerService;
    private readonly _commandService;
    private readonly _shortcutService;
    private readonly _uiPartsService;
    private readonly _renderManagerService;
    private readonly _componentManager;
    constructor(_injector: Injector, _menuManagerService: IMenuManagerService, _commandService: ICommandService, _shortcutService: IShortcutService, _uiPartsService: IUIPartsService, _renderManagerService: IRenderManagerService, _componentManager: ComponentManager);
    private _initialize;
    private _registerMenus;
    private _registerCommands;
    private _registerShortcuts;
    private _registerComponents;
    private _registerRenderModules;
}
