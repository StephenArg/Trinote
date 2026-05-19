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
import type { UniverRenderingContext } from '../../context';
import type { Scene } from '../../scene';
import { EventSubject } from '@univerjs/core';
import { SceneViewer } from '../../scene-viewer';
export declare enum SLIDE_NAVIGATION_KEY {
    LEFT = "__slideNavigationLeft__",
    RIGHT = "__slideNavigationRight__"
}
export declare class Slide extends SceneViewer {
    slideChangePageByNavigation$: EventSubject<Nullable<string>>;
    subSceneChanged$: EventSubject<Scene>;
    private _navigationEnabled;
    activeFirstPage(): void;
    /**
     * add pageScene to this._subScenes
     * @param pageScene
     */
    addPageScene(pageScene: Scene): void;
    changePage(id?: string): void;
    hasPage(key: string): Scene | undefined;
    addNavigation(): void;
    removeNavigation(): void;
    enableNav(): void;
    disableNav(): void;
    hiddenNav(): void;
    showNav(): void;
    renderToThumb(mainCtx: UniverRenderingContext, pageId: string, scaleX?: number, scaleY?: number): void;
    private _getSubScenesIndex;
    private _addNavTrigger;
    private _getArrowColor;
}
