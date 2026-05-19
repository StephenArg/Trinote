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
import type { IStyleBase, Nullable } from '@univerjs/core';
interface IFontData {
    readonly family: string;
    readonly fullName: string;
    readonly postscriptName: string;
    readonly style: string;
}
interface IFontWithBuffer {
    readonly font: IFontData;
    readonly buffer: ArrayBuffer;
}
declare enum FontStyle {
    Normal = 0,
    Italic = 1,
    Oblique = 2
}
declare enum FontWeight {
    THIN = 100,
    EXTRALIGHT = 200,
    LIGHT = 300,
    REGULAR = 400,
    MEDIUM = 500,
    SEMIBOLD = 600,
    BOLD = 700,
    EXTRABOLD = 800,
    BLACK = 900
}
interface IFontVariant {
    style: FontStyle;
    weight: FontWeight;
}
export interface IFontInfo {
    family: string;
    variant: IFontVariant;
}
declare class FontLibrary {
    isReady: boolean;
    private _fontBook;
    constructor();
    private _loadFontsToBook;
    findBestMatchFontByStyle(style: IStyleBase): Nullable<IFontWithBuffer>;
    getValidFontFamilies(families: string[]): string[];
}
export declare const fontLibrary: FontLibrary;
export {};
