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
import type { FormatColor, FormatSection, ParsedPattern, ResolvedFormatOptions } from './types';
/** Select the same conditional/sign format section for both display formatting and editor-value formatting. */
export declare function getValueFormatSection(value: number | bigint, parts: Array<FormatSection | undefined>): FormatSection | undefined;
export declare function formatColor(value: unknown, pattern: ParsedPattern, options: ResolvedFormatOptions): FormatColor;
export declare function formatValue(value: unknown, pattern: ParsedPattern, options: ResolvedFormatOptions): string;
