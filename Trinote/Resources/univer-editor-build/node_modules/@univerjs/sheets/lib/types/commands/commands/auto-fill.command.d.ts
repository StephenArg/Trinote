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
import type { ICommand, IRange } from '@univerjs/core';
import { AUTO_FILL_APPLY_TYPE } from '../../services/auto-fill/type';
export interface IAutoFillCommandParams {
    sourceRange: IRange;
    targetRange: IRange;
    unitId?: string;
    subUnitId?: string;
    applyType?: AUTO_FILL_APPLY_TYPE;
}
export declare const AutoFillCommand: ICommand;
export declare const SheetCopyDownCommand: ICommand;
export declare const SheetCopyRightCommand: ICommand;
export interface IAutoClearContentCommand {
    clearRange: IRange;
    selectionRange: IRange;
}
export declare const AutoClearContentCommand: ICommand;
