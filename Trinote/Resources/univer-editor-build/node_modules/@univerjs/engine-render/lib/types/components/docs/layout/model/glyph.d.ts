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
import type { IAdjustability, IDocumentSkeletonBullet, IDocumentSkeletonDivide, IDocumentSkeletonGlyph } from '../../../../basics/i-document-skeleton-cached';
import type { IFontCreateConfig } from '../../../../basics/interfaces';
import type { IOpenTypeGlyphInfo } from '../shaping-engine/text-shaping';
import { GlyphType } from '../../../../basics/i-document-skeleton-cached';
export declare function isSpace(char: string): boolean;
export declare function isJustifiable(content: string): boolean;
export declare function baseAdjustability(content: string, width: number): IAdjustability;
export declare function createSkeletonWordGlyph(content: string, config: IFontCreateConfig, glyphWidth?: number): IDocumentSkeletonGlyph;
export declare function createSkeletonLetterGlyph(content: string, config: IFontCreateConfig, glyphWidth?: number, glyphInfo?: IOpenTypeGlyphInfo): IDocumentSkeletonGlyph;
export declare function createSkeletonTabGlyph(config: IFontCreateConfig, glyphWidth?: number): IDocumentSkeletonGlyph;
export declare function createHyphenDashGlyph(config: IFontCreateConfig): IDocumentSkeletonGlyph;
export declare function createSkeletonCustomBlockGlyph(config: IFontCreateConfig, glyphWidth?: number, glyphHeight?: number, drawingId?: string): IDocumentSkeletonGlyph;
export declare function _createSkeletonWordOrLetter(glyphType: GlyphType, content: string, config: IFontCreateConfig, glyphWidth?: number, glyphInfo?: IOpenTypeGlyphInfo): IDocumentSkeletonGlyph;
export declare function createSkeletonBulletGlyph(glyph: IDocumentSkeletonGlyph, bulletSkeleton: IDocumentSkeletonBullet, charSpaceApply: number): IDocumentSkeletonGlyph;
export declare function setGlyphGroupLeft(glyphGroup: IDocumentSkeletonGlyph[], left?: number): void;
export declare function setGlyphLeft(glyph: IDocumentSkeletonGlyph, left?: number): void;
export declare function addGlyphToDivide(divide: IDocumentSkeletonDivide, glyphGroup: IDocumentSkeletonGlyph[], offsetLeft?: number): void;
export declare function glyphShrinkRight(glyph: IDocumentSkeletonGlyph, amount: number): void;
export declare function glyphShrinkLeft(glyph: IDocumentSkeletonGlyph, amount: number): void;
