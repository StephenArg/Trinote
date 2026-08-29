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
import type { IRange, Worksheet } from '@univerjs/core';
import type { ISelectionWithStyle } from '@univerjs/sheets';
export declare function isSamePosition(range1: IRange, range2: IRange): boolean;
/**
 * Tell if `range2` is after (or the same as) `range1` with row direction is at priority.
 * @param range1
 * @param range2
 * @returns
 */
export declare function isBehindPositionWithRowPriority(range1: IRange, range2: IRange): boolean;
/**
 * Tell if `range2` is after (or the same as) `range1` with column direction is at priority.
 * @param range1
 * @param range2
 * @returns
 */
export declare function isBehindPositionWithColumnPriority(range1: IRange, range2: IRange): boolean;
/**
 * Tell if `range2` is before (or the same as) `range1` with column direction is at priority.
 * @param range1
 * @param range2
 * @returns
 */
export declare function isBeforePositionWithRowPriority(range1: IRange, range2: IRange): boolean;
export declare function isBeforePositionWithColumnPriority(range1: IRange, range2: IRange): boolean;
export declare function isSelectionSingleCell(selection: ISelectionWithStyle, worksheet: Worksheet): boolean;
