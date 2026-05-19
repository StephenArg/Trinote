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
import type { IMutationInfo, IRange, IStyleData } from '@univerjs/core';
import type { Observable } from 'rxjs';
import { Disposable, ICommandService, ILogService, IUndoRedoService, ObjectMatrix, ThemeService } from '@univerjs/core';
import { SheetsSelectionsService } from '@univerjs/sheets';
import { IMarkSelectionService } from '../mark-selection/mark-selection.service';
export interface IFormatPainterService {
    status$: Observable<FormatPainterStatus>;
    addHook(hooks: IFormatPainterHook): void;
    getHooks(): IFormatPainterHook[];
    setStatus(status: FormatPainterStatus): void;
    getStatus(): FormatPainterStatus;
    setSelectionFormat(format: ISelectionFormatInfo): void;
    getSelectionFormat(): ISelectionFormatInfo;
    applyFormatPainter(unitId: string, subUnitId: string, range: IRange): boolean;
}
export interface ISelectionFormatInfo {
    styles: ObjectMatrix<IStyleData>;
    merges: IRange[];
}
export interface IFormatPainterHook {
    id: string;
    isDefaultHook?: boolean;
    priority?: number;
    onStatusChange?(status: FormatPainterStatus): void;
    onApply?(unitId: string, subUnitId: string, range: IRange, format: ISelectionFormatInfo): {
        undos: IMutationInfo[];
        redos: IMutationInfo[];
    };
    onBeforeApply?(ctx: IFormatPainterBeforeApplyHookParams): boolean;
}
export declare enum FormatPainterStatus {
    OFF = 0,
    ONCE = 1,
    INFINITE = 2
}
export interface IFormatPainterBeforeApplyHookParams {
    unitId: string;
    subUnitId: string;
    range: IRange;
    redoMutationsInfo: IMutationInfo[];
    undoMutationsInfo: IMutationInfo[];
    format: ISelectionFormatInfo;
}
export declare const IFormatPainterService: import("@wendellhu/redi").IdentifierDecorator<IFormatPainterService>;
export declare class FormatPainterService extends Disposable implements IFormatPainterService {
    private readonly _selectionManagerService;
    private readonly _themeService;
    private readonly _markSelectionService;
    private readonly _logService;
    private readonly _commandService;
    private readonly _undoRedoService;
    readonly status$: Observable<FormatPainterStatus>;
    private _selectionFormat;
    private _markId;
    private readonly _status$;
    private _defaultHook;
    private _extendHooks;
    constructor(_selectionManagerService: SheetsSelectionsService, _themeService: ThemeService, _markSelectionService: IMarkSelectionService, _logService: ILogService, _commandService: ICommandService, _undoRedoService: IUndoRedoService);
    addHook(hook: IFormatPainterHook): void;
    getHooks(): IFormatPainterHook[];
    setStatus(status: FormatPainterStatus): void;
    getStatus(): FormatPainterStatus;
    setSelectionFormat(format: ISelectionFormatInfo): void;
    getSelectionFormat(): ISelectionFormatInfo;
    applyFormatPainter(unitId: string, subUnitId: string, range: IRange): boolean;
    private _updateRangeMark;
}
