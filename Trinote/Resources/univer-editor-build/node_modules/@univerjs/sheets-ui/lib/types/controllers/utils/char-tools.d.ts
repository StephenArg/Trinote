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
import type { IFunctionService, LexerTreeBuilder } from '@univerjs/engine-formula';
import { LocaleType } from '@univerjs/core';
export declare function isCJKLocale(locale: LocaleType): boolean;
/**
 * Convert all full-width characters to half-width characters and try to parse them. If the parsing is successful, apply them. If the parsing is not successful, return them to full-width characters.
 *
 * Convert full-width characters to half-width characters
 * 1. Formula
 * 2. Boolean
 * 3. Formatted number
 *
 * Not converted
 * 1. Force string
 * 2. Chinese single and double quotation marks
 * 3. Characters between single and double quotes in formulas
 * 4. Other text that cannot be recognized as formulas, Boolean values, or numbers
 *
 * @param str
 * @param lexerTreeBuilder
 * @returns
 */
export declare function normalizeString(str: string, lexerTreeBuilder: LexerTreeBuilder, currentLocale: LocaleType, functionService: IFunctionService): string;
