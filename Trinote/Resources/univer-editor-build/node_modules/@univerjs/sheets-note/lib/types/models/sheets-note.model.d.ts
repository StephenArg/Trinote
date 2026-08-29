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
import type { Nullable } from '@univerjs/core';
import type { ISheetLocationBase } from '@univerjs/sheets';
import { Disposable } from '@univerjs/core';
export interface ISheetNote {
    id: string;
    row: number;
    col: number;
    width: number;
    height: number;
    note: string;
    show?: boolean;
}
export type ISheetNoteChange = {
    unitId: string;
    subUnitId: string;
    oldNote: Nullable<ISheetNote>;
    silent?: boolean;
} & ({
    type: 'update';
    newNote: Nullable<ISheetNote>;
} | {
    type: 'ref';
    newNote: ISheetNote;
});
export declare class SheetsNoteModel extends Disposable {
    private _notesMap;
    private readonly _change$;
    readonly change$: import("rxjs").Observable<ISheetNoteChange>;
    private _ensureNotesMap;
    private _getNoteByPosition;
    private _getNoteById;
    private _getNoteByParams;
    getSheetShowNotes$(unitId: string, subUnitId: string): import("rxjs").Observable<{
        loc: ISheetLocationBase;
        note: ISheetNote;
    }[]>;
    getCellNoteChange$(unitId: string, subUnitId: string, row: number, col: number): import("rxjs").Observable<ISheetNoteChange>;
    updateNote(unitId: string, subUnitId: string, row: number, col: number, note: Partial<ISheetNote>, silent?: boolean): void;
    removeNote(unitId: string, subUnitId: string, params: {
        noteId?: string;
        row?: number;
        col?: number;
        silent?: boolean;
    }): void;
    toggleNotePopup(unitId: string, subUnitId: string, params: {
        noteId?: string;
        row?: number;
        col?: number;
        silent?: boolean;
    }): void;
    updateNotePosition(unitId: string, subUnitId: string, params: {
        noteId?: string;
        row?: number;
        col?: number;
        newRow: number;
        newCol: number;
        silent?: boolean;
    }): void;
    getNote(unitId: string, subUnitId: string, params: {
        noteId?: string;
        row?: number;
        col?: number;
    }): Nullable<ISheetNote>;
    getNotes(): Map<string, Map<string, Map<string, ISheetNote>>>;
    getUnitNotes(unitId: string): Map<string, Map<string, ISheetNote>> | undefined;
    getSheetNotes(unitId: string, subUnitId: string): Map<string, ISheetNote> | undefined;
    deleteUnitNotes(unitId: string): void;
}
