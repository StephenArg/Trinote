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
export interface IAlignmentRect {
    left: number;
    top: number;
    width: number;
    height: number;
}
export type AlignmentSnapAxis = 'x' | 'y';
export interface IAlignmentSnapGuide {
    id: string;
    axis: AlignmentSnapAxis;
    position: number;
}
export interface IAlignmentSnapSessionConfig {
    enterThreshold?: number;
    exitThreshold?: number;
    breakawayThreshold?: number;
    softThreshold?: number;
    hardThreshold?: number;
    softMaxStrength?: number;
    cooldownMs?: number;
}
export interface IAlignmentSnapAxisOptions {
    axis: AlignmentSnapAxis;
    value: number;
    guide: IAlignmentSnapGuide | null;
    now?: number;
}
export interface IAlignmentSnapAxisResult {
    snapped: boolean;
    value: number;
    guide: IAlignmentSnapGuide | null;
}
export declare function normalizeAlignmentRect(rect: IAlignmentRect): IAlignmentRect;
export declare function getAlignmentRectXAnchors(rect: IAlignmentRect): [number, number, number];
export declare function getAlignmentRectYAnchors(rect: IAlignmentRect): [number, number, number];
export declare function getClosestAlignmentOffset(activeAnchors: readonly number[], targetAnchors: readonly number[], threshold: number): number;
export declare class AlignmentSnapSession {
    private readonly _enterThreshold;
    private readonly _exitThreshold;
    private readonly _breakawayThreshold;
    private readonly _softThreshold;
    private readonly _hardThreshold;
    private readonly _softMaxStrength;
    private readonly _cooldownMs;
    private _activeGuideId;
    private _activeGuideStartValue;
    private _releasedUntil;
    constructor(config?: IAlignmentSnapSessionConfig);
    reset(): void;
    resolveAxisSnap(options: IAlignmentSnapAxisOptions): IAlignmentSnapAxisResult;
    private _resolveSnappedValue;
}
