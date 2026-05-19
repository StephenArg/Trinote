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
import type { ICommandInfo, IDisposable, IRange } from '@univerjs/core';
import { Disposable, ICommandService } from '@univerjs/core';
export type RepeatableCommandHandler<T = any> = (selections: IRange[], params?: T) => T | undefined;
export declare enum RepeatLastActionPermission {
    None = "none",
    Editable = "editable",
    CellStyle = "cellStyle",
    CellValue = "cellValue",
    RowStyle = "rowStyle",
    ColumnStyle = "columnStyle"
}
export declare const SHEETS_BASIC_REPEATABLE_COMMANDS: string[];
export interface IRepeatLastActionService {
    setAction(commandInfo: ICommandInfo | null): void;
    getAction(): ICommandInfo | null;
    getRepeatableCommands(): Set<string>;
    getActionPermission(): RepeatLastActionPermission | RepeatLastActionPermission[];
    registerRepeatableCommand(commandId: string, handler: RepeatableCommandHandler, permissionType?: RepeatLastActionPermission): IDisposable;
    runWithoutRecording(selections: IRange[]): Promise<boolean>;
}
export declare const IRepeatLastActionService: import("@wendellhu/redi").IdentifierDecorator<IRepeatLastActionService>;
export declare class RepeatLastActionService extends Disposable implements IRepeatLastActionService {
    private readonly _commandService;
    private _action;
    private _recordingDepth;
    private _repeatableCommands;
    private _customCommandHandlers;
    private _permissionCheckMap;
    constructor(_commandService: ICommandService);
    dispose(): void;
    setAction(commandInfo: ICommandInfo | null): void;
    getAction(): ICommandInfo | null;
    getRepeatableCommands(): Set<string>;
    getActionPermission(): RepeatLastActionPermission | RepeatLastActionPermission[];
    registerRepeatableCommand(commandId: string, handler: RepeatableCommandHandler, permissionType?: RepeatLastActionPermission): IDisposable;
    runWithoutRecording(selections: IRange[]): Promise<boolean>;
}
