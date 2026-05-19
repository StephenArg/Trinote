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
import type { ICommand } from '@univerjs/core';
/**
 * It is used to set the bold style of selections or one cell, need to distinguish between
 *  **selection state** and **edit state**. If you are in the selective state,
 *  you need to set the style on the cell and the style on the rich text(p textRuns) at the same time,
 *  and if it is only in edit state, then you only need to set the style of the rich text(p textRuns)
 */
export declare const SetRangeBoldCommand: ICommand;
export declare const SetRangeItalicCommand: ICommand;
export declare const SetRangeUnderlineCommand: ICommand;
export declare const SetRangeStrickThroughCommand: ICommand;
export declare const SetRangeSubscriptCommand: ICommand;
export declare const SetRangeSuperscriptCommand: ICommand;
export declare const SetRangeFontSizeCommand: ICommand;
export declare const SetRangeFontIncreaseCommand: ICommand;
export declare const SetRangeFontDecreaseCommand: ICommand;
export declare const SetRangeFontFamilyCommand: ICommand;
export declare const SetRangeTextColorCommand: ICommand;
export declare const ResetRangeTextColorCommand: ICommand;
