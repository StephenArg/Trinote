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
import type { IMutation } from '@univerjs/core';
import type { ISheetNote } from '../../models/sheets-note.model';
export interface IUpdateNoteMutationParams {
    unitId: string;
    sheetId: string;
    row: number;
    col: number;
    note: ISheetNote;
    silent?: boolean;
}
export declare const UpdateNoteMutation: IMutation<IUpdateNoteMutationParams>;
export interface IRemoveNoteMutationParams {
    unitId: string;
    sheetId: string;
    noteId?: string;
    row?: number;
    col?: number;
    silent?: boolean;
}
export declare const RemoveNoteMutation: IMutation<IRemoveNoteMutationParams>;
export interface IToggleNotePopupMutationParams {
    unitId: string;
    sheetId: string;
    noteId?: string;
    row?: number;
    col?: number;
    silent?: boolean;
}
export declare const ToggleNotePopupMutation: IMutation<IToggleNotePopupMutationParams>;
export interface IUpdateNotePositionMutationParams {
    unitId: string;
    sheetId: string;
    noteId?: string;
    row?: number;
    col?: number;
    newPosition: {
        row: number;
        col: number;
    };
    silent?: boolean;
}
export declare const UpdateNotePositionMutation: IMutation<IUpdateNotePositionMutationParams>;
