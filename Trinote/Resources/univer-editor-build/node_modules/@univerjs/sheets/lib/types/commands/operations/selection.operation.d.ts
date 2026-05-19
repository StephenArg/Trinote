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
import type { ICommand, IOperation, IRange } from '@univerjs/core';
import type { ISelectionWithStyle } from '../../basics/selection';
import type { SelectionMoveType } from '../../services/selections/type';
export interface ISetSelectionsOperationParams {
    unitId: string;
    subUnitId: string;
    selections: ISelectionWithStyle[];
    type?: SelectionMoveType;
    /** If should scroll to the selected range. */
    reveal?: boolean;
    extra?: string;
}
/**
 * Set selections to SelectionModel(WorkbookSelectionModel) by selectionManagerService.
 */
export declare const SetSelectionsOperation: IOperation<ISetSelectionsOperationParams>;
export interface ISelectRangeCommandParams {
    unitId: string;
    subUnit: string;
    range: IRange;
    /** If should scroll to the selected range. */
    reveal?: boolean;
    extra?: string;
}
export declare const SelectRangeCommand: ICommand<ISelectRangeCommandParams>;
