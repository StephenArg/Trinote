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
import type { ICellData, ICommand, IObjectMatrixPrimitiveType, IRange } from '@univerjs/core';
import { Direction } from '@univerjs/core';
export interface IInsertRowCommandParams {
    unitId: string;
    subUnitId: string;
    /**
     * whether it is inserting row after (DOWN) or inserting before (UP)
     *
     * this determines styles of the cells in the inserted rows
     */
    direction: Direction.UP | Direction.DOWN;
    /**
     * The range will the row be inserted.
     */
    range: IRange;
    cellValue?: IObjectMatrixPrimitiveType<ICellData>;
}
export declare const InsertRowCommandId = "sheet.command.insert-row";
export declare const InsertRowByRangeCommand: ICommand;
export declare const InsertRowBeforeCommand: ICommand;
export declare const InsertRowAfterCommand: ICommand;
export interface IInsertMultiRowsCommandParams {
    value: number;
}
export declare const InsertMultiRowsAboveCommand: ICommand;
export declare const InsertMultiRowsAfterCommand: ICommand;
export interface IInsertColCommandParams {
    unitId: string;
    subUnitId: string;
    range: IRange;
    direction: Direction.LEFT | Direction.RIGHT;
    cellValue?: IObjectMatrixPrimitiveType<ICellData>;
}
export declare const InsertColCommandId = "sheet.command.insert-col";
export declare const InsertColCommand: ICommand<IInsertColCommandParams>;
export declare const InsertColByRangeCommand: ICommand<IInsertColCommandParams>;
export declare const InsertColBeforeCommand: ICommand;
export declare const InsertColAfterCommand: ICommand;
export interface IInsertMultiColsCommandParams {
    value: number;
}
export declare const InsertMultiColsLeftCommand: ICommand;
export declare const InsertMultiColsRightCommand: ICommand;
