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
import type { IStyleBase, ITextRotation } from '../../types/interfaces';
export declare const DEFAULT_FONTFACE_PLANE = "\"Helvetica Neue\", Helvetica, Arial, \"PingFang SC\", \"Hiragino Sans GB\", \"Heiti SC\", \"Microsoft YaHei\", \"WenQuanYi Micro Hei\", sans-serif";
export interface IDocumentSkeletonFontStyle {
    fontString: string;
    fontSize: number;
    originFontSize: number;
    fontFamily: string;
    fontCache: string;
}
export declare function getFontStyleString(textStyle?: IStyleBase): IDocumentSkeletonFontStyle;
export declare function getBaselineOffsetInfo(_fontFamily: string, fontSize: number): {
    sbr: number;
    sbo: number;
    spr: number;
    spo: number;
};
export declare function convertTextRotation(textRotation?: ITextRotation): {
    centerAngle: number;
    vertexAngle: number;
};
