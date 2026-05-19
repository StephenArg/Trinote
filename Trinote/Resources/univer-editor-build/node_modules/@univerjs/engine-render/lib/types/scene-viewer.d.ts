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
import type { Nullable } from '@univerjs/core';
import type { IObjectFullState } from './basics/interfaces';
import type { IViewportInfo, Vector2 } from './basics/vector2';
import type { UniverRenderingContext } from './context';
import type { Scene } from './scene';
import { BaseObject } from './base-object';
import { RENDER_CLASS_TYPE } from './basics/const';
export declare class SceneViewer extends BaseObject {
    private _subScenes;
    private _activeSubScene;
    private _allowSelectedClipElement;
    constructor(key?: string, props?: IObjectFullState);
    get classType(): RENDER_CLASS_TYPE;
    render(mainCtx: UniverRenderingContext, bounds?: IViewportInfo): this;
    getSubScenes(): Map<string, Scene>;
    getActiveSubScene(): Nullable<Scene>;
    getSubScene(sceneKey: string): Scene | undefined;
    addSubScene(scene: Scene): void;
    removeSubScene(key: string): void;
    activeSubScene(key: Nullable<string>): void;
    enableSelectedClipElement(): void;
    disableSelectedClipElement(): void;
    allowSelectedClipElement(): boolean;
    pick(coord: Vector2): Nullable<BaseObject | Scene>;
    dispose(): void;
    private _initialProps;
}
