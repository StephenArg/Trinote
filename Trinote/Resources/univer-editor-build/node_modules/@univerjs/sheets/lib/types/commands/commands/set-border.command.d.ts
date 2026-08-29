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
import type { BorderStyleTypes, ICommand, IRange } from '@univerjs/core';
import type { IBorderInfo } from '../../services/border-style-manager.service';
import { BorderType } from '@univerjs/core';
export interface ISetBorderBasicCommandParams {
    unitId?: string;
    subUnitId?: string;
    ranges: IRange[];
    value: IBorderInfo;
}
export interface ISetBorderPositionCommandParams {
    value: BorderType;
}
export interface ISetBorderStyleCommandParams {
    value: BorderStyleTypes;
}
export interface ISetBorderCommandParams {
    unitId?: string;
    subUnitId?: string;
    ranges?: IRange[];
}
export interface ISetBorderColorCommandParams {
    value: string;
}
/**
 * Set border info for range, including clear border (type = NONE)
 */
export declare const SetBorderCommand: ICommand;
export declare const SetBorderPositionCommand: ICommand<ISetBorderPositionCommandParams>;
export declare const SetBorderStyleCommand: ICommand;
export declare const SetBorderColorCommand: ICommand<ISetBorderColorCommandParams>;
export declare const SetBorderBasicCommand: ICommand<ISetBorderBasicCommandParams>;
