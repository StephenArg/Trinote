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
import type { ICellWithCoord, IRange, IRangeWithCoord, ISelectionCell } from '@univerjs/core';
import type { SpreadsheetSkeleton } from '@univerjs/engine-render';
import type { ISelectionWithCoord, ISelectionWithStyle } from '../basics';
/**
 * Add startXY endXY to range, XY are no merge cell position.
 * @returns {IRangeWithCoord} range with coord
 */
export declare function attachRangeWithCoord(skeleton: SpreadsheetSkeleton, range: IRange): IRangeWithCoord;
/**
 * Return selection with coord and style from selection, which has range & primary & style.
 * coord are no merge cell position.
 * @returns {ISelectionWithCoord} selection with coord and style
 */
export declare function attachSelectionWithCoord(selection: ISelectionWithStyle, skeleton: SpreadsheetSkeleton): ISelectionWithCoord;
/**
 * Add startXY endXY to primary, XY are no merge cell position.
 * @returns {ICellWithCoord} primary with coord
 */
export declare function attachPrimaryWithCoord(skeleton: SpreadsheetSkeleton, primary: ISelectionCell): ICellWithCoord;
