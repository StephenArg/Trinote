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
import type { IDocumentBody, Nullable } from '@univerjs/core';
import type Opentype from 'opentype.js';
interface IBoundingBox {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}
export interface IOpenTypeGlyphInfo {
    char: string;
    start: number;
    end: number;
    glyph: Nullable<Opentype.Glyph>;
    font: Nullable<Opentype.Font>;
    kerning: number;
    boundingBox: Nullable<IBoundingBox>;
}
export declare function textShape(body: IDocumentBody): IOpenTypeGlyphInfo[];
export {};
