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
/**
 * Escapes text so it can be embedded in a regular-expression pattern as a literal.
 */
export declare function escapeRegExp(value: string): string;
/**
 * Creates a `RegExp` that matches literal text rather than regular-expression syntax.
 */
export declare function createLiteralRegExp(value: string, flags?: string): RegExp;
/**
 * Converts a spreadsheet-style wildcard pattern to an anchored regular expression.
 *
 * `*` matches any number of characters and `?` matches one character. All other
 * regular-expression syntax is treated as literal text. Matching is case-insensitive.
 */
export declare function createFromWildcard(pattern: string): RegExp;
