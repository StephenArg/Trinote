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
import type { ISheetCommandSharedParams } from '../utils/interface';
export interface IRemoveRowColCommandParams extends Partial<ISheetCommandSharedParams> {
    range: IRange;
}
export interface IRemoveRowColCommandInterceptParams extends IRemoveRowColCommandParams {
    ranges?: IRange[];
}
export interface IRemoveRowByRangeCommandParams {
    range: IRange;
    unitId: string;
    subUnitId: string;
}
export interface IRemoveColByRangeCommandParams {
    range: IRange;
    unitId: string;
    subUnitId: string;
}
export declare const RemoveRowCommandId = "sheet.command.remove-row";
export declare const RemoveRowByRangeCommand: ICommand<IRemoveRowByRangeCommandParams>;
/**
 * This command would remove the selected rows. These selected rows can be non-continuous.
 */
export declare const RemoveRowCommand: ICommand<IRemoveRowColCommandParams>;
export declare const RemoveColCommandId = "sheet.command.remove-col";
export declare const RemoveColByRangeCommand: ICommand<IRemoveColByRangeCommandParams>;
/**
 * This command would remove the selected columns. These selected rows can be non-continuous.
 */
export declare const RemoveColCommand: ICommand;
