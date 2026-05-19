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
import type { ContextService, IDisposable, Nullable } from '@univerjs/core';
import { Disposable, IUniverInstanceService, UniverInstanceType } from '@univerjs/core';
type FocusHandlerFn = (unitId: string) => void;
export declare const FOCUSING_UNIVER = "FOCUSING_UNIVER";
export interface ILayoutService {
    readonly isFocused: boolean;
    get rootContainerElement(): Nullable<HTMLElement>;
    /** Re-focus the currently focused Univer business instance. */
    focus(): void;
    /** Register a focus handler to focus on certain type of Univer unit. */
    registerFocusHandler(type: UniverInstanceType, handler: FocusHandlerFn): IDisposable;
    /** Register the root container element. */
    registerRootContainerElement(container: HTMLElement): IDisposable;
    /** Register a content element. */
    registerContentElement(container: HTMLElement): IDisposable;
    /** Register an element as a container, especially floating components like Dialogs and Notifications. */
    registerContainerElement(container: HTMLElement): IDisposable;
    getContentElement(): HTMLElement;
    checkElementInCurrentContainers(element: HTMLElement): boolean;
    checkContentIsFocused(): boolean;
}
export declare const ILayoutService: import("@wendellhu/redi").IdentifierDecorator<ILayoutService>;
/**
 * This service is responsible for storing layout information of the current
 * Univer application instance.
 */
export declare class DesktopLayoutService extends Disposable implements ILayoutService {
    private readonly _contextService;
    private readonly _univerInstanceService;
    private _rootContainerElement;
    private _isFocused;
    get isFocused(): boolean;
    private readonly _focusHandlers;
    private _contentElements;
    private _allContainers;
    constructor(_contextService: ContextService, _univerInstanceService: IUniverInstanceService);
    get rootContainerElement(): Nullable<HTMLElement>;
    focus(): void;
    registerFocusHandler(type: UniverInstanceType, handler: FocusHandlerFn): IDisposable;
    registerContentElement(container: HTMLElement): IDisposable;
    getContentElement(): HTMLElement;
    registerRootContainerElement(container: HTMLElement): IDisposable;
    registerContainerElement(container: HTMLElement): IDisposable;
    checkElementInCurrentContainers(element: HTMLElement): boolean;
    checkContentIsFocused(): boolean;
    private _initUniverFocusListener;
    private _initEditorStatus;
}
export {};
