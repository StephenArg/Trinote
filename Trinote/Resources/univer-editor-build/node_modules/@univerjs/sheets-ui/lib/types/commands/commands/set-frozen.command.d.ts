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
export declare enum SetSelectionFrozenType {
    RowColumn = 0,
    Row = 1,
    Column = 2,
    FirstRow = 3,
    FirstColumn = 4
}
export interface ISetSelectionFrozenCommandParams {
    type?: SetSelectionFrozenType;
}
export declare const SetSelectionFrozenCommand: ICommand<ISetSelectionFrozenCommandParams>;
export declare const SetRowFrozenCommand: ICommand;
export declare const SetColumnFrozenCommand: ICommand;
export declare const SetFirstRowFrozenCommand: ICommand;
export declare const SetFirstColumnFrozenCommand: ICommand;
