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
import type { IGlowEffect, IShadowEffect } from '@univerjs/core';
import type { IBoundRectNoAngle } from './vector2';
export interface IResolvedDrawingShadow {
    color: string;
    blurRadius: number;
    offsetX: number;
    offsetY: number;
}
export declare function resolveOuterShadowEffect(effect: IShadowEffect | undefined): IResolvedDrawingShadow | undefined;
export declare function resolveGlowEffect(effect: IGlowEffect | undefined): IResolvedDrawingShadow | undefined;
/**
 * Resolves effects painted from an off-screen alpha mask.
 *
 * A glow uses two centered mask passes to match PowerPoint's DrawingML glow density without repainting source content.
 */
export declare function resolveDrawingEffectMasks(glow: IGlowEffect | undefined, outerShadow: IShadowEffect | undefined): IResolvedDrawingShadow[];
export declare function expandDrawingEffectBounds(bounds: IBoundRectNoAngle, glow: IGlowEffect | undefined, outerShadow: IShadowEffect | undefined): IBoundRectNoAngle;
export declare function createDrawingEffectFilter(glow: IGlowEffect | undefined, outerShadow: IShadowEffect | undefined): string;
export declare function combineDrawingEffectFilter(currentFilter: string, effectFilter: string): string;
