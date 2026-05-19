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
import type { UniverRenderingContext } from './context';
import type { Scene } from './scene';
import { Disposable } from '@univerjs/core';
import { BaseObject } from './base-object';
export declare class Layer extends Disposable {
    private _scene;
    private _zIndex;
    private _allowCache;
    private _objects;
    private _cacheCanvas;
    protected _dirty: boolean;
    private _debounceDirtyFunc;
    constructor(_scene: Scene, objects?: BaseObject[], _zIndex?: number, _allowCache?: boolean);
    get scene(): Scene;
    get zIndex(): number;
    enableCache(): void;
    disableCache(): void;
    isAllowCache(): boolean;
    /**
     * Get direct visible children in order. (direct means object is not in group), default order is ascending by z-index.
     * @returns {BaseObject[]} objects
     */
    getObjectsByOrder(): BaseObject[];
    /**
     * Get visible and evented objects.
     * @returns {BaseObject[]} objects
     */
    getObjectsByOrderForPick(): BaseObject[];
    getObjects(): BaseObject[];
    /**
     * Insert object to this._objects, if object is a group, insert all its children and group itself to _objects[]
     * @param o
     * @returns {Layer} this
     */
    addObject(o: BaseObject): Layer;
    removeObject(object: BaseObject | string): void;
    /**
     * Insert objects to this._objects, if object is a group, insert all its children and group itself to _objects[]
     * @param objects
     * @returns {Layer} this
     */
    addObjects(objects: BaseObject[]): Layer;
    removeObjects(objects: BaseObject[] | string[]): void;
    makeDirty(state?: boolean): this;
    makeDirtyWithDebounce(state?: boolean): void;
    isDirty(): boolean;
    render(parentCtx?: UniverRenderingContext, isMaxLayer?: boolean): this;
    private _layerBehavior;
    private _initialCacheCanvas;
    private _draw;
    private _applyCache;
    private _resizeCacheCanvas;
    clear(): void;
    dispose(): void;
}
