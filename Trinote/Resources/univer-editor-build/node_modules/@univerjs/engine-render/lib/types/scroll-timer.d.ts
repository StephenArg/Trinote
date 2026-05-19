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
import type { IPaddingData } from '@univerjs/core';
import type { Scene } from './scene';
import type { Viewport } from './viewport';
export declare enum ScrollTimerType {
    NONE = 0,
    X = 1,
    Y = 2,
    ALL = 3
}
export declare class ScrollTimer {
    private _scene;
    private _scrollTimerType;
    private _thresholdAutoMove;
    private _requestNewFrameNumber;
    private _viewport;
    private _offsetX;
    private _offsetY;
    private _moveX;
    private _moveY;
    private _scrollX;
    private _scrollY;
    /**
     * Customize scroll function.
     */
    private _scrollFunction;
    constructor(_scene: Scene, _scrollTimerType?: ScrollTimerType, _thresholdAutoMove?: IPaddingData);
    static create(scene: Scene, scrollTimerType?: ScrollTimerType, padding?: IPaddingData): ScrollTimer;
    get offsetX(): number;
    get offsetY(): number;
    set scrollTimerType(type: ScrollTimerType);
    get scrollTimerType(): ScrollTimerType;
    setActiveViewport(viewport: Viewport): void;
    getActiveViewport(): any;
    startScroll(offsetX: number, offsetY: number, targetViewport?: any): void;
    private _autoScroll;
    scrolling(offsetX: number, offsetY: number, scrollFunction: (x?: number, y?: number) => void): void;
    stopScroll(): void;
    dispose(): void;
    getScene(): Scene;
    private _runRenderLoop;
}
