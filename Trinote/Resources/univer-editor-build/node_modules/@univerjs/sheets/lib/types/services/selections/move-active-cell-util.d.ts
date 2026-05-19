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
import type { ISelectionWithStyle } from '../../basics';
import { Direction } from '@univerjs/core';
/**
 * Get the next primary cell in the specified direction. If the primary cell not exists in selections, return null.
 * @param selections The current selections.
 * @param {Direction} direction The direction to move the primary cell.The enum value is maybe one of the following: UP(0),RIGHT(1), DOWN(2), LEFT(3).
 * @param {Worksheet} worksheet The worksheet instance.
 * @returns {IRange | null} The next primary cell.
 */
export declare const getNextPrimaryCell: (selections: ISelectionWithStyle[], direction: Direction, worksheet: Worksheet) => IRange | null;
