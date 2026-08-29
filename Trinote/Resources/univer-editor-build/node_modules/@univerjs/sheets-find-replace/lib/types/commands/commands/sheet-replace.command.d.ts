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
import type { ICellData, ICommand, IObjectArrayPrimitiveType } from '@univerjs/core';
import type { IReplaceAllResult } from '@univerjs/find-replace';
export interface ISheetReplaceCommandParams {
    unitId: string;
    replacements: ISheetReplacement[];
}
export interface ISheetReplacement {
    count: number;
    subUnitId: string;
    value: IObjectArrayPrimitiveType<ICellData>;
}
/**
 * This command is used for the SheetFindReplaceController to deal with replacing, including undo redo.
 *
 */
export declare const SheetReplaceCommand: ICommand<ISheetReplaceCommandParams, IReplaceAllResult>;
