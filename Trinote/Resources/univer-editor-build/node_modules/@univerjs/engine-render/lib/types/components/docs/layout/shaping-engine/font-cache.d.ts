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
import type { IDocumentSkeletonBoundingBox, IDocumentSkeletonFontStyle } from '../../../../basics/i-document-skeleton-cached';
import type { IOpenTypeGlyphInfo } from './text-shaping';
export declare const DEFAULT_MEASURE_TEXT = "0";
export interface IMeasureTextCache {
    fontBoundingBoxAscent: number;
    fontBoundingBoxDescent: number;
    actualBoundingBoxAscent: number;
    actualBoundingBoxDescent: number;
    width: number;
}
export declare class FontCache {
    private static _getTextHeightCache;
    private static _context;
    private static _fontDataMap;
    private static _globalFontMeasureCache;
    static get globalFontMeasureCache(): Map<string, Map<string, IMeasureTextCache>>;
    static setFontMeasureCache(fontStyle: string, content: string, tm: IMeasureTextCache): void;
    static clearFontMeasureCache(path: string): boolean;
    static getFontMeasureCache(fontStyle: string, content: string): Nullable<IMeasureTextCache>;
    static autoCleanFontMeasureCache(cacheLimit?: number): boolean;
    static getBaselineOffsetInfo(fontFamily: string, fontSize: number): {
        sbr: number;
        sbo: number;
        spr: number;
        spo: number;
    };
    static getTextSizeByDom(text: string, fontStyle: string): {
        width: number;
        height: number;
    };
    static getTextSize(content: string, fontStyle: IDocumentSkeletonFontStyle): IDocumentSkeletonBoundingBox;
    static getBBoxFromGlyphInfo(glyphInfo: IOpenTypeGlyphInfo, fontStyle: IDocumentSkeletonFontStyle): {
        width: number;
        ba: number;
        bd: number;
        aba: number;
        abd: number;
        sp: number;
        sbr: number;
        spr: number;
        sbo: number;
        spo: number;
    };
    /**
     * Measure text on another canvas.
     * @param content
     * @param fontString
     * @returns IMeasureTextCache
     */
    static getMeasureText(content: string, fontString: string): IMeasureTextCache;
    private static _clearMeasureCache;
    /**
     * Vertical Metrics https://glyphsapp.com/learn/vertical-metrics
     * @param fontFamily
     * @param fontSize
     * @param content
     * @returns
     */
    private static _getBoundingBoxByFont;
    private static _calculateBoundingBoxByMeasureText;
}
