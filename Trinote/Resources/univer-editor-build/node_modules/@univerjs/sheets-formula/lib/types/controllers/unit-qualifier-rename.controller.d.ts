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
import type { ICellData, Workbook } from '@univerjs/core';
import { Disposable, ICommandService, IUndoRedoService, IUniverInstanceService } from '@univerjs/core';
import { IDefinedNamesService } from '@univerjs/engine-formula';
export interface IUnitQualifierFormulaPatch {
    unitId: string;
    subUnitId: string;
    cellValue: Record<number, Record<number, ICellData>>;
}
export declare function collectUnitQualifierFormulaPatches(workbook: Workbook, oldName: string, newName: string): IUnitQualifierFormulaPatch[];
/** Keeps persisted Sheet formulas and defined names aligned when a Base Unit is renamed. */
export declare class UnitQualifierRenameController extends Disposable {
    private readonly _commandService;
    private readonly _undoRedoService;
    private readonly _univerInstanceService;
    private readonly _definedNamesService;
    private readonly _names;
    constructor(_commandService: ICommandService, _undoRedoService: IUndoRedoService, _univerInstanceService: IUniverInstanceService, _definedNamesService: IDefinedNamesService);
    private _watch;
    private _refactor;
}
