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
import type { IDisposable, IUndoRedoItem } from '@univerjs/core';
import { Injector, LifecycleService } from '@univerjs/core';
import { FBase } from './f-base';
/**
 * @hideconstructor
 */
export declare class FHooks extends FBase {
    protected readonly _injector: Injector;
    private readonly _lifecycleService;
    constructor(_injector: Injector, _lifecycleService: LifecycleService);
    /**
     * @param callback
     * @deprecated use `univerAPI.addEvent(univerAPI.Event.LifeCycleChanged, ({ stage }) => {})` as instead
     */
    onStarting(callback: () => void): IDisposable;
    /**
     * @param callback
     * @deprecated use `univerAPI.addEvent(univerAPI.Event.LifeCycleChanged, ({ stage }) => {})` as instead
     */
    onReady(callback: () => void): IDisposable;
    /**
     * @param callback
     * @deprecated use `univerAPI.addEvent(univerAPI.Event.LifeCycleChanged, ({ stage }) => {})` as instead
     */
    onRendered(callback: () => void): IDisposable;
    /**
     * @param callback
     * @deprecated use `univerAPI.addEvent(univerAPI.Event.LifeCycleChanged, ({ stage }) => {})` as instead
     */
    onSteady(callback: () => void): IDisposable;
    /**
     * @param callback
     * @deprecated use `univerAPI.addEvent(univerAPI.Event.BeforeUndo, (event) => {})` as instead
     */
    onBeforeUndo(callback: (action: IUndoRedoItem) => void): IDisposable;
    /**
     * @param callback
     * @deprecated use `univerAPI.addEvent(univerAPI.Event.Undo, (event) => {})` as instead
     */
    onUndo(callback: (action: IUndoRedoItem) => void): IDisposable;
    /**
     * @param callback
     * @deprecated use `univerAPI.addEvent(univerAPI.Event.BeforeRedo, (event) => {})` as instead
     */
    onBeforeRedo(callback: (action: IUndoRedoItem) => void): IDisposable;
    /**
     * @param callback
     * @deprecated use `univerAPI.addEvent(univerAPI.Event.Redo, (event) => {})` as instead
     */
    onRedo(callback: (action: IUndoRedoItem) => void): IDisposable;
}
