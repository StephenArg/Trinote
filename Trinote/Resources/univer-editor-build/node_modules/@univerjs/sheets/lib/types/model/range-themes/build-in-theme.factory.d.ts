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
import { RangeThemeStyle } from '../range-theme-util';
export declare const lightRangeThemeBuilder: (baseName: string, header: string, color: string) => RangeThemeStyle;
export declare const middleRangeThemeBuilder: (baseName: string, rowHeader: string, colHeader: string) => RangeThemeStyle;
export declare const darkRangeThemeBuilder: (baseName: string, rowHeader: string, firstRow: string, secondRow: string) => RangeThemeStyle;
export declare const buildInThemes: RangeThemeStyle[];
